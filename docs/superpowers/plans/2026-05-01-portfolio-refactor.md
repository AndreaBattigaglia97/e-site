# Portfolio Ernesto Giuntini — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrare un portfolio Netflix-style completo (Bio, NetflixShelf ×3, Awards, Contact, Nav) sotto l'hero esistente, bilingue IT/EN via react-i18next.

**Architecture:** L'`App.js` diventa orchestratore che compone Nav + Hero (estratto da App.js) + sezioni portfolio. I18n centralizza tutti i testi statici in `src/locales/it.json` e `src/locales/en.json`. I dati film vivono in `src/data/*.js`. La Nav sticky assorbe lo switch IT/EN esistente.

**Tech Stack:** React 19 (CRA), react-i18next + i18next, React Testing Library (già configurato), CSS vanilla.

---

## File map

| File | Azione | Responsabilità |
|---|---|---|
| `public/index.html` | Modifica | Aggiungere preconnect + link Google Fonts |
| `src/index.css` | Modifica | CSS custom properties, reset, body bg |
| `src/App.css` | Modifica | Ridurre a solo `.App` wrapper |
| `src/App.js` | Modifica | Orchestratore: Nav + Hero + sezioni |
| `src/i18n.js` | Crea | Setup i18next |
| `src/locales/it.json` | Crea | Testi statici IT |
| `src/locales/en.json` | Crea | Testi statici EN |
| `src/data/films.js` | Crea | Dati Featured Films |
| `src/data/shorts.js` | Crea | Dati Cortometraggi |
| `src/data/branded.js` | Crea | Dati Branded Content |
| `src/hooks/useScrollReveal.js` | Crea | IntersectionObserver scroll animations |
| `src/components/Hero.jsx` | Crea | Hero esistente estratto da App.js |
| `src/components/Hero.css` | Crea | Stili hero (migrati da App.css) |
| `src/components/Nav.jsx` | Crea | Nav sticky con lang switch |
| `src/components/Nav.css` | Crea | Stili Nav |
| `src/components/Bio.jsx` | Crea | Sezione bio + dati anagrafici |
| `src/components/Bio.css` | Crea | Stili Bio |
| `src/components/BottomSheet.jsx` | Crea | Modale mobile card detail |
| `src/components/BottomSheet.css` | Crea | Stili BottomSheet |
| `src/components/WorkCard.jsx` | Crea | Card singola con hover-expand |
| `src/components/WorkCard.css` | Crea | Stili card |
| `src/components/NetflixShelf.jsx` | Crea | Shelf riutilizzabile per le 3 categorie |
| `src/components/NetflixShelf.css` | Crea | Stili shelf |
| `src/components/Awards.jsx` | Crea | Sezione premi + statistiche |
| `src/components/Awards.css` | Crea | Stili Awards |
| `src/components/Contact.jsx` | Crea | Sezione contatti |
| `src/components/Contact.css` | Crea | Stili Contact |

---

## Task 1: Installa react-i18next + crea i18n.js

**Files:**
- Create: `src/i18n.js`
- Modify: `src/App.test.js`

- [ ] **Step 1: Scrivi il test failing**

```jsx
// src/App.test.js (sostituisci contenuto)
import { render, screen } from '@testing-library/react';
import App from './App';

test('App renders without crashing', () => {
  render(<App />);
});
```

- [ ] **Step 2: Installa le dipendenze**

```bash
npm install i18next react-i18next
```

- [ ] **Step 3: Crea src/i18n.js**

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import it from './locales/it.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    it: { translation: it },
    en: { translation: en },
  },
  lng: 'it',
  fallbackLng: 'it',
  interpolation: { escapeValue: false },
});

