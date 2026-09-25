# Pannello admin — Worker

Backend di `admin.html`: riceve il PDF del menu pranzo e l'evento del mese e li
committa sul repo con l'API di GitHub. GitHub Pages ripubblica da solo in 1–2 minuti.
La cartella inizia con `_`, quindi Jekyll/GitHub Pages non la pubblica.

Scrive **solo** in `docs/menu-pranzo.pdf`, `data/evento.js` e
`assets/img/events/evento-mese.jpeg`. Accetta richieste solo da `https://labrace.ch`.

## Primo deploy

1. **Account Cloudflare** gratuito. Non serve spostare il DNS da IONOS: il Worker
   gira su un indirizzo suo `*.workers.dev`.
2. **Token GitHub** (fine-grained): github.com → Settings → Developer settings →
   Fine-grained tokens → *Generate new token*
   - Repository access: *Only select repositories* → `tommyzaffa/labrace`
   - Permissions → Repository → **Contents: Read and write** (nient'altro)
   - Scadenza: la più lunga disponibile, e segnati la data.
3. Da questa cartella:

   ```bash
   npx wrangler login
   npx wrangler deploy
   npx wrangler secret put GITHUB_TOKEN
   npx wrangler secret put ADMIN_PASSWORD
   ```

   Prima il deploy, poi i secret: finché mancano, il Worker rifiuta tutto.
   Per una password robusta: `openssl rand -base64 18`.
4. Copia l'URL stampato da `wrangler deploy` in `API_PROD` dentro `admin.html` e pusha.
   Attuale: `https://labrace-admin.labrace-admin.workers.dev`.

## Manutenzione

- **Token scaduto** (il pannello dice "token scaduto?"): nuovo token come al punto 2,
  poi `npx wrangler secret put GITHUB_TOKEN`.
- **Cambiare password**: `npx wrangler secret put ADMIN_PASSWORD`. Chiude anche
  tutte le sessioni aperte.
- **Log in tempo reale**: `npx wrangler tail`.
- **Test** (GitHub finto in memoria, nessun token): `npm test`.
