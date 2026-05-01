# Design Spec — Portfolio Ernesto Giuntini
**Data:** 2026-05-01  
**Sito:** ernestogiuntini.netlify.app  
**Stack:** CRA + React 19

---

## Obiettivo

Integrare un portfolio completo stile Netflix sotto l'hero esistente, mantenendo l'estetica "Dog & Pony Show" (sfondo nero puro, tipografia condensed/mono/serif, zero card/bordi/glassmorphism). Bilingue IT/EN via `react-i18next`.

---

## Decisioni chiave

| Decisione | Scelta |
|---|---|
| Hero attuale | Mantenuto invariato, rimosso bottone download PDF |
| Nav | Solo link sezione a destra + switch IT/EN, nessun logo, minimal |
| i18n | `react-i18next` + file JSON (`src/locales/it.json`, `src/locales/en.json`) |
| Card mobile | Bottom sheet (slide-up) via `createPortal`, no modale full-screen |
| Shelf | Scroll nativo, no Swiper/Embla |
| CSS | Vanilla, nessun framework |

---

## Architettura

```
src/
├── i18n.js
├── locales/
│   ├── it.json
│   └── en.json
├── data/
│   ├── films.js
│   ├── shorts.js
│   └── branded.js
├── components/
│   ├── Nav.jsx
│   ├── Hero.jsx          ← refactor di App.js attuale (no download)
│   ├── Bio.jsx
│   ├── NetflixShelf.jsx
│   ├── WorkCard.jsx
│   ├── Awards.jsx
│   ├── Contact.jsx
│   └── BottomSheet.jsx
├── hooks/
│   └── useScrollReveal.js
├── App.js                ← Nav + Hero + Bio + Shelves + Awards + Contact
└── index.css             ← CSS vars + font + reset
```

---

## Componenti

### `<Nav>`
- `position: fixed; top: 0; width: 100%`
- `background: transparent` → `#000` solido dopo 60px scroll (transition 0.4s)
- Contenuto: solo link a destra — `[ bio | lavori | premi | contatti ]` + switch `IT | EN`
- Font: IBM Plex Mono, 0.6rem, uppercase, letter-spacing 0.2em
- Hover: `color: white`
- Mobile: link nascosti, solo switch lingua + hamburger → menu slide-up dal basso

### `<Hero>`
- Refactor dell'`App.js` attuale in componente isolato
- Comportamento identico: typewriter bilingue, switch IT/EN spostato nella Nav
- Rimosso: bottone download PDF, stato `enableSplashCursor`
- L'`App.js` importa `<Hero>` e non contiene più logica UI diretta

### `<NetflixShelf>`
Props: `{ title, label, items, accentColor }`

Stato interno:
- `activeCard: string | null` — id card espansa (desktop)
- `canScrollLeft, canScrollRight: bool`
- `scrollRef` — ref al container

Comportamento:
- Hover card → `setActiveCard(id)` ; mouseleave shelf → `setActiveCard(null)`
- Frecce scrollano `(260 + 16) × 3 = 828px` con `behavior: 'smooth'`
- Frecce disabilitate se non c'è altro da scrollare
- `scrollbar-width: none`

### `<WorkCard>`
Props: `{ item, accentColor, isActive, onActivate, onDeactivate }`

Logica immagine:
```js
const cardImage = item.posterUrl ?? item.bgUrl;
const brightness = item.posterUrl ? 1 : 0.35;
```

Desktop: pannello dettagli `position: absolute; top: 100%; left: 0` — `opacity 0→1 + translateY(-8px→0)` su `isActive`.

Mobile: tap → apre `<BottomSheet>` con i dettagli completi.

Dettagli pannello: titolo (Anton), metadati riga (IBM Plex Mono uppercase), director/prod (EB Garamond italic), sinossi (EB Garamond, max 3 righe), badge premi (`<img>` max-height 40px), link "GUARDA IL FILM →".

### `<BottomSheet>`
- Renderizzato via `createPortal(…, document.body)`
- Animazione: `translateY(100%) → translateY(0)`, duration 0.3s ease-out
- Chiusura: tap overlay, swipe-down (touch event), tasto Escape
- Visibile solo su mobile (`@media (max-width: 768px)`)