export default i18n;
```

- [ ] **Step 4: Crea src/locales/it.json (placeholder temporaneo)**

```json
{}
```

- [ ] **Step 5: Crea src/locales/en.json (placeholder temporaneo)**

```json
{}
```

- [ ] **Step 6: Importa i18n in src/App.js (prima riga)**

Aggiungi in cima a `src/App.js`, come prima importazione:
```js
import './i18n';
```

- [ ] **Step 7: Verifica che il test passi**

```bash
CI=true npm test -- --testPathPattern="App.test"
```

Atteso: PASS

- [ ] **Step 8: Commit**

```bash
git add src/i18n.js src/locales/it.json src/locales/en.json src/App.js src/App.test.js package.json package-lock.json
git commit -m "feat: setup react-i18next"
```

---

## Task 2: CSS foundation

**Files:**
- Modify: `public/index.html`
- Modify: `src/index.css`
- Modify: `src/App.css`

- [ ] **Step 1: Aggiungi Google Fonts a public/index.html**

Nel `<head>`, prima del `<title>`, aggiungi:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Anton&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: Sostituisci src/index.css**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --black:          #000000;
  --near-black:     #080808;
  --white:          #f0ede8;
  --grey-mid:       #666660;
  --grey-light:     #aaa8a0;
  --accent-film:    #e8631a;
  --accent-short:   #c9a84c;
  --accent-branded: #4ab8c1;
  --accent-awards:  #c9a84c;

  --font-display: 'Anton', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;
  --font-prose:   'EB Garamond', serif;
}

body {
  background-color: var(--black);
  color: var(--white);
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Sostituisci src/App.css**

```css
.App {
  min-height: 100vh;
}
```

- [ ] **Step 4: Avvia il dev server e verifica che l'app non sia rotta**

```bash
npm start
```

Atteso: app si avvia, hero bianco su sfondo nero visibile.

- [ ] **Step 5: Commit**

```bash
git add public/index.html src/index.css src/App.css
git commit -m "feat: CSS foundation — vars, reset, Google Fonts"
```

---

## Task 3: Locale files (it.json + en.json)

**Files:**
- Modify: `src/locales/it.json`
- Modify: `src/locales/en.json`

- [ ] **Step 1: Sostituisci src/locales/it.json**

```json
{
  "nav": {
    "bio": "bio",
    "works": "lavori",
    "awards": "premi",
    "contact": "contatti"
  },
  "hero": {
    "phrases": [
      "Ciao, sono Ernesto.",
      "Sono un autore e sceneggiatore.",
      "Ciao, sono Ernesto.",
      "Sono un autore e sceneggiatore.",
      "Ciao, sono Ernesto.",
      "Sono un autore e sceneggiatore.",
      "Ciao, sono Ernesto.",
      "Sono un autore e sceneggiatore.",
      "Ancora qui?",
      "Cosa aspetti?",
      "Scorri un po'.",
      "Là sotto c'è qualcosa.",
      "Vai.",
      "Mica morde.",
      "Puoi sempre tornare su.",
      "Magari trovi qualcosa che ti piace.",
      "Per dire.",
      "Va bene, basta."
    ]
  },
  "bio": {
    "heading": "Una voce italiana sul palco del mondo.",
    "paragraph": "Ernesto Giuntini nasce a Firenze nel 1988 e inizia la sua carriera nel 2010. In oltre quindici anni firma sceneggiature per documentari, cortometraggi e branded content distribuiti in tutto il mondo. Collabora con brand come Maserati, Lamborghini, Alfa Romeo e Macallan, e con produzioni indipendenti premiate nei principali festival internazionali.",
    "labels": {
      "born": "NATO",
      "role": "RUOLO",
      "languages": "LINGUE",
      "active": "ATTIVO",
      "siae": "SIAE",
      "imdb": "IMDB"
    },
    "values": {
      "born": "Firenze, 21/03/1988",
      "role": "Sceneggiatore · Autore · Showrunner",
      "languages": "Italiano · Inglese",
      "active": "Dal 2010",
      "siae": "267421-0",
      "imdb": "Profilo Completo"
    }
  },
  "sections": {
    "label1": "01 — Featured Films",
    "label2": "02 — Cortometraggi",
    "label3": "03 — Branded Content",
    "seeAll": "Vedi tutti →"
  },
  "awards": {
    "sectionLabel": "04 — Premi",
    "stat1_num": "30+",
    "stat1_label": "SELEZIONI INTERNAZIONALI",
    "stat2_num": "8",
    "stat2_label": "PREMI VINTI",
    "stat3_num": "5",
    "stat3_label": "PAESI DI DISTRIBUZIONE"
  },
  "contact": {
    "sectionLabel": "05 — Contatti",
    "heading": "PARLIAMO.",
    "sub": "Produttori, registi e brand manager possono contattarmi per nuovi progetti e collaborazioni.",
    "phone_label": "TELEFONO",
    "email_label": "EMAIL",
    "imdb_label": "IMDB",
    "imdb_value": "Profilo Completo →",
    "phone": "+39 340 341 0815",
    "email": "ernesto.giuntini@gmail.com"
  },
  "card": {
    "watch": "GUARDA IL FILM →",
    "password": "psw"
  }
}
```

- [ ] **Step 2: Sostituisci src/locales/en.json**

```json
{
  "nav": {
    "bio": "bio",
    "works": "works",
    "awards": "awards",
    "contact": "contact"
  },
  "hero": {
    "phrases": [
      "Hi, I'm Ernesto.",
      "Hi, I'm an author and screenwriter.",
      "Hi, I'm Ernesto.",
      "Hi, I'm an author and screenwriter.",
      "Hi, I'm Ernesto.",
      "Hi, I'm an author and screenwriter.",
      "Hi, I'm Ernesto.",
      "Hi, I'm an author and screenwriter.",
      "You still here?",
      "What are you waiting for?",
      "Scroll down.",
      "There's something down there.",
      "Go ahead.",
      "It's not going to bite.",
      "You can always scroll back up.",
      "But you might find something interesting.",
      "Just saying.",
      "Ok, I'll stop now."
    ]
  },
  "bio": {
    "heading": "An Italian voice on the world stage.",
    "paragraph": "Ernesto Giuntini was born in Florence in 1988 and began his career in 2010. Over fifteen years he has written screenplays for documentaries, short films, and branded content distributed worldwide. His work spans major brands including Maserati, Lamborghini, Alfa Romeo, and Macallan, alongside award-winning independent productions.",
    "labels": {
      "born": "BORN",
      "role": "ROLE",
      "languages": "LANGUAGES",
      "active": "ACTIVE",
      "siae": "SIAE",
      "imdb": "IMDB"
    },
    "values": {
      "born": "Florence, 21/03/1988",
      "role": "Screenwriter · Author · Showrunner",
      "languages": "Italian · English",
      "active": "Since 2010",
      "siae": "267421-0",
      "imdb": "Full Profile"
    }
  },
  "sections": {
    "label1": "01 — Featured Films",
    "label2": "02 — Short Films",
    "label3": "03 — Branded Content",
    "seeAll": "See all →"
  },
  "awards": {
    "sectionLabel": "04 — Awards",
    "stat1_num": "30+",
    "stat1_label": "INTERNATIONAL SELECTIONS",
    "stat2_num": "8",
    "stat2_label": "AWARDS WON",
    "stat3_num": "5",
    "stat3_label": "DISTRIBUTION COUNTRIES"
  },
  "contact": {
    "sectionLabel": "05 — Contact",
    "heading": "LET'S TALK.",
    "sub": "Producers, directors and brand managers can reach out for new projects and collaborations.",
    "phone_label": "PHONE",
    "email_label": "EMAIL",
    "imdb_label": "IMDB",
    "imdb_value": "Full Profile →",
    "phone": "+39 340 341 0815",
    "email": "ernesto.giuntini@gmail.com"
  },
  "card": {
    "watch": "WATCH FILM →",
    "password": "pwd"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/locales/it.json src/locales/en.json
git commit -m "feat: add IT/EN locale files"
```

---

## Task 4: Data files

**Files:**
- Create: `src/data/films.js`
- Create: `src/data/shorts.js`
- Create: `src/data/branded.js`

- [ ] **Step 1: Crea src/data/films.js**

```js
const films = [
  {
    id: 'beat',
    title: 'BEAT',
    type: 'DOCUMENTARIO',
    country: 'ITALIA',
    duration: "42'",
    year: 2024,
    role: 'SCENEGGIATURA',
    director: 'Mattia Ramberti',
    production: 'Basement',
    distribution: 'Distribuzione in corso',
    synopsis: 'Un film sul jazz e sull\'ottava edizione di Jazzmi. La musica come linguaggio universale, l\'energia di una scena viva.',
    synopsisEn: 'A film about jazz and the eighth edition of Jazzmi. Music as a universal language, the energy of a living scene.',
    watchUrl: '#',
    watchPassword: 'BEAT2024',
    awards: [],
    badgeUrls: [],
    posterUrl: '/assets/posters/beat_poster.jpg',
    bgUrl: '/assets/photos/beat_bg.jpg',
    accentColor: '#e8631a',
  },
  {
    id: 'stage-and-race',
    title: 'Stage and Race',
    type: 'DOCUMENTARIO',
    country: 'ITALIA',
    duration: "65'",
    year: 2020,
    role: 'SCENEGGIATURA',
    director: 'Paolo Sponzilli',
    production: 'Prince',
    distribution: 'Rakuten TV Worldwide',
    synopsis: 'Con Ettore Bassi. Palcoscenico e pista da corsa: i confini tra performance artistica e competizione sportiva si dissolvono.',
    synopsisEn: 'With Ettore Bassi. Stage and racetrack: the limits between artistic performance and sporting competition dissolve.',
    watchUrl: '#',
    watchPassword: null,
    awards: ['Rakuten TV Original', 'Distribuzione Worldwide'],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: '/assets/photos/stage_and_race_bg.jpg',
    accentColor: '#e8631a',
  },
];

export default films;
```

- [ ] **Step 2: Crea src/data/shorts.js**

```js
const shorts = [
  {
    id: 'dream-weaver',
    title: 'Dream Weaver',
    type: 'CORTOMETRAGGIO',
    country: 'USA–VIETNAM',
    duration: "17'",
    year: 2024,
    role: 'SCENEGGIATURA',
    director: 'Davide Gentile',
    production: 'Basement',
    distribution: 'Distribuzione indipendente',
    synopsis: 'Cina, 1978. Una bambina osserva gli aerei che graffiano il cielo. Vent\'anni dopo, a New York, il sogno si è fatto realtà. A tenerla ancorata: un pezzetto di stoffa tessuto dalla nonna.',
    synopsisEn: 'China, 1978. A girl watches planes scratching the sky. Twenty years later, in New York, the dream has come true. What keeps her grounded: a scrap of fabric woven by her grandmother.',
    watchUrl: '#',
    watchPassword: 'dwbsmt',
    scriptUrl: '#',
    awards: [],
    badgeUrls: [],
    posterUrl: '/assets/posters/dream_weaver_poster.jpg',
    bgUrl: '/assets/photos/dream_weaver_bg.jpg',
    accentColor: '#c9a84c',
  },
  {
    id: 'wasted',
    title: 'Wasted',
    type: 'CORTOMETRAGGIO',
    country: 'ITALIA',
    duration: "15'",
    year: 2023,
    role: 'SCENEGGIATURA ORIGINALE',
    director: 'Tobia Passigato',
    production: 'Stellantis, Giffoni',
    distribution: 'Premiere Films',
    synopsis: 'Un naufrago su un\'isola fatta interamente di rifiuti — il Trashchipelago — dove tutto ciò che il mondo considera inutile trova una seconda vita. Ma a volte il mondo sbaglia.',
    synopsisEn: 'A castaway on an island made entirely of waste — the Trashchipelago — where everything the world considers useless finds a second life. But sometimes the world is wrong.',
    watchUrl: '#',
    watchPassword: 'Wasted',
    scriptUrl: '#',
    awards: [
      'Miglior Cortometraggio — Cortinametraggio 2024',
      'Vincitore Premio FilmImpresa 2024',
      'Miglior Progetto Ambiente — MISFF 2024',
      'Award Winner — San Benedetto Film Fest 2024',
      'Honorable Mention — Milan Shorts Film Festival 2024',
      'Official Selection — SiciliAmbiente Film Festival 2024',
      'Official Selection — Visioni Italiane 30th Edition 2024',
      'Official Selection — Visioni Corte Int\'l Short Film Festival 2024',
      'Official Selection — Fabriano Film Fest 2024',
      'Official Selection — Sezze Film Festival 2024',
      'Official Selection — CFF Caselle Film Festival 7th Ed. 2024',
      'Official Selection — Aria Film Fest 2024',
      'Official Selection — Corti in Cortile Film Fest 2024',
      'Finalist — Racconti di Mare 2024',
      'Official Selection — Planeta Mare Film Festival 2024',
      'Official Selection — Festival Inventa un Film LENOLA 25ª ed. 2024',
    ],
    badgeUrls: Array.from({ length: 16 }, (_, i) =>
      `/assets/award_badges/badge_wasted_${String(i).padStart(2, '0')}.png`
    ),
    posterUrl: null,
    bgUrl: '/assets/photos/wasted_bg.jpg',
    accentColor: '#c9a84c',
  },
  {
    id: 'warpigs',
    title: 'Warpigs',
    type: 'CORTOMETRAGGIO',
    country: 'ITALIA',
    duration: "20'",
    year: 2023,
    role: 'SCENEGGIATURA ORIGINALE',
    director: 'Giacomo Pellegrini',
    production: 'Overclock, 28Studios',
    distribution: 'Sayonara Films',
    synopsis: 'WWII. John e Fred, due soldati americani sconosciuti, si rifugiano in una chiesa bombardata. Una notte, una storia di maiali selvaggi, libertà e una trappola.',
    synopsisEn: 'WWII. John and Fred, two unknown American soldiers, take shelter in a bombed church. One night, a story of wild pigs, freedom, and a trap.',
    watchUrl: '#',
    watchPassword: 'warpigs2024',
    scriptUrl: '#',
    awards: [
      'Best International Film — Los Angeles Movie Award 2024',
      'Best Cinematography — Los Angeles Movie Award 2024',
      'Best Costume Design — Los Angeles Movie Award 2024',
      'Best Production Design — Los Angeles Movie Award 2024',
      'Best Photography — Deluxe Film Festival 2024',
      'Premio Stampa — Mediterraneo Festival Corto 2024',
      'Official Selection — Fernando Di Leo Short Film Festival 2024',
      'Official Selection — MAAZZENI Film Festival 2024',
      'Official Selection — Central Michigan International Film Festival 2024',
      'Official Selection — Malescorto 2024',
      'Official Selection — Lucca Film Festival 2024',
      'Official Selection — Orlando Film Festival 2024',
    ],
    badgeUrls: Array.from({ length: 13 }, (_, i) =>
      `/assets/award_badges/badge_warpigs_${String(i).padStart(2, '0')}.png`
    ),
    posterUrl: '/assets/posters/warpigs_poster.jpg',
    bgUrl: '/assets/photos/warpigs_bg.jpg',
    accentColor: '#c9a84c',
  },
  {
    id: 'love-u-2cb',
    title: 'Love U 2cb',
    type: 'CORTOMETRAGGIO',
    country: 'ITALIA',
    duration: "11'",
    year: 2023,
    role: 'SCENEGGIATURA',
    director: 'Sami Schinaia',
    production: 'Basement',
    distribution: 'Premiere Films',
    synopsis: 'Fred e Momo — borghese e spacciatore — verso un live della DJ Bride. La notte si trasforma in un trip rosa dove il reale è ormai specchio del virtuale.',
    synopsisEn: 'Fred and Momo — bourgeois and dealer — heading to a DJ Bride live set. The night turns into a pink trip where reality has become a mirror of the virtual.',
    watchUrl: '#',
    watchPassword: null,
    scriptUrl: '#',
    awards: [
      'Shortlist — Metropolis Film Festival 2024',
      'Official Selection — Biennale MArteLive 2024',
      'Official Selection — CONERO Film + ADV 2024',
      'Official Selection — Francigena Film Festival 2024',
      'Official Selection — Premio Nazionale del Cinema Indipendente 2024',
    ],
    badgeUrls: Array.from({ length: 5 }, (_, i) =>
      `/assets/award_badges/badge_love_u_2cb_${String(i).padStart(2, '0')}.png`
    ),
    posterUrl: null,
    bgUrl: '/assets/photos/love_u_2cb_bg.jpg',
    accentColor: '#c9a84c',
  },
  {
    id: 'la-prospettiva-del-topo',
    title: 'La Prospettiva del Topo',
    type: 'CORTOMETRAGGIO',
    country: 'ITALIA',
    duration: "10'",
    year: 2021,
    role: 'SCENEGGIATURA ORIGINALE',
    director: 'Paolo Sponzilli',
    production: 'Prince Production + Cloverthree Film',
    distribution: 'Premiere Films',
    synopsis: 'Italia, anni \'90. Un magistrato sotto scorta racconta a suo figlio la favola della prospettiva del topo — la notte in cui quella morale diventa realtà.',
    synopsisEn: "Italy, the 1990s. A magistrate under escort tells his son the fable of the mouse's perspective — the night that moral becomes reality.",
    watchUrl: '#',
    watchPassword: 'LPDT',
    scriptUrl: '#',
    awards: [
      'Winner — MovieValley Film Festival 2022',
      'Official Selection — BCT Festival Nazionale Cinema e TV 2022',
      'Official Selection — Casole Film Festival 2022',
      'Official Selection — CORTO E A CAPO Premio Mario Puzo 2022',
      'Official Selection — Los Angeles Italia Film Fashion And Art Festival 2022',
      'Official Selection — Sedicicorto International Film Festival 2022',
      'Official Selection — Tiburon International Film Festival 2022',
      'Official Selection — VIII Premio Fausto Rossano 2022',
    ],
    badgeUrls: Array.from({ length: 8 }, (_, i) =>
      `/assets/award_badges/badge_prospettiva_del_topo_${String(i).padStart(2, '0')}.png`
    ),
    posterUrl: '/assets/posters/prospettiva_del_topo_poster.jpg',
    bgUrl: '/assets/photos/prospettiva_del_topo_bg.jpg',
    accentColor: '#c9a84c',
  },
];

export default shorts;
```

- [ ] **Step 3: Crea src/data/branded.js**

```js
const branded = [
  {
    id: 'macallan-spazio-del-tempo',
    client: 'MACALLAN',
    title: 'Lo Spazio del Tempo',
    type: 'BRANDED CONTENT',
    country: 'ITALIA',
    year: 2024,
    role: 'AUTORE E SCENEGGIATORE',
    director: 'Serena Corvaglia',
    production: 'Eliofilm',
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: 'TheKey_eng!',
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: '/assets/photos/macallan_bg.jpg',
    accentColor: '#4ab8c1',
  },
  {
    id: 'maserati-folgore',
    client: 'MASERATI',
    title: 'Folgore: It Turns You On',
    type: 'BRANDED CONTENT',
    country: 'ITALIA',
    year: 2024,
    role: 'AUTORE E SCENEGGIATORE',
    director: 'Gabriele Mainetti',
    production: 'Buddy Films',
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: null,
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: '/assets/photos/maserati_bg.jpg',
    accentColor: '#4ab8c1',
  },
  {
    id: 'alfa-romeo-masterpiece',
    client: 'ALFA ROMEO',
    title: 'Crafting a Masterpiece',
    type: 'FORMAT WEB',
    country: 'ITALIA',
    year: 2023,
    role: 'AUTORE E SCENEGGIATORE',
    director: 'Nicolò Bravetta',
    production: 'Buddy Films',
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: null,
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: null,
    accentColor: '#4ab8c1',
  },
  {
    id: 'baracuta-85th',
    client: 'BARACUTA',
    title: '85th Anniversary',
    type: 'FORMAT WEB',
    country: 'UK',
    year: 2023,
    role: 'AUTORE E SCENEGGIATORE',
    director: 'Jacopo Benassi',
    production: 'Basement',
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: null,
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: '/assets/photos/baracuta_bg.jpg',
    accentColor: '#4ab8c1',
  },
  {
    id: 'lamborghini-movember',
    client: 'LAMBORGHINI',
    title: '× Movember',
    type: 'BRANDED CONTENT',
    country: 'ITALIA',
    year: 2022,
    role: 'AUTORE E SCENEGGIATORE',
    director: 'Iacopo Carapelli',
    production: 'Basement, Havas',
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: null,
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: '/assets/photos/lamborghini_bg.jpg',
    accentColor: '#4ab8c1',
  },
  {
    id: 'amdl-carpet',
    client: 'AMDL CIRCLE',
    title: '× Carpet Edition',
    type: 'BRANDED CONTENT',
    country: 'ITALIA',
    year: 2021,
    role: 'CREATIVE DIRECTOR E AUTORE',
    director: 'Sami Schinaia',
    production: 'Basement',
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: null,
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: '/assets/photos/amdl_bg.jpg',
    accentColor: '#4ab8c1',
  },
  {
    id: 'future-ready',
    client: 'ILSOLE24ORE × VODAFONE',
    title: 'Future Ready',
    type: 'FORMAT WEB',
    country: 'ITALIA',
    year: '2019 – in corso',
    role: 'SHOWRUNNER',
    director: 'Paolo Cartago',
    production: 'Cloverthree',
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: null,
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: '/assets/photos/future_ready_bg.jpg',
    accentColor: '#4ab8c1',
  },
  {
    id: 'tomorrow-pills',
    client: 'ILSOLE24ORE × ENI',
    title: 'Tomorrow Pills',
    type: 'FORMAT WEB',
    country: 'ITALIA',
    year: '2021 – in corso',
    role: 'SHOWRUNNER',
    director: 'Paolo Cartago',
    production: 'Cloverthree',
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: null,
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: '/assets/photos/tomorrow_pills_bg.jpg',
    accentColor: '#4ab8c1',
  },
  {
    id: 'rethink-everything',
    client: 'ILSOLE24ORE × LOMBARD ODIER',
    title: 'Rethink Everything',
    type: 'FORMAT WEB',
    country: 'ITALIA',
    year: '2023 – in corso',
    role: 'SHOWRUNNER',
    production: 'Cloverthree',
    director: null,
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: null,
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: null,
    accentColor: '#4ab8c1',
  },
  {
    id: 'tcct-tomorrow-of-history',
    client: 'TCCT',
    title: 'The Tomorrow of History',
    type: 'BRANDED CONTENT',
    country: 'ITALIA',
    year: 2021,
    role: 'SCENEGGIATORE',
    director: 'Manuel Esposito',
    production: 'Basement',
    synopsis: null,
    synopsisEn: null,
    watchUrl: '#',
    watchPassword: null,
    awards: [],
    badgeUrls: [],
    posterUrl: null,
    bgUrl: '/assets/photos/tcct_bg.jpg',
    accentColor: '#4ab8c1',
  },
];

export default branded;
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add film data files (films, shorts, branded)"
```

---

## Task 5: useScrollReveal hook

**Files:**
- Create: `src/hooks/useScrollReveal.js`

- [ ] **Step 1: Crea src/hooks/useScrollReveal.js**

```js
import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { threshold = 0.15, rootMargin = '0px' } = options;

    const children = Array.from(el.children);
    children.forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = `opacity 0.7s ease ${i * 80}ms, transform 0.7s ease ${i * 80}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const kids = Array.from(entry.target.children);
            kids.forEach((child) => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useScrollReveal.js
git commit -m "feat: add useScrollReveal hook"
```

---

## Task 6: Hero component

**Files:**
- Create: `src/components/Hero.jsx`
- Create: `src/components/Hero.css`
- Create: `src/components/Hero.test.jsx`

- [ ] **Step 1: Scrivi il test failing**

```jsx
// src/components/Hero.test.jsx
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Hero from './Hero';

test('Hero renders without crashing', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <Hero />
    </I18nextProvider>
  );
});
```

- [ ] **Step 2: Verifica che il test fallisca**

```bash
CI=true npm test -- --testPathPattern="Hero.test"
```

Atteso: FAIL — "Cannot find module './Hero'"

- [ ] **Step 3: Crea src/components/Hero.jsx**

```jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TextType from '../TextType';
import './Hero.css';

export default function Hero() {
  const { i18n } = useTranslation();
  const [phrases, setPhrases] = useState(
    i18n.t('hero.phrases', { returnObjects: true })
  );

  useEffect(() => {
    const handleLangChange = () => {
      setPhrases([]);
      setTimeout(() => {
        setPhrases(i18n.t('hero.phrases', { returnObjects: true }));
      }, 100);
    };
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, [i18n]);

  return (
    <header className="hero" id="hero">
      <div className="hero__logo">
        <h1>e</h1>
        <p className="hero__dot">.</p>
      </div>
      <div className="hero__phrases">
        {phrases.length > 0 && (
          <TextType
            text={phrases}
            typingSpeed={90}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
          />
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Crea src/components/Hero.css**

```css
.hero {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #000000;
  gap: 24px;
  z-index: 999;
  position: relative;
}

.hero__logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.hero__logo h1,
.hero__logo p {
  color: #000000;
  font-size: 100px;
  margin: 0;
  font-family: var(--font-display);
}

.hero__dot {
  animation: hero-dot-drop 1s ease-out;
}

@keyframes hero-dot-drop {
  0%   { transform: translateY(-100vh); }
  100% { transform: translateY(0); }
}

.hero__phrases {
  min-height: 40px;
  padding: 0 16px;
}
```

- [ ] **Step 5: Aggiorna src/App.js**

Rimuovi dalla logica di App.js tutto ciò che appartiene a Hero (lang state, phrases, TextType, SplashCursor, language-switch). App.js diventerà semplicemente:

```jsx
import './i18n';
import './App.css';
import Hero from './components/Hero';

function App() {
  return (
    <div className="App">
      <Hero />
    </div>
  );
}

export default App;
```

- [ ] **Step 6: Verifica che il test passi**

```bash
CI=true npm test -- --testPathPattern="Hero.test"
```

Atteso: PASS

- [ ] **Step 7: Verifica visiva nel browser**

```bash
npm start
```

L'hero deve apparire identico a prima: sfondo bianco, "e." con animazione, typewriter IT. Nessun bottone download, nessun switch lingua nell'hero.

- [ ] **Step 8: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.css src/components/Hero.test.jsx src/App.js
git commit -m "feat: extract Hero component, remove download button"
```

---

## Task 7: Nav component

**Files:**
- Create: `src/components/Nav.jsx`
- Create: `src/components/Nav.css`
- Create: `src/components/Nav.test.jsx`

- [ ] **Step 1: Scrivi il test failing**

```jsx
// src/components/Nav.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Nav from './Nav';

beforeEach(() => i18n.changeLanguage('it'));

test('Nav renders section links', () => {
  render(<I18nextProvider i18n={i18n}><Nav /></I18nextProvider>);
  expect(screen.getByText('bio')).toBeInTheDocument();
  expect(screen.getByText('lavori')).toBeInTheDocument();
  expect(screen.getByText('premi')).toBeInTheDocument();
  expect(screen.getByText('contatti')).toBeInTheDocument();
});

test('Nav language switch changes language', () => {
  render(<I18nextProvider i18n={i18n}><Nav /></I18nextProvider>);
  fireEvent.click(screen.getByText('EN'));
  expect(i18n.language).toBe('en');
  fireEvent.click(screen.getByText('IT'));
  expect(i18n.language).toBe('it');
});
```

- [ ] **Step 2: Verifica che il test fallisca**

```bash
CI=true npm test -- --testPathPattern="Nav.test"
```

Atteso: FAIL — "Cannot find module './Nav'"

- [ ] **Step 3: Crea src/components/Nav.jsx**

```jsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Nav.css';

export default function Nav() {
  const { t, i18n } = useTranslation();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${solid ? ' nav--solid' : ''}`}>
      <div className="nav__right">
        <a href="#bio">{t('nav.bio')}</a>
        <a href="#lavori">{t('nav.works')}</a>
        <a href="#premi">{t('nav.awards')}</a>
        <a href="#contatti">{t('nav.contact')}</a>
        <div className="nav__lang">
          <button
            className={i18n.language === 'it' ? 'active' : ''}
            onClick={() => i18n.changeLanguage('it')}
          >
            IT
          </button>
          <button
            className={i18n.language === 'en' ? 'active' : ''}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Crea src/components/Nav.css**

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0;
  background: transparent;
  transition: background 0.4s ease;
}

