/* =========================================================================
   La Brace — Worker del pannello admin (Cloudflare Workers)
   Riceve da admin.html il PDF del menu pranzo e l'evento del mese e li
   pubblica con un commit sul repo del sito: GitHub Pages ripubblica da solo.
   Il token GitHub vive solo qui, come secret: il browser non lo vede mai.
   La password serve solo a /login, che restituisce un token di sessione
   firmato e a scadenza: il browser conserva quello, mai la password.
   Cambiare ADMIN_PASSWORD invalida tutte le sessioni aperte.

   Secret:  ADMIN_PASSWORD, GITHUB_TOKEN
   Vars:    GITHUB_REPO, GITHUB_BRANCH, ALLOWED_ORIGINS, GITHUB_API (solo test)
   ========================================================================= */

// l'unico perimetro in cui il pannello può scrivere
const PATHS = {
  menu: "docs/menu-pranzo.pdf",
  eventoJs: "data/evento.js",
  eventoImg: "assets/img/events/evento-mese.jpeg",
};
const EVENTO_IMG = "events/evento-mese.jpeg"; // relativo ad assets/img/, come lo legge main.js
const MAX_PDF = 15 * 1024 * 1024;
const MAX_IMG = 5 * 1024 * 1024;
const PDF_MAGIC = [0x25, 0x50, 0x44, 0x46, 0x2d]; // "%PDF-"
const SESSION_SHORT = 12 * 3600;       // secondi
const SESSION_LONG = 60 * 24 * 3600;   // "ricordami su questo dispositivo"
const JPEG_MAGIC = [0xff, 0xd8, 0xff];

// errori da mostrare così come sono a chi usa il pannello
class UserError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
    const originOk = allowed.includes(origin);
    const cors = originOk
      ? {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Max-Age": "86400",
          "Vary": "Origin",
        }
      : { "Vary": "Origin" };

    if (request.method === "OPTIONS") return new Response(null, { status: originOk ? 204 : 403, headers: cors });
    if (!originOk) return json({ error: "Origine non autorizzata." }, 403, cors);

    try {
      const route = `${request.method} ${new URL(request.url).pathname}`;
      if (route === "POST /login") {
        if (!(await passwordOk(request, env))) {
          await sleep(800); // rallenta i tentativi a raffica
          return json({ error: "Password errata." }, 401, cors);
        }
        const { remember } = await request.json().catch(() => ({}));
        return json(await creaSessione(env, remember === true), 200, cors);
      }
      if (!(await sessioneOk(request, env))) return json({ error: "Sessione scaduta, rientra con la password." }, 401, cors);
      if (route === "GET /stato") return json(await stato(env), 200, cors);
      if (route === "POST /menu") return json(await pubblicaMenu(request, env), 200, cors);
      if (route === "POST /evento") return json(await pubblicaEvento(request, env), 200, cors);
      return json({ error: "Non trovato." }, 404, cors);
    } catch (err) {
      if (err instanceof UserError) return json({ error: err.message }, err.status, cors);
      console.error(err);
      if (err.status === 401 || err.status === 403) {
        return json({ error: "Il collegamento con GitHub non funziona più (token scaduto?). Avvisa chi gestisce il sito." }, 502, cors);
      }
      return json({ error: "Pubblicazione non riuscita, riprova tra qualche minuto." }, 502, cors);
    }
  },
};

/* ---- auth ---------------------------------------------------------------- */