### `<Bio>`
- Grid 2 colonne desktop, 1 colonna mobile
- Colonna sx: heading EB Garamond italic + paragrafi bio
- Colonna dx: lista righe `[LABEL] [VALORE]` con `border-top: 1px solid rgba(255,255,255,0.06)`
- Tutti i testi via `useTranslation()`

### `<Awards>`
- 3 statistiche grandi (Anton 6rem): "30+ / 8 / 5"
- Lista premi in grid 2 colonne, ogni item con film + nome premio + anno
- Testi statici via i18n; dati premi hardcoded nei componenti (provengono da `shorts.js` e `films.js`)

### `<Contact>`
- Grid 2 colonne desktop, 1 colonna mobile
- Sx: heading "PARLIAMO." (Anton) + sub (EB Garamond italic)
- Dx: lista contatti cliccabili con hover `padding-left: 12px` (transition 0.3s)
- Link: `tel:`, `mailto:`, IMDB profile

---

## i18n

`src/i18n.js` — setup minimo:
```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import it from './locales/it.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: { it: { translation: it }, en: { translation: en } },
  lng: 'it',
  fallbackLng: 'it',
  interpolation: { escapeValue: false },
});

export default i18n;
```

Switch lingua: `i18n.changeLanguage(lang)` — rimpiazza il `useState('lang')` attuale.

Sinossi film: nei file `src/data/*.js` ogni item ha `synopsis` (IT) e `synopsisEn` (EN). Il componente usa:
```js
const synopsis = i18n.language === 'it' ? item.synopsis : item.synopsisEn;
```

---

## Dati film

Ogni oggetto in `src/data/*.js` ha i campi del HANDOFF.md §6 più:
```js
posterUrl: '/assets/posters/<file>.jpg',  // null se mancante
bgUrl:     '/assets/photos/<file>.jpg',
badgeUrls: ['/assets/award_badges/<file>.png', ...],
synopsisEn: '...',
```

Poster mancanti (placeholder `#111` + titolo Anton): `wasted_poster.jpg`, `love_u_2cb_poster.jpg`.

---

## CSS

`index.css` contiene:
- `@import` Google Fonts: Anton, IBM Plex Mono, EB Garamond (`display=swap`)
- CSS custom properties (da HANDOFF §3)
- Reset minimal (`*, box-sizing: border-box; margin: 0; padding: 0`)
- `@media (prefers-reduced-motion: reduce)`: disabilita `transform` e `transition`, mantiene `opacity`

Nessun framework CSS. Ogni componente ha il proprio file `.css` o CSS module.

---

## Animazioni

`useScrollReveal.js` — `IntersectionObserver`:
- `opacity: 0 → 1` + `translateY(20px) → 0`
- duration: 0.7s ease
- threshold: 0.15
- stagger: 80ms tra elementi fratelli via `animation-delay`

Usato su: Bio, Awards, Contact, SectionDivider.

Card hover:
- `transform: scale(1.06)`, duration 0.35s ease — no spring, no bounce

---

## Mobile (breakpoint < 768px)

| Elemento | Desktop | Mobile |
|---|---|---|
| Nav | link a destra | solo switch + hamburger |
| Hero | font grande | font ridotto, padding 24px |
| Shelf | card 260px | card 200px |
| Card expand | pannello assoluto sotto | BottomSheet slide-up |
| Bio | 2 colonne | 1 colonna |
| Contact | 2 colonne | 1 colonna |

---

## Anti-pattern (da non fare)

- Card con bordi o background diverso dal nero
- Gradienti vistosi
- Glassmorphism
- Font Inter/Roboto o generici
- Animazioni con bounce/spring
- Librerie shelf esterne (Swiper, Embla)
- Commenti che spiegano il "cosa" invece del "perché"

---

## Cosa NON cambiare

- URL Netlify e pipeline di deploy
- Il PDF in `public/` (non più linkato dalla UI ma rimane nel progetto)
- Path asset reali: `/assets/posters/`, `/assets/photos/`, `/assets/award_badges/`