.nav--solid {
  background: var(--black);
}

.nav__right {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav a {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-decoration: none;
  color: #000;
  transition: color 0.3s ease;
}

.nav--solid a {
  color: var(--grey-light);
}

.nav a:hover,
.nav--solid a:hover {
  color: var(--white);
}

.nav__lang {
  display: flex;
  align-items: center;
  gap: 0;
  margin-left: 8px;
}

.nav__lang button {
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--grey-mid);
  padding: 4px 6px;
  transition: color 0.3s ease;
}

.nav__lang button.active {
  color: #000;
  font-weight: 500;
}

.nav--solid .nav__lang button {
  color: var(--grey-mid);
}

.nav--solid .nav__lang button.active {
  color: var(--white);
}

.nav__lang button:first-child {
  border-right: 1px solid currentColor;
}

@media (max-width: 768px) {
  .nav {
    padding: 12px 20px;
  }

  .nav__right a {
    display: none;
  }
}
```

- [ ] **Step 5: Aggiungi Nav a App.js**

```jsx
import './i18n';
import './App.css';
import Nav from './components/Nav';
import Hero from './components/Hero';

function App() {
  return (
    <div className="App">
      <Nav />
      <Hero />
    </div>
  );
}

export default App;
```

- [ ] **Step 6: Verifica che il test passi**

```bash
CI=true npm test -- --testPathPattern="Nav.test"
```

Atteso: PASS

- [ ] **Step 7: Verifica visiva**

Nel browser: Nav in alto destra con link dark. Dopo scroll oltre l'hero, Nav diventa nera. Switch IT/EN funzionante.

- [ ] **Step 8: Commit**

```bash
git add src/components/Nav.jsx src/components/Nav.css src/components/Nav.test.jsx src/App.js
git commit -m "feat: add Nav with sticky scroll + IT/EN switch"
```

---

## Task 8: App.js shell completo

**Files:**
- Modify: `src/App.js`

- [ ] **Step 1: Sostituisci src/App.js con lo shell completo**

```jsx
import './i18n';
import './App.css';
import { useTranslation } from 'react-i18next';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Bio from './components/Bio';
import NetflixShelf from './components/NetflixShelf';
import Awards from './components/Awards';
import Contact from './components/Contact';
import films from './data/films';
import shorts from './data/shorts';
import branded from './data/branded';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <Nav />
      <Hero />
      <main>
        <section id="bio">
          <Bio />
        </section>
        <section id="lavori">
          <NetflixShelf
            label={t('sections.label1')}
            items={films}
            accentColor="var(--accent-film)"
          />
          <NetflixShelf
            label={t('sections.label2')}
            items={shorts}
            accentColor="var(--accent-short)"
          />
          <NetflixShelf
            label={t('sections.label3')}
            items={branded}
            accentColor="var(--accent-branded)"
          />
        </section>
        <section id="premi">
          <Awards />
        </section>
        <section id="contatti">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Verifica che l'app non crashi (i componenti non esistono ancora, CRA mostrerà errori)**

