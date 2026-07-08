# La Brace — Sito web

Sito vetrina del ristorante **La Brace** — Braceria · Pizzeria a Manno (Lugano), Svizzera.
Gestione GARistogroup Sagl. Slogan: _"La Brace… dove carne e pizza diventano eccellenza"_.

Sito statico con animazioni cinematiche (GSAP + ScrollTrigger, smooth scroll Lenis), bilingue IT/EN.

## Struttura

| File | Descrizione |
|------|-------------|
| `index.html` | Home: hero video, storia, dry aged, teaser menu, eventi, prenotazioni, galleria, contatti |
| `menu.html` | Pagina menu completa: à la carte, vini, download menu pranzo, allergeni |
| `privacy.html` | Privacy & Cookie Policy (nLPD CH + GDPR) |
| `css/` | `style.css` (design system), `fonts.css` (font self-hosted) |
| `js/` | `data.js` (contenuti menu/eventi/galleria), `i18n.js` (traduzioni IT/EN), `main.js` (animazioni, nav, preloader) |
| `assets/` | `img/` foto, `video/` hero + reel, `logo/`, `graphics/`, `fonts/` |
| `docs/` | PDF menu pranzo e allergeni |
| `scripts/optimize.sh` | Pipeline ottimizzazione media (sips/ffmpeg) |

## Stack

- HTML / CSS / JavaScript vanilla (nessun build framework)
- [GSAP](https://gsap.com/) 3.12.5 + ScrollTrigger — animazioni
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- Font self-hosted (Anton, Archivo, Montserrat) — zero chiamate a Google Fonts

## Sviluppo locale

Il sito è statico: basta un server HTTP qualsiasi dalla root del progetto.

```bash
python3 -m http.server 8123
```

Poi apri http://localhost:8123

## Ottimizzazione media

Le versioni web di immagini e video vengono generate con:

```bash
./scripts/optimize.sh
```

Richiede `ffmpeg` e `sips` (macOS). Output in `assets/img/web`, `assets/img/thumb`, `assets/video/web`.

## Deploy

Pubblicato tramite **GitHub Pages**.

> Nota: i sorgenti media pesanti (`assets/video/hero.mp4` 4K e i `*-orig.mp4`) sono esclusi via `.gitignore`
> perché superano il limite di 100 MB/file di GitHub. Il sito serve solo le versioni ottimizzate.

## Contatti

GARistogroup Sagl · Via Cantonale 2B, 6928 Manno
Tel: +41 91 606 10 00 / +41 79 317 60 00 · info@labrace.ch · [www.labrace.ch](https://www.labrace.ch)