function bearer(request) {
  const header = request.headers.get("Authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

async function passwordOk(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  let given;
  try { given = decodeURIComponent(bearer(request)); } catch { return false; }
  if (!given) return false;
  // confronto a tempo costante su digest di lunghezza fissa
  const [a, b] = await Promise.all([sha256(given), sha256(env.ADMIN_PASSWORD)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function sha256(text) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)));
}

// chiave HMAC derivata dalla password: nuova password = sessioni vecchie non valide
function sessionKey(env) {
  return crypto.subtle.importKey("raw", new TextEncoder().encode(`labrace-admin:${env.ADMIN_PASSWORD}`),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function creaSessione(env, remember) {
  const exp = Math.floor(Date.now() / 1000) + (remember ? SESSION_LONG : SESSION_SHORT);
  const sig = await crypto.subtle.sign("HMAC", await sessionKey(env), new TextEncoder().encode(String(exp)));
  return { token: `${exp}.${toBase64Url(new Uint8Array(sig))}`, exp };
}

async function sessioneOk(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  const m = /^(\d{10})\.([A-Za-z0-9_-]{43})$/.exec(bearer(request));
  if (!m || Number(m[1]) <= Date.now() / 1000) return false;
  return crypto.subtle.verify("HMAC", await sessionKey(env), fromBase64Url(m[2]), new TextEncoder().encode(m[1]));
}

/* ---- route --------------------------------------------------------------- */

async function stato(env) {
  const [evento, menuUpdated] = await Promise.all([
    leggiEvento(env).catch(() => null),
    ultimaModifica(env, PATHS.menu),
  ]);
  return { evento, menuUpdated };
}

async function pubblicaMenu(request, env) {
  const form = await request.formData();
  const bytes = await leggiFile(form.get("file"), { max: MAX_PDF, magic: PDF_MAGIC, nome: "PDF" });
  if (!bytes) throw new UserError("Nessun PDF ricevuto.");
  const result = await commitFiles(env, [{ path: PATHS.menu, bytes }], "Aggiorna il menu pranzo (pannello admin)");
  return { ok: true, ...result };
}

async function pubblicaEvento(request, env) {
  const form = await request.formData();
  const active = form.get("active") === "true";
  const link = pulisciLink(form.get("link"));
  const title = pulisciTesto(form.get("title"), 200);
  const image = await leggiFile(form.get("image"), { max: MAX_IMG, magic: JPEG_MAGIC, nome: "JPEG" });

  const current = await leggiEvento(env).catch(() => null);
  if (active && !image && !(current && current.img)) throw new UserError("Carica la locandina dell'evento.");
  if (active && !link) throw new UserError("Inserisci il link di prenotazione.");

  const now = new Date();
  const evento = {
    active,
    img: EVENTO_IMG,
    // cambia solo con una locandina nuova: è il ?v= che scavalca la cache dei browser
    v: image ? Math.floor(now.getTime() / 1000) : (current && current.v) || 1,
    link,
    title,
    updated: now.toISOString(),
  };
  const files = [{ path: PATHS.eventoJs, bytes: new TextEncoder().encode(eventoJs(evento)) }];
  if (image) files.push({ path: PATHS.eventoImg, bytes: image });

  const result = await commitFiles(env, files, "Aggiorna l'evento del mese (pannello admin)");
  return { ok: true, evento, ...result };
}

/* ---- validazione --------------------------------------------------------- */

async function leggiFile(file, { max, magic, nome }) {
  if (!file || typeof file === "string" || typeof file.arrayBuffer !== "function" || file.size === 0) return null;
  if (file.size > max) throw new UserError(`Il file è troppo pesante (massimo ${Math.round(max / 1024 / 1024)} MB).`);
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!magic.every((b, i) => bytes[i] === b)) throw new UserError(`Il file non è un ${nome} valido.`);
  return bytes;
}

function pulisciLink(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  let url;
  try { url = new URL(s); } catch { throw new UserError("Il link non è valido: deve iniziare con https://"); }
  if (url.protocol !== "https:") throw new UserError("Il link deve iniziare con https://");
  if (url.href.length > 500) throw new UserError("Il link è troppo lungo.");
  return url.href;
}

function pulisciTesto(raw, max) {
  return String(raw || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/* ---- data/evento.js ------------------------------------------------------ */

function eventoJs(evento) {
  return "/* Evento del mese: generato dal pannello admin.html.\n" +
    "   Non modificarlo a mano, verrebbe sovrascritto alla prossima pubblicazione. */\n" +
    "LB.evento = " + JSON.stringify(evento, null, 2) + ";\n";
}

async function leggiEvento(env) {
  const data = await gh(env, `/contents/${PATHS.eventoJs}?ref=${branch(env)}`);
  const text = new TextDecoder().decode(fromBase64(data.content));
  const start = text.indexOf("{", text.indexOf("LB.evento"));
  return JSON.parse(text.slice(start, text.lastIndexOf("}") + 1));
}

/* ---- GitHub -------------------------------------------------------------- */

const branch = (env) => env.GITHUB_BRANCH || "main";

async function ultimaModifica(env, path) {
  const list = await gh(env, `/commits?sha=${branch(env)}&path=${encodeURIComponent(path)}&per_page=1`);
  return list[0] ? list[0].commit.committer.date : null;
}

// un solo commit anche con più file (locandina + evento.js), via Git Data API
async function commitFiles(env, files, message) {
  const blobs = await Promise.all(files.map((f) =>
    gh(env, "/git/blobs", { method: "POST", body: { content: toBase64(f.bytes), encoding: "base64" } })));

  for (let attempt = 1; ; attempt++) {
    const ref = await gh(env, `/git/ref/heads/${branch(env)}`);
    const parent = await gh(env, `/git/commits/${ref.object.sha}`);
    const tree = await gh(env, "/git/trees", {
      method: "POST",
      body: {
        base_tree: parent.tree.sha,
        tree: files.map((f, i) => ({ path: f.path, mode: "100644", type: "blob", sha: blobs[i].sha })),
      },
    });
    if (tree.sha === parent.tree.sha) return { unchanged: true };

    const commit = await gh(env, "/git/commits", {
      method: "POST",
      body: { message, tree: tree.sha, parents: [ref.object.sha] },
    });
    try {
      await gh(env, `/git/refs/heads/${branch(env)}`, { method: "PATCH", body: { sha: commit.sha, force: false } });
      return { commit: commit.sha };
    } catch (err) {
      // 422 = qualcuno ha pushato nel frattempo: si riparte dal branch aggiornato
      if (err.status !== 422 || attempt === 3) throw err;
    }
  }
}

async function gh(env, path, { method = "GET", body } = {}) {
  const base = `${env.GITHUB_API || "https://api.github.com"}/repos/${env.GITHUB_REPO}`;
  const res = await fetch(base + path, {
    method,
    headers: {
      "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "labrace-admin",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = new Error(`GitHub ${method} ${path} → ${res.status}: ${await res.text()}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/* ---- util ---------------------------------------------------------------- */

function toBase64(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

const toBase64Url = (bytes) => toBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromBase64Url = (s) => fromBase64(s.replace(/-/g, "+").replace(/_/g, "/"));

function fromBase64(b64) {
  const s = atob(b64.replace(/\s/g, ""));
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