I componenti Bio, NetflixShelf, Awards, Contact non esistono: l'app mostrerà errori di compilazione. Questo è atteso — l'App.js shell è pronto per accoglierli.

- [ ] **Step 3: Commit**

```bash
git add src/App.js
git commit -m "feat: App.js shell — orchestrazione completa"
```

---

## Task 9: Bio component

**Files:**
- Create: `src/components/Bio.jsx`
- Create: `src/components/Bio.css`
- Create: `src/components/Bio.test.jsx`

- [ ] **Step 1: Scrivi il test failing**

```jsx
// src/components/Bio.test.jsx
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Bio from './Bio';

beforeEach(() => i18n.changeLanguage('it'));

test('Bio renders heading', () => {
  render(<I18nextProvider i18n={i18n}><Bio /></I18nextProvider>);
  expect(screen.getByText('Una voce italiana sul palco del mondo.')).toBeInTheDocument();
});

test('Bio renders IMDB label', () => {
  render(<I18nextProvider i18n={i18n}><Bio /></I18nextProvider>);
  expect(screen.getByText('IMDB')).toBeInTheDocument();
});
```

- [ ] **Step 2: Verifica che il test fallisca**

```bash
CI=true npm test -- --testPathPattern="Bio.test"
```

Atteso: FAIL

