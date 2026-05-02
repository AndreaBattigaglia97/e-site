# CLAUDE.md

Portfolio single-page per Ernesto Giuntini (sceneggiatore). Live: `ernestogiuntini.netlify.app`.

## Stack

- **Create React App** (`react-scripts` 5.0.1) — non Vite, non Next.
- React 19, GSAP, OGL, three.js, react-icons.
- Deploy: Netlify (build `npm run build`, publish `build/`).

```
npm start    # dev server
npm run build
npm test
```

## Stato del codice

Il sito attuale è una **landing minimale** (hero "e." + frasi animate IT/EN via `TextType` + bottone download del PDF). Tutta l'app è in `src/App.js` (~75 righe). `SplashCursor.js` è importato ma commentato.

Il refactor target — portfolio Netflix-style completo — è specificato in `HANDOFF.md`. Quello è la **fonte di verità** per design, contenuti, componenti e priorità. Leggerlo prima di lavorare a feature nuove.

## Struttura

```
src/
├── App.js / App.css         ← landing attuale (hero + lang switch + CTA pdf)
├── TextType.js / .css       ← typewriter component usato nell'hero
├── SplashCursor.js          ← effetto cursore (disattivato)
├── index.css / index.js
public/
├── GIUNTINI'S DOG & PONY SHOW.pdf  ← scaricabile dalla CTA hero
└── assets/
    ├── posters/             ← poster portrait 2:3 dei film
    ├── photos/              ← foto di scena landscape (bg card)
    └── award_badges/        ← badge premi PNG con alpha
```

> ⚠️ HANDOFF.md indica path tipo `/posters/...` ma gli asset reali stanno sotto `/assets/posters/...`. Usare il path reale.

## Design system (da HANDOFF.md)

- Sfondo `#000` puro, testo bianco caldo `#f0ede8`, zero card/border/glassmorphism.
- Font: **Anton** (display), **IBM Plex Mono** (metadati ALL CAPS, ls largo), **EB Garamond** (prose). Caricare via Google Fonts con `preconnect` + `display=swap`.
- Accent per categoria: arancio film `#e8631a`, oro shorts/awards `#c9a84c`, ciano branded `#4ab8c1`.
- Animazioni sobrie: solo fade + slide, niente bounce/spring. Rispettare `prefers-reduced-motion`.

## Componente core: NetflixShelf

È il cuore del refactor (vedi `HANDOFF.md §5.4` e `§8`). Riassunto:

- Shelf `flex` con `overflow-x: scroll`, `scroll-snap-type: x mandatory`, scrollbar nascosta.
- Card 260×390 (aspect 2:3), poster come copertina; se manca poster → bg image con `brightness(0.35)` + titolo Anton.
- Hover/focus → pannello dettagli espanso `position: absolute; top: 100%` con `border-top: 2px solid var(--accent)`. Su mobile: bottom sheet al tap.
- Frecce ◀ ▶ scrollano di `(cardWidth + gap) × 3`. Disabilitate se non c'è altro da scrollare.
- **No librerie**: implementazione vanilla con scroll nativo (no Swiper/Embla).

## Convenzioni

- Bilingue IT/EN: lo switch è in `App.js` via stato `lang`. Espandere lo stesso pattern (oppure context) quando si aggiungono sezioni.
- I dati film/shorts/branded sono già strutturati come JSON in `HANDOFF.md §6` — copiare in `src/data/*.js` quando si scaffolding-a il refactor.
- Anti-pattern espliciti (NON fare): card con bordi, gradienti vistosi, glassmorphism, font generici (Inter/Roboto), animazioni eccessive.

## Cosa NON cambiare

- URL Netlify e pipeline di deploy.
- Il PDF in `public/` (è la CTA dell'hero attuale ed è linkato via `process.env.PUBLIC_URL`).
