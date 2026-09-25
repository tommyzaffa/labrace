/* Test del Worker contro il GitHub finto. Lancio: node --test _admin-worker/test/ */
import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import worker from "../src/index.js";
import { createMockGitHub } from "./mock-github.mjs";

const ORIGIN = "https://labrace.ch";
const PASSWORD = "prova-locale-è";
const API = "http://mock.github";
const env = {
  ADMIN_PASSWORD: PASSWORD,
  GITHUB_TOKEN: "token-finto",
  GITHUB_REPO: "tommyzaffa/labrace",
  GITHUB_BRANCH: "main",
  ALLOWED_ORIGINS: `${ORIGIN},https://www.labrace.ch`,
  GITHUB_API: API,
};

const enc = (s) => new TextEncoder().encode(s);
const dec = (b) => new TextDecoder().decode(b);
const PDF_OLD = enc("%PDF-1.7 menu settimana 38");
const PDF_NEW = enc("%PDF-1.7 menu settimana 39");
const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4]);
const EVENTO_INIZIALE = `/* Evento del mese: generato dal pannello admin.html.
   Non modificarlo a mano, verrebbe sovrascritto alla prossima pubblicazione. */
LB.evento = {
  "active": true,
  "img": "events/evento-mese.jpeg",
  "v": 1000,
  "link": "https://pnssm.pro/vecchio",
  "title": "Evento vecchio",
  "updated": "2026-09-01T00:00:00.000Z"
};
`;

let gh;
let token; // sessione valida, ottenuta con la password in beforeEach
const realFetch = globalThis.fetch;
globalThis.fetch = (input, init) => {
  const url = typeof input === "string" ? input : input.url;
  return url.startsWith(API) ? gh.handle(url, init) : realFetch(input, init);
};
after(() => { globalThis.fetch = realFetch; });

beforeEach(async () => {
  gh = createMockGitHub({
    repo: env.GITHUB_REPO,
    token: env.GITHUB_TOKEN,
    files: {
      "docs/menu-pranzo.pdf": PDF_OLD,
      "data/evento.js": enc(EVENTO_INIZIALE),
      "assets/img/events/evento-mese.jpeg": new Uint8Array([0xff, 0xd8, 0xff, 9, 9]),
      "README.md": enc("readme"),
    },
  });
  token = (await (await login()).json()).token;
  gh.state.requests.length = 0;
});

function call(path, { method = "POST", auth = token, origin = ORIGIN, form, json, envOverride } = {}) {
  const headers = {};
  if (origin) headers.Origin = origin;
  if (auth !== null) headers.Authorization = `Bearer ${auth}`;
  let body;
  if (json) {
    body = JSON.stringify(json);
    headers["Content-Type"] = "application/json";
  }
  if (form) {
    body = new FormData();
    for (const [k, v] of Object.entries(form)) {
      body.append(k, v instanceof Uint8Array ? new File([v], k === "file" ? "menu.pdf" : "locandina.jpg") : v);
    }
  }
  return worker.fetch(new Request(`https://labrace-admin.test${path}`, { method, headers, body }), envOverride || env);
}

const login = (password = PASSWORD, opts = {}) =>
  call("/login", { auth: encodeURIComponent(password), json: { remember: !!opts.remember }, ...opts });

const leggiEvento = () => {
  const ctx = { LB: {} };
  vm.runInNewContext(dec(gh.file("data/evento.js")), ctx); // deve essere JS valido, come lo carica il sito
  return ctx.LB.evento;
};

/* ---- accesso ---- */