- [ ] **Step 3: Crea src/components/Bio.jsx**

```jsx
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';
import './Bio.css';

export default function Bio() {
  const { t } = useTranslation();
  const ref = useScrollReveal();

  const rows = [
    { key: 'born',      label: t('bio.labels.born'),      value: t('bio.values.born') },
    { key: 'role',      label: t('bio.labels.role'),      value: t('bio.values.role') },
    { key: 'languages', label: t('bio.labels.languages'), value: t('bio.values.languages') },
    { key: 'active',    label: t('bio.labels.active'),    value: t('bio.values.active') },
    { key: 'siae',      label: t('bio.labels.siae'),      value: t('bio.values.siae') },
  ];

  return (
    <section className="bio">
      <p className="bio__section-label">{/* spacer */}</p>
      <div className="bio__grid" ref={ref}>
        <div className="bio__left">
          <h2 className="bio__heading">{t('bio.heading')}</h2>
          <p className="bio__paragraph">{t('bio.paragraph')}</p>
        </div>
        <div className="bio__right">
          {rows.map(({ key, label, value }) => (
            <div className="bio__row" key={key}>
              <span className="bio__label">{label}</span>
              <span className="bio__value">{value}</span>
            </div>
          ))}
          <div className="bio__row">
            <span className="bio__label">{t('bio.labels.imdb')}</span>
            <a
              className="bio__link"
              href="https://www.imdb.com/name/nm7536626/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('bio.values.imdb')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Crea src/components/Bio.css**

```css
.bio {
  padding: 100px 60px;
  background: var(--black);
}

.bio__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.bio__heading {
  font-family: var(--font-prose);
  font-size: 3.5rem;
  font-weight: 300;
  font-style: italic;
  color: var(--white);
  margin-bottom: 32px;
  line-height: 1.2;
}

.bio__paragraph {
  font-family: var(--font-prose);
  font-size: 1.15rem;
  color: var(--grey-light);
  line-height: 1.8;
}

.bio__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  gap: 24px;
}

.bio__label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--grey-mid);
  flex-shrink: 0;
}

.bio__value {
  font-family: var(--font-prose);
  font-size: 1rem;
  color: var(--grey-light);
  text-align: right;
}

.bio__link {
  font-family: var(--font-prose);
  font-size: 1rem;
  color: var(--accent-film);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-film);
}

@media (max-width: 768px) {
  .bio {
    padding: 60px 24px;
  }

  .bio__grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .bio__heading {
    font-size: 2.2rem;
  }
}
```

- [ ] **Step 5: Verifica che il test passi**

```bash
CI=true npm test -- --testPathPattern="Bio.test"
```

Atteso: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Bio.jsx src/components/Bio.css src/components/Bio.test.jsx
git commit -m "feat: add Bio component"
```

---

## Task 10: BottomSheet component

**Files:**
- Create: `src/components/BottomSheet.jsx`
- Create: `src/components/BottomSheet.css`
- Create: `src/components/BottomSheet.test.jsx`

- [ ] **Step 1: Scrivi il test failing**

```jsx
// src/components/BottomSheet.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import BottomSheet from './BottomSheet';

const item = {
  id: 'test',
  title: 'Test Film',
  type: 'CORTOMETRAGGIO',
  country: 'ITALIA',
  duration: "10'",
  year: 2023,
  role: 'SCENEGGIATURA',
  director: 'Mario Rossi',
  production: 'Test Prod',
  synopsis: 'Una sinossi di test.',
  synopsisEn: 'A test synopsis.',
  watchUrl: '#',
  watchPassword: null,
  awards: [],
  badgeUrls: [],
  posterUrl: null,
  bgUrl: null,
  accentColor: '#c9a84c',
};

test('BottomSheet shows title when open', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <BottomSheet item={item} accentColor="#c9a84c" onClose={() => {}} />
    </I18nextProvider>
  );
  expect(screen.getByText('Test Film')).toBeInTheDocument();
});

test('BottomSheet calls onClose when overlay clicked', () => {
  const onClose = jest.fn();
  render(
    <I18nextProvider i18n={i18n}>
      <BottomSheet item={item} accentColor="#c9a84c" onClose={onClose} />
    </I18nextProvider>
  );
  fireEvent.click(screen.getByTestId('bottomsheet-overlay'));
  expect(onClose).toHaveBeenCalled();
});
```

- [ ] **Step 2: Verifica che il test fallisca**

```bash
CI=true npm test -- --testPathPattern="BottomSheet.test"
```

Atteso: FAIL

- [ ] **Step 3: Crea src/components/BottomSheet.jsx**

```jsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import './BottomSheet.css';

export default function BottomSheet({ item, accentColor, onClose }) {
  const { t, i18n } = useTranslation();
  const synopsis = i18n.language === 'it' ? item.synopsis : (item.synopsisEn ?? item.synopsis);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="bs-overlay"
      data-testid="bottomsheet-overlay"
      onClick={onClose}
    >
      <div
        className="bs-sheet"
        style={{ borderTopColor: accentColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="bs-close" onClick={onClose} aria-label="Chiudi">×</button>

        <p className="bs-meta" style={{ color: accentColor }}>
          {[item.type, item.country, item.duration, item.year, item.role]
            .filter(Boolean)
            .join(' · ')}
        </p>

        <h2 className="bs-title">{item.title}</h2>

        {(item.director || item.production) && (
          <p className="bs-credits">
            {item.director && `Regia: ${item.director}`}
            {item.director && item.production && ' — '}
            {item.production && `Prod: ${item.production}`}
          </p>
        )}

        {synopsis && <p className="bs-synopsis">{synopsis}</p>}

        {item.badgeUrls?.length > 0 && (
          <div className="bs-badges">
            {item.badgeUrls.map((url, i) => (
              <img key={i} src={url} alt="" className="bs-badge" loading="lazy" />
            ))}
          </div>
        )}

        {item.watchUrl && item.watchUrl !== '#' && (
          <a
            className="bs-watch"
            href={item.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: accentColor }}
          >
            {t('card.watch')}
            {item.watchPassword && (
              <span className="bs-password">
                {' '}({t('card.password')}: {item.watchPassword})
              </span>
            )}
          </a>
        )}
      </div>
    </div>,
    document.body
  );
}
```

- [ ] **Step 4: Crea src/components/BottomSheet.css**

```css
.bs-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2000;
  display: flex;
  align-items: flex-end;
}

.bs-sheet {
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  background: #0d0d0d;
  border-top: 2px solid;
  padding: 28px 24px 40px;
  animation: bs-slide-up 0.3s ease-out;
  position: relative;
}

@keyframes bs-slide-up {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

.bs-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: var(--grey-mid);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;
}

.bs-meta {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  margin-bottom: 12px;
}

.bs-title {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--white);
  margin-bottom: 12px;
}

.bs-credits {
  font-family: var(--font-prose);
  font-size: 0.95rem;
  font-style: italic;
  color: var(--grey-mid);
  margin-bottom: 16px;
}

.bs-synopsis {
  font-family: var(--font-prose);
  font-size: 1rem;
  color: var(--grey-light);
  line-height: 1.6;
  margin-bottom: 20px;
}

.bs-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.bs-badge {
  max-height: 40px;
  width: auto;
  object-fit: contain;
}

.bs-watch {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-decoration: none;
  display: inline-block;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
}

.bs-password {
  color: var(--grey-mid);
  text-transform: none;
  letter-spacing: 0;
}
```

- [ ] **Step 5: Verifica che il test passi**

```bash
CI=true npm test -- --testPathPattern="BottomSheet.test"
```

Atteso: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/BottomSheet.jsx src/components/BottomSheet.css src/components/BottomSheet.test.jsx
git commit -m "feat: add BottomSheet mobile detail component"
```

---

## Task 11: WorkCard component

**Files:**
- Create: `src/components/WorkCard.jsx`
- Create: `src/components/WorkCard.css`
- Create: `src/components/WorkCard.test.jsx`

- [ ] **Step 1: Scrivi il test failing**

```jsx
// src/components/WorkCard.test.jsx
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import WorkCard from './WorkCard';

const baseItem = {
  id: 'test',
  title: 'Test Film',
  type: 'CORTOMETRAGGIO',
  country: 'ITALIA',
  duration: "10'",
  year: 2023,
  role: 'SCENEGGIATURA',
  director: 'Mario Rossi',
  production: 'Test Prod',
  synopsis: 'Sinossi.',
  synopsisEn: 'Synopsis.',
  watchUrl: '#',
  watchPassword: null,
  awards: [],
  badgeUrls: [],
  accentColor: '#c9a84c',
};

test('WorkCard uses posterUrl as image when available', () => {
  const item = { ...baseItem, posterUrl: '/poster.jpg', bgUrl: '/bg.jpg' };
  render(
    <I18nextProvider i18n={i18n}>
      <WorkCard item={item} accentColor="#c9a84c" isActive={false} onActivate={() => {}} onDeactivate={() => {}} />
    </I18nextProvider>
  );
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', '/poster.jpg');
});

test('WorkCard uses bgUrl when posterUrl is null', () => {
  const item = { ...baseItem, posterUrl: null, bgUrl: '/bg.jpg' };
  render(
    <I18nextProvider i18n={i18n}>
      <WorkCard item={item} accentColor="#c9a84c" isActive={false} onActivate={() => {}} onDeactivate={() => {}} />
    </I18nextProvider>
  );
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', '/bg.jpg');
});
```

- [ ] **Step 2: Verifica che il test fallisca**

```bash
CI=true npm test -- --testPathPattern="WorkCard.test"
```

Atteso: FAIL

- [ ] **Step 3: Crea src/components/WorkCard.jsx**

```jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BottomSheet from './BottomSheet';
import './WorkCard.css';

export default function WorkCard({ item, accentColor, isActive, onActivate, onDeactivate }) {
  const { t, i18n } = useTranslation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const cardImage = item.posterUrl ?? item.bgUrl;
  const imgStyle = item.posterUrl
    ? {}
    : { filter: 'brightness(0.35)' };

  const synopsis = i18n.language === 'it'
    ? item.synopsis
    : (item.synopsisEn ?? item.synopsis);

  const metaLine = [item.type, item.country, item.duration, item.year, item.role]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      <div
        className={`work-card${isActive ? ' work-card--active' : ''}`}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onClick={() => setSheetOpen(true)}
        role="option"
        aria-expanded={isActive}
        tabIndex={0}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onKeyDown={(e) => e.key === 'Enter' && setSheetOpen(true)}
      >
        {cardImage ? (
          <img
            src={cardImage}
            alt={item.title}
            className="work-card__img"
            style={imgStyle}
            loading="lazy"
          />
        ) : (
          <div className="work-card__placeholder">
            <span className="work-card__placeholder-title">{item.title}</span>
          </div>
        )}

        <div className="work-card__overlay">
          <p className="work-card__type" style={{ color: accentColor }}>
            {item.type}
          </p>
          <h3 className="work-card__title">{item.title}</h3>
          <p className="work-card__year">{item.year}</p>
        </div>

        {isActive && (
          <div
            className="work-card__details"
            style={{ borderTopColor: accentColor }}
          >
            <p className="work-card__meta" style={{ color: accentColor }}>
              {metaLine}
            </p>
            <h3 className="work-card__details-title">{item.title}</h3>
            {(item.director || item.production) && (
              <p className="work-card__credits">
                {item.director && `Regia: ${item.director}`}
                {item.director && item.production && ' — '}
                {item.production && `Prod: ${item.production}`}
              </p>
            )}
            {synopsis && (
              <p className="work-card__synopsis">{synopsis}</p>
            )}
            {item.badgeUrls?.length > 0 && (
              <div className="work-card__badges">
                {item.badgeUrls.map((url, i) => (
                  <img key={i} src={url} alt="" className="work-card__badge" loading="lazy" />
                ))}
              </div>
            )}
            {item.watchUrl && item.watchUrl !== '#' && (
              <a
                className="work-card__watch"
                href={item.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accentColor }}
                onClick={(e) => e.stopPropagation()}
              >
                {t('card.watch')}
                {item.watchPassword && (
                  <span className="work-card__password">
                    {' '}({t('card.password')}: {item.watchPassword})
                  </span>
                )}
              </a>
            )}
          </div>
        )}
      </div>

      {sheetOpen && (
        <BottomSheet
          item={item}
          accentColor={accentColor}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  );
}
```

- [ ] **Step 4: Crea src/components/WorkCard.css**

```css
.work-card {
  flex-shrink: 0;
  width: 260px;
  aspect-ratio: 2 / 3;
  position: relative;
  scroll-snap-align: start;
  cursor: pointer;
  transition: transform 0.35s ease;
  z-index: 1;
  background: #111;
  overflow: visible;
}

.work-card:hover,
.work-card--active {
  transform: scale(1.06);
  z-index: 10;
}

.work-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.work-card__placeholder {
  width: 100%;
  height: 100%;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.work-card__placeholder-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--grey-mid);
  text-align: center;
  line-height: 1.1;
}

.work-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
}

.work-card__type {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 4px;
}

.work-card__title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--white);
  line-height: 1.1;
  margin-bottom: 4px;
}

.work-card__year {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--grey-mid);
}

