# Sito web La Brace — Brief di progetto

Ristorante | Braceria | Pizzeria — Manno (Lugano), Svizzera.
Obiettivo: sito vetrina di altissimo livello con effetto "wow" — animazioni cinematiche, non il classico fade-on-scroll.

## Reference visiva
Cartella `reference/` — screenshot di **imperialebolgheri.com** (ispirazione principale):
tipografia display enorme, menu fullscreen con card-gallery, sezioni immersive full-bleed, kinetic type, transizioni fluide.
Nel brief cliente è citato anche beefclubmilano.it (video di sfondo che accompagna lo scroll).
Livello atteso: GSAP + ScrollTrigger, smooth scroll (Lenis), preloader curato, hover raffinati, parallax e reveal tipografici.

## Direzione visiva (decisa con il cliente)
- **Mix chiaro/scuro**: hero e sezioni immersive (video, galleria, carne dry aged) su fondo scuro quasi nero / bordeaux profondo; sezioni contenuto (menu, storia, contatti) su crema.
- Colori brand: **#810101** (rosso, testi/accenti) e **#fffaf2** (crema, sfondo). Derivare tonalità scure coerenti (es. #1a0505 / #2a0a0a).
- Font: **Montserrat** o alternativa più coerente/elegante (es. display condensed bold per i titoli enormi in stile reference + Montserrat per il body). Libertà di proporre.
- Da evitare (brief cliente): verde, rosa, lilla, viola.

## Struttura del sito
1. **Home** — hero con video fullscreen (`assets/video/hero.mp4`, provvisorio: gestirlo in modo perfetto, con overlay, tipografia enorme, magari preloader che si apre sul video). CTA sparse in tutto il sito ("Prenota un tavolo").
2. **Storia** — testi da scrivere (io/Claude), tono elegante ma caldo. Base: braceria specializzata in carne dry aged e alla griglia + pizzeria, gestione GARistogroup Sagl.
3. **Menu** — 3 menu:
   - **À la carte**: online sul sito (contenuti completi in `docs/Menu-La-Brace-2026.pdf` — arrosticioni, salumi/formaggi, tabella dry aged, tartare, primi, carni alla brace, fritture, hamburger, menu bambini, pizze classiche/speciali, calzoni, focacce, bevande, allergeni).
   - **Vini**: online sul sito — carta vini NON ancora fornita: improvvisare contenuti realistici (rossi ticinesi/italiani, bolgheri, ecc.), il cliente manderà quella vera dopo.
   - **Pranzo**: NON online — pulsante download del PDF `docs/MENU_PRANZO_2026_28-2.pdf`.
4. **Prenotazioni** — sezione a sé stante. Portale: https://forms.pienissimo.com/info-client — tentare embed via iframe nel sito; se bloccato (X-Frame-Options/CSP), fallback: CTA con reindirizzamento.
5. **Eventi** — 2–3 card di esempio scritte da me (cene aziendali, giro pizza CHF 25, all you can eat costine CHF 38, fondue chinoise/bourguignonne).
6. **Galleria** — foto in `assets/img/` (~150 scatti professionali maggio 2026). Layout creativo (masonry/orizzontale con drag o parallax), usare anche i reel Instagram (`assets/video/Reel_*.mp4`, formato verticale 9:16) dove ha senso, es. striscia di video verticali.
7. **Contatti** — mappa Google, orari (DA CHIEDERE al cliente — placeholder chiaro), indirizzo, telefono/email cliccabili, social.

## Lingue
- **IT (default) + EN**, switcher visibile. Tutto tradotto integralmente.

## Dati reali
- GARistogroup Sagl · Via Cantonale 2B, 6928 Manno
- Tel: +41 91 606 10 00 / +41 79 317 60 00 · Email: info@labrace.ch · Dominio: www.labrace.ch
- Slogan: "La Brace… dove carne e pizza diventano eccellenza"
- Frase da evitare: "Ti aspettiamo alla brace"
- Social: Facebook, Instagram, LinkedIn, TikTok (link segnaposto)
- SEO keywords: carne, pizza, dry aged, pranzo di lavoro, cene di gruppo, all you can eat, cene aziendali, Ticino/Luganese/Malcantone

## Assets
- `assets/logo/1.png` (bianco su bordeaux), `2.png` (bianco su trasparente), `3.png` (nero su trasparente)
- `assets/img/` foto professionali (file pesanti: **ottimizzare/ridimensionare** in build, generare versioni web ~1600px + thumbnails)
- `assets/video/hero.mp4` + 10 reel verticali (**comprimere per il web**, poster frame, autoplay muted loop playsinline)
- `assets/graphics/` 6 illustrazioni di tagli di carne stile incisione rossa su sfondo trasparente — usarle come elementi decorativi (parallax, sezione dry aged, divider)
- `docs/ALLERGENI E PROVENIENZE 2026.pdf` per la pagina/nota allergeni

## Note tecniche
- Sito statico (HTML/CSS/JS o Astro/Vite), performance-first: lazy loading, video posters, preload font.
- Menu online aggiornabili facilmente (dati in JSON o file dedicati).
- Pagine legali: privacy, cookie policy (richieste nel brief cliente).
- Prezzi in CHF.