test("CORS: preflight ok da labrace.ch, rifiutato da altre origini", async () => {
  const ok = await call("/menu", { method: "OPTIONS", auth: null });
  assert.equal(ok.status, 204);
  assert.equal(ok.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.match(ok.headers.get("Access-Control-Allow-Headers"), /Authorization/);

  const bad = await call("/menu", { method: "OPTIONS", auth: null, origin: "https://evil.example" });
  assert.equal(bad.status, 403);
  assert.equal(bad.headers.get("Access-Control-Allow-Origin"), null);
});

test("richieste senza Origin o da origini non autorizzate: 403, nessuna chiamata a GitHub", async () => {
  assert.equal((await call("/login", { origin: null })).status, 403);
  assert.equal((await call("/login", { origin: "https://evil.example" })).status, 403);
  assert.equal(gh.state.requests.length, 0);
});

test("login: password giusta (anche con accenti) dà un token, sbagliata o assente no", async () => {
  const ok = await login();
  assert.equal(ok.status, 200);
  assert.match((await ok.json()).token, /^\d{10}\.[A-Za-z0-9_-]{43}$/);

  const t0 = Date.now();
  assert.equal((await login("sbagliata")).status, 401);
  assert.ok(Date.now() - t0 >= 700, "la risposta a una password errata deve essere rallentata");
  assert.equal((await call("/login", { auth: null })).status, 401);
  assert.equal(gh.state.requests.length, 0, "il login non parla con GitHub");
});

test("sessione: corta di default, lunga con 'ricordami'", async () => {
  const now = Date.now() / 1000;
  const short = (await (await login()).json()).exp - now;
  const long = (await (await login(PASSWORD, { remember: true })).json()).exp - now;
  assert.ok(short > 11 * 3600 && short <= 12 * 3600, `corta: ${short}`);
  assert.ok(long > 59 * 86400 && long <= 60 * 86400, `lunga: ${long}`);
});

test("le route protette vogliono il token, non la password", async () => {
  const withPassword = await call("/menu", { auth: encodeURIComponent(PASSWORD), form: { file: PDF_NEW } });
  assert.equal(withPassword.status, 401);
  assert.equal((await call("/stato", { method: "GET", auth: null })).status, 401);
  assert.deepEqual(gh.file("docs/menu-pranzo.pdf"), PDF_OLD, "senza sessione non si scrive niente");
});

test("sessione manomessa, scaduta o firmata con una password vecchia: rifiutata", async () => {
  const [exp, sig] = token.split(".");
  const tampered = `${Number(exp) + 999999}.${sig}`;
  const flipped = `${exp}.${sig[0] === "A" ? "B" : "A"}${sig.slice(1)}`;
  for (const auth of [tampered, flipped, "garbage", ""]) {
    assert.equal((await call("/stato", { method: "GET", auth })).status, 401, auth);
  }
  // firmato correttamente ma scaduto: login fatto "13 ore fa" con sessione da 12
  const realNow = Date.now;
  Date.now = () => realNow() - 13 * 3600 * 1000;
  const expired = (await (await login()).json()).token;
  Date.now = realNow;
  assert.equal((await call("/stato", { method: "GET", auth: expired })).status, 401, "token scaduto");

  const nuovaPassword = { ...env, ADMIN_PASSWORD: "password-cambiata" };
  assert.equal((await call("/stato", { method: "GET", envOverride: nuovaPassword })).status, 401);
  assert.equal((await call("/stato", { method: "GET" })).status, 200, "con la password attuale il token vale");
});

/* ---- menu pranzo ---- */

test("menu: un PDF nuovo diventa un commit che sostituisce solo docs/menu-pranzo.pdf", async () => {
  const before = gh.history().length;
  const res = await call("/menu", { form: { file: PDF_NEW } });
  const data = await res.json();
  assert.equal(res.status, 200, JSON.stringify(data));
  assert.ok(data.commit);
  assert.deepEqual(gh.file("docs/menu-pranzo.pdf"), PDF_NEW);
  assert.equal(gh.history().length, before + 1);
  assert.equal(gh.history()[0].message, "Aggiorna il menu pranzo (pannello admin)");
  assert.equal(dec(gh.file("data/evento.js")), EVENTO_INIZIALE, "l'evento non si tocca");
});

test("menu: lo stesso PDF già online non crea un commit vuoto", async () => {
  const before = gh.history().length;
  const data = await (await call("/menu", { form: { file: PDF_OLD } })).json();
  assert.equal(data.unchanged, true);
  assert.equal(gh.history().length, before);
});

test("menu: rifiuta file che non sono PDF, vuoti o troppo pesanti", async () => {
  const notPdf = await call("/menu", { form: { file: enc("<html>ciao</html>") } });
  assert.equal(notPdf.status, 400);
  assert.match((await notPdf.json()).error, /non è un PDF/);

  assert.equal((await call("/menu", { form: {} })).status, 400);

  const big = new Uint8Array(16 * 1024 * 1024);
  big.set(enc("%PDF-"));
  const tooBig = await call("/menu", { form: { file: big } });
  assert.equal(tooBig.status, 400);
  assert.match((await tooBig.json()).error, /troppo pesante/);
  assert.deepEqual(gh.file("docs/menu-pranzo.pdf"), PDF_OLD);
});

/* ---- evento del mese ---- */

test("evento: locandina + dati finiscono in UN solo commit, evento.js resta JS valido", async () => {
  const before = gh.history().length;
  const res = await call("/evento", {
    form: { active: "true", image: JPEG, link: " https://pnssm.pro/nuovo ", title: "Girocarne\na volontà   — 11 settembre" },
  });
  const data = await res.json();
  assert.equal(res.status, 200, JSON.stringify(data));
  assert.equal(gh.history().length, before + 1);
  assert.deepEqual(gh.file("assets/img/events/evento-mese.jpeg"), JPEG);

  const ev = leggiEvento();
  assert.equal(ev.active, true);
  assert.equal(ev.img, "events/evento-mese.jpeg");
  assert.equal(ev.link, "https://pnssm.pro/nuovo");
  assert.equal(ev.title, "Girocarne a volontà — 11 settembre");
  assert.ok(ev.v > 1000, "con una locandina nuova cambia la versione (cache-bust)");
});

test("evento: senza nuova locandina cambia solo evento.js e la versione immagine resta", async () => {
  const imgBefore = gh.file("assets/img/events/evento-mese.jpeg");
  await call("/evento", { form: { active: "true", link: "https://pnssm.pro/altro", title: "Titolo nuovo" } });
  const ev = leggiEvento();
  assert.equal(ev.v, 1000);
  assert.equal(ev.link, "https://pnssm.pro/altro");
  assert.deepEqual(gh.file("assets/img/events/evento-mese.jpeg"), imgBefore);
});

test("evento: si può spegnere senza link né locandina", async () => {
  const res = await call("/evento", { form: { active: "false", link: "", title: "" } });
  assert.equal(res.status, 200);
  assert.equal(leggiEvento().active, false);
});

test("evento: validazioni (link obbligatorio se attivo, solo https, solo JPEG)", async () => {
  const cases = [
    [{ active: "true", link: "" }, /link di prenotazione/],
    [{ active: "true", link: "http://pnssm.pro/x" }, /https/],
    [{ active: "true", link: "javascript:alert(1)" }, /https/],
    [{ active: "true", link: "non un link" }, /non è valido/],
    [{ active: "true", link: "https://pnssm.pro/x", image: enc("GIF89a") }, /non è un JPEG/],
  ];
  for (const [form, msg] of cases) {
    const res = await call("/evento", { form });
    assert.equal(res.status, 400, JSON.stringify(form));
    assert.match((await res.json()).error, msg);
  }
  assert.equal(dec(gh.file("data/evento.js")), EVENTO_INIZIALE, "nessuna validazione fallita deve scrivere");
});

test("evento: un titolo ostile resta una stringa, non codice", async () => {
  await call("/evento", { form: { active: "true", link: "https://pnssm.pro/x", title: '"; LB.hacked = true; //</script>' } });
  const ctx = { LB: {} };
  vm.runInNewContext(dec(gh.file("data/evento.js")), ctx);
  assert.equal(ctx.LB.hacked, undefined);
  assert.equal(ctx.LB.evento.title, '"; LB.hacked = true; //</script>');
});

/* ---- stato e robustezza ---- */

test("stato: restituisce l'evento corrente e la data dell'ultimo menu", async () => {
  await call("/menu", { form: { file: PDF_NEW } });
  const data = await (await call("/stato", { method: "GET" })).json();
  assert.equal(data.evento.link, "https://pnssm.pro/vecchio");
  assert.equal(data.menuUpdated, gh.history()[0].date);
});

test("push concorrente durante la pubblicazione: riprova e non perde nessuna delle due modifiche", async () => {
  gh.state.concurrentPushBeforePatch = 1;
  const res = await call("/menu", { form: { file: PDF_NEW } });
  assert.equal(res.status, 200);
  assert.deepEqual(gh.file("docs/menu-pranzo.pdf"), PDF_NEW);
  assert.equal(dec(gh.file("README.md")), "push concorrente 0", "la modifica esterna non va sovrascritta");
});

test("token GitHub scaduto: messaggio chiaro invece di un errore generico", async () => {
  gh.state.tokenValid = false;
  const res = await call("/menu", { form: { file: PDF_NEW } });
  assert.equal(res.status, 502);
  assert.match((await res.json()).error, /token scaduto/);
});