/* Desktop expand panel */
.work-card__details {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #0d0d0d;
  border-top: 2px solid;
  padding: 16px;
  z-index: 20;
  min-width: 300px;
  animation: card-details-in 0.25s ease-out;
}

@keyframes card-details-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.work-card__meta {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 8px;
}

.work-card__details-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--white);
  margin-bottom: 8px;
}

.work-card__credits {
  font-family: var(--font-prose);
  font-size: 0.9rem;
  font-style: italic;
  color: var(--grey-mid);
  margin-bottom: 10px;
}

.work-card__synopsis {
  font-family: var(--font-prose);
  font-size: 0.9rem;
  color: var(--grey-light);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}

.work-card__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.work-card__badge {
  max-height: 36px;
  width: auto;
  object-fit: contain;
}

.work-card__watch {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-decoration: none;
  display: inline-block;
  border-bottom: 1px solid currentColor;
}

.work-card__password {
  color: var(--grey-mid);
  text-transform: none;
  letter-spacing: 0;
}

/* Mobile: nasconde il pannello desktop, usa BottomSheet */
@media (max-width: 768px) {
  .work-card__details {
    display: none;
  }

  .work-card {
    width: 200px;
  }
}
```

- [ ] **Step 5: Verifica che il test passi**

```bash
CI=true npm test -- --testPathPattern="WorkCard.test"
```

Atteso: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/WorkCard.jsx src/components/WorkCard.css src/components/WorkCard.test.jsx
git commit -m "feat: add WorkCard with hover-expand and mobile BottomSheet"
```

---

## Task 12: NetflixShelf component

**Files:**
- Create: `src/components/NetflixShelf.jsx`
- Create: `src/components/NetflixShelf.css`
- Create: `src/components/NetflixShelf.test.jsx`

- [ ] **Step 1: Scrivi il test failing**

```jsx
// src/components/NetflixShelf.test.jsx
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import NetflixShelf from './NetflixShelf';

const items = [
  {
    id: 'a', title: 'Film A', type: 'CORTOMETRAGGIO', country: 'ITALIA',
    duration: "10'", year: 2023, role: 'SCENEGGIATURA', director: 'R',
    production: 'P', synopsis: 'S', synopsisEn: 'S',
    watchUrl: '#', watchPassword: null, awards: [], badgeUrls: [],
    posterUrl: null, bgUrl: null, accentColor: '#c9a84c',
  },
  {
    id: 'b', title: 'Film B', type: 'CORTOMETRAGGIO', country: 'ITALIA',
    duration: "12'", year: 2022, role: 'SCENEGGIATURA', director: 'R',
    production: 'P', synopsis: 'S', synopsisEn: 'S',
    watchUrl: '#', watchPassword: null, awards: [], badgeUrls: [],
    posterUrl: null, bgUrl: null, accentColor: '#c9a84c',
  },
];

test('NetflixShelf renders all items', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <NetflixShelf label="02 — Test" items={items} accentColor="#c9a84c" />
    </I18nextProvider>
  );
  expect(screen.getAllByRole('option')).toHaveLength(2);
});

test('NetflixShelf renders section label', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <NetflixShelf label="02 — Test" items={items} accentColor="#c9a84c" />
    </I18nextProvider>
  );
  expect(screen.getByText('02 — Test')).toBeInTheDocument();
});
```

- [ ] **Step 2: Verifica che il test fallisca**

```bash
CI=true npm test -- --testPathPattern="NetflixShelf.test"
```

Atteso: FAIL

- [ ] **Step 3: Crea src/components/NetflixShelf.jsx**

```jsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import WorkCard from './WorkCard';
import './NetflixShelf.css';

const CARD_WIDTH = 260;
const CARD_GAP = 16;
const SCROLL_BY = (CARD_WIDTH + CARD_GAP) * 3;

export default function NetflixShelf({ label, items, accentColor }) {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * SCROLL_BY, behavior: 'smooth' });
  };

  return (
    <div
      className="shelf"
      onMouseLeave={() => setActiveCard(null)}
    >
      <div className="shelf__header">
        <div className="shelf__label" style={{ color: accentColor }}>
          {label}
        </div>
        <span className="shelf__see-all">{t('sections.seeAll')}</span>
      </div>

      <div className="shelf__track-wrapper">
        {canScrollLeft && (
          <button
            className="shelf__arrow shelf__arrow--left"
            onClick={() => scroll(-1)}
            aria-label="Scorri sinistra"
          >
            ◀
          </button>
        )}

        <div
          className="shelf__track"
          ref={scrollRef}
          role="listbox"
        >
          {items.map((item) => (
            <WorkCard
              key={item.id}
              item={item}
              accentColor={accentColor}
              isActive={activeCard === item.id}
              onActivate={() => setActiveCard(item.id)}
              onDeactivate={() => setActiveCard(null)}
            />
          ))}
        </div>

        {canScrollRight && (
          <button
            className="shelf__arrow shelf__arrow--right"
            onClick={() => scroll(1)}
            aria-label="Scorri destra"
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Crea src/components/NetflixShelf.css**

```css
.shelf {
  padding: 40px 0 60px;
  position: relative;
}

.shelf__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px 20px;
}

.shelf__label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
}

.shelf__see-all {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--grey-mid);
}

.shelf__track-wrapper {
  position: relative;
}

.shelf__track {
  display: flex;
  gap: 16px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding: 60px;
  scrollbar-width: none;
  padding: 20px 60px 80px;
  cursor: grab;
}

.shelf__track:active {
  cursor: grabbing;
}

.shelf__track::-webkit-scrollbar {
  display: none;
}

.shelf__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--white);
  font-size: 0.8rem;
  padding: 12px 10px;
  cursor: pointer;
  z-index: 30;
  transition: background 0.2s ease;
}

.shelf__arrow:hover {
  background: rgba(0, 0, 0, 0.95);
}

.shelf__arrow--left {
  left: 16px;
}

.shelf__arrow--right {
  right: 16px;
}

@media (max-width: 768px) {
  .shelf__header {
    padding: 0 24px 16px;
  }

  .shelf__track {
    padding: 16px 24px 60px;
    scroll-padding: 24px;
  }

  .shelf__arrow {
    display: none;
  }
}
```

- [ ] **Step 5: Verifica che il test passi**

```bash
CI=true npm test -- --testPathPattern="NetflixShelf.test"
```

Atteso: PASS

- [ ] **Step 6: Verifica visiva — le shelf devono apparire nell'app**

```bash
npm start
```

Le 3 shelf (Films, Shorts, Branded) devono rendere con le card. Hover su desktop deve mostrare il pannello dettagli.

- [ ] **Step 7: Commit**

```bash
git add src/components/NetflixShelf.jsx src/components/NetflixShelf.css src/components/NetflixShelf.test.jsx
git commit -m "feat: add NetflixShelf with scroll arrows and card activation"
```

---

## Task 13: Awards component

**Files:**
- Create: `src/components/Awards.jsx`
- Create: `src/components/Awards.css`
- Create: `src/components/Awards.test.jsx`

- [ ] **Step 1: Scrivi il test failing**

```jsx
// src/components/Awards.test.jsx
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Awards from './Awards';

beforeEach(() => i18n.changeLanguage('it'));

test('Awards renders statistics', () => {
  render(<I18nextProvider i18n={i18n}><Awards /></I18nextProvider>);
  expect(screen.getByText('30+')).toBeInTheDocument();
  expect(screen.getByText('8')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
});

test('Awards renders section label', () => {
  render(<I18nextProvider i18n={i18n}><Awards /></I18nextProvider>);
  expect(screen.getByText('04 — Premi')).toBeInTheDocument();
});
```

- [ ] **Step 2: Verifica che il test fallisca**

```bash
CI=true npm test -- --testPathPattern="Awards.test"
```

Atteso: FAIL

- [ ] **Step 3: Crea src/components/Awards.jsx**

```jsx
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';
import shorts from '../data/shorts';
import films from '../data/films';
import './Awards.css';

const allAwards = [...films, ...shorts].flatMap((item) =>
  (item.awards ?? [])
    .filter((a) => a.toLowerCase().includes('winner') || a.toLowerCase().includes('miglior') || a.toLowerCase().includes('best') || a.toLowerCase().includes('vincitore') || a.toLowerCase().includes('premio stampa'))
    .map((award) => ({ film: item.title, award, year: item.year }))
);

export default function Awards() {
  const { t } = useTranslation();
  const statsRef = useScrollReveal();
  const listRef = useScrollReveal();

  return (
    <section className="awards">
      <div className="awards__header">
        <p className="awards__section-label" style={{ color: 'var(--accent-awards)' }}>
          {t('awards.sectionLabel')}
        </p>
      </div>

      <div className="awards__stats" ref={statsRef}>
        <div className="awards__stat">
          <span className="awards__stat-num">{t('awards.stat1_num')}</span>
          <span className="awards__stat-label">{t('awards.stat1_label')}</span>
        </div>
        <div className="awards__stat">
          <span className="awards__stat-num">{t('awards.stat2_num')}</span>
          <span className="awards__stat-label">{t('awards.stat2_label')}</span>
        </div>
        <div className="awards__stat">
          <span className="awards__stat-num">{t('awards.stat3_num')}</span>
          <span className="awards__stat-label">{t('awards.stat3_label')}</span>
        </div>
      </div>

      <div className="awards__list" ref={listRef}>
        {allAwards.map(({ film, award, year }, i) => (
          <div className="awards__item" key={i}>
            <span className="awards__film">{film}</span>
            <span className="awards__award">{award}</span>
            <span className="awards__year" style={{ color: 'var(--accent-awards)' }}>
              {year}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Crea src/components/Awards.css**

```css
.awards {
  padding: 100px 60px;
  background: var(--near-black);
}

.awards__header {
  margin-bottom: 60px;
}

.awards__section-label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
}

.awards__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 80px;
  max-width: 900px;
}

.awards__stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.awards__stat-num {
  font-family: var(--font-display);
  font-size: 6rem;
  color: var(--white);
  line-height: 1;
}

.awards__stat-label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--grey-mid);
}

.awards__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  max-width: 1100px;
}

.awards__item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px 0;
  gap: 16px;
}

.awards__film {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--white);
  flex-shrink: 0;
  min-width: 140px;
}

.awards__award {
  font-family: var(--font-prose);
  font-size: 0.9rem;
  font-style: italic;
  color: var(--grey-light);
  flex: 1;
}

.awards__year {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .awards {
    padding: 60px 24px;
  }

  .awards__stats {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .awards__stat-num {
    font-size: 4rem;
  }

  .awards__list {
    grid-template-columns: 1fr;
  }

  .awards__item {
    flex-wrap: wrap;
    gap: 8px;
  }
}
```

- [ ] **Step 5: Verifica che il test passi**

```bash
CI=true npm test -- --testPathPattern="Awards.test"
```

Atteso: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Awards.jsx src/components/Awards.css src/components/Awards.test.jsx
git commit -m "feat: add Awards component with stats and prize list"
```

---

## Task 14: Contact component

**Files:**
- Create: `src/components/Contact.jsx`
- Create: `src/components/Contact.css`
- Create: `src/components/Contact.test.jsx`

- [ ] **Step 1: Scrivi il test failing**

```jsx
// src/components/Contact.test.jsx
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Contact from './Contact';

beforeEach(() => i18n.changeLanguage('it'));

test('Contact renders heading', () => {
  render(<I18nextProvider i18n={i18n}><Contact /></I18nextProvider>);
  expect(screen.getByText('PARLIAMO.')).toBeInTheDocument();
});

test('Contact renders email link', () => {
  render(<I18nextProvider i18n={i18n}><Contact /></I18nextProvider>);
  const link = screen.getByText('ernesto.giuntini@gmail.com');
  expect(link.closest('a')).toHaveAttribute('href', 'mailto:ernesto.giuntini@gmail.com');
});
```

- [ ] **Step 2: Verifica che il test fallisca**

```bash
CI=true npm test -- --testPathPattern="Contact.test"
```

Atteso: FAIL

- [ ] **Step 3: Crea src/components/Contact.jsx**

```jsx
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();
  const ref = useScrollReveal();

  const contacts = [
    {
      label: t('contact.phone_label'),
      value: t('contact.phone'),
      href: `tel:${t('contact.phone').replace(/\s/g, '')}`,
    },
    {
      label: t('contact.email_label'),
      value: t('contact.email'),
      href: `mailto:${t('contact.email')}`,
    },
    {
      label: t('contact.imdb_label'),
      value: t('contact.imdb_value'),
      href: 'https://www.imdb.com/name/nm7536626/',
      external: true,
    },
  ];

  return (
    <section className="contact" id="contact-section">
      <p className="contact__section-label" style={{ color: 'var(--accent-film)' }}>
        {t('contact.sectionLabel')}
      </p>
      <div className="contact__grid" ref={ref}>
        <div className="contact__left">
          <h2 className="contact__heading">{t('contact.heading')}</h2>
          <p className="contact__sub">{t('contact.sub')}</p>
        </div>
        <div className="contact__right">
          {contacts.map(({ label, value, href, external }) => (
            <a
              key={label}
              className="contact__item"
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="contact__label">{label}</span>
              <span className="contact__value">{value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Crea src/components/Contact.css**

```css
.contact {
  padding: 100px 60px;
  min-height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--black);
}

.contact__section-label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
  margin-bottom: 60px;
}

.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  max-width: 1100px;
}

.contact__heading {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 7rem);
  color: var(--white);
  line-height: 1;
  margin-bottom: 24px;
}

.contact__sub {
  font-family: var(--font-prose);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--grey-light);
  line-height: 1.6;
  max-width: 380px;
}

.contact__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px 0;
  text-decoration: none;
  transition: padding-left 0.3s ease;
  cursor: pointer;
}

.contact__item:hover {
  padding-left: 12px;
}

.contact__label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--grey-mid);
}

.contact__value {
  font-family: var(--font-prose);
  font-size: 1rem;
  color: var(--grey-light);
  transition: color 0.3s ease;
}

.contact__item:hover .contact__value {
  color: var(--white);
}

@media (max-width: 768px) {
  .contact {
    padding: 60px 24px;
  }

  .contact__grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
```

- [ ] **Step 5: Verifica che il test passi**

```bash
CI=true npm test -- --testPathPattern="Contact.test"
```

Atteso: PASS

- [ ] **Step 6: Esegui tutti i test**

```bash
CI=true npm test -- --watchAll=false
```

Atteso: tutti i test PASS

- [ ] **Step 7: Verifica visiva finale nel browser**

```bash
npm start
```

Verificare:
- Hero bianco con typewriter, nessun bottone download
- Nav sticky con scroll behavior (trasparente → nera dopo hero)
- Switch IT/EN funzionante, typewriter si resetta con delay di 100ms
- Bio con griglia dati anagrafici
- 3 shelf: Featured Films, Cortometraggi, Branded Content
- Hover card desktop: pannello dettagli con accent color, badge, link
- Tap card mobile: BottomSheet slide-up
- Awards con statistiche "30+ / 8 / 5" e lista premi
- Contact con link email/telefono/IMDB funzionanti

- [ ] **Step 8: Commit finale**

```bash
git add src/components/Contact.jsx src/components/Contact.css src/components/Contact.test.jsx
git commit -m "feat: add Contact component — portfolio refactor complete"
```

---

## Self-review

**Spec coverage:**
- ✅ Hero mantenuto, download rimosso
- ✅ Nav solo link a destra + switch IT/EN, nessun logo
- ✅ react-i18next con it.json + en.json
- ✅ Bio con dati anagrafici bilingue
- ✅ NetflixShelf ×3 (films, shorts, branded) con accentColor per categoria
- ✅ WorkCard hover-expand desktop (pannello assoluto)
- ✅ BottomSheet mobile (createPortal, slide-up)
- ✅ Awards con statistiche e lista premi filtrati dai data files
- ✅ Contact con tel:/mailto: links
- ✅ useScrollReveal con IntersectionObserver
- ✅ Asset path reali `/assets/posters/`, `/assets/photos/`, `/assets/award_badges/`
- ✅ posterUrl null → bgUrl + placeholder #111

**Placeholder scan:** nessuno. Tutti i dati, codice e comandi sono completi.

**Type consistency:**
- `item.posterUrl`, `item.bgUrl`, `item.badgeUrls`, `item.synopsis`, `item.synopsisEn` — usati consistentemente in WorkCard, BottomSheet, data files
- `accentColor` prop passata da App.js → NetflixShelf → WorkCard → BottomSheet — catena completa
- `onActivate` / `onDeactivate` in WorkCard corrisponde a `setActiveCard(id)` / `setActiveCard(null)` in NetflixShelf
