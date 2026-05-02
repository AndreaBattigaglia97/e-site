# HANDOFF — ernestogiuntini.netlify.app
## Portfolio Sceneggiatore: Ernesto Giuntini
**Target developer:** Claude Code  
**Stack esistente:** React (CRA o Vite) su Netlify  
**Obiettivo:** Refactor completo del sito, mantenendo fidelity al PDF "Dog & Pony Show" come visual reference

---

## 1. DESIGN PHILOSOPHY

### Riferimento primario
Il PDF `GIUNTINI'S DOG & PONY SHOW` è la fonte di verità estetica. Chiave:
- **Sfondo nero puro** `#000000` (non off-black, proprio nero)
- **Testo bianco** direttamente sul nero — zero card/box/border
- **Titoli in font condensed bold** (PDF usa una sans condensed stile Impact — usare `Anton` da Google Fonts o `Barlow Condensed ExtraBold`)
- **Metadati in ALL CAPS con letter-spacing largo** — font mono o sans light
- **Accent colors per categoria** (vedi §4), usati solo per link e label tipo
- **Poster del film** a sinistra — piccolo, come nel PDF — testo a destra
- Layout **respira**: tanto nero tra gli elementi, nessun crowding
- **Filosofia "Dog & Pony Show"**: il sito stesso ammette di essere una presentazione promozionale — c'è auto-ironia, secchezza, eleganza senza fronzoli

### Anti-pattern (cose da NON fare)
- ❌ Nessuna card con bordi o background diverso dal nero
- ❌ Nessun gradiente vistoso
- ❌ Nessun glassmorphism
- ❌ Nessuna animazione eccessiva — solo fade e slide sobri
- ❌ Non usare Inter, Roboto, o font generici

---

## 2. TYPOGRAPHY

```
Font stack:
  Display/Titoli grandi:  'Anton', sans-serif          (Google Fonts)
  Corpo / metadati:       'IBM Plex Mono', monospace   (Google Fonts)
  Prose / bio:            'EB Garamond', serif         (Google Fonts)
```

### Gerarchia tipografica
| Elemento | Font | Size | Weight | Style |
|---|---|---|---|---|
| Nome hero | Anton | clamp(7rem, 15vw, 16rem) | 400 | uppercase |
| Titolo sezione | Anton | clamp(3rem, 6vw, 7rem) | 400 | — |
| Titolo film (Netflix card) | Anton | 1.8rem–2.4rem | 400 | — |
| Metadati film | IBM Plex Mono | 0.65rem | 400 | uppercase, ls: 0.25em |
| Body / bio | EB Garamond | 1.2rem | 400 | — |
| Label sezione | IBM Plex Mono | 0.55rem | 400 | uppercase, ls: 0.4em |
| Accent link | IBM Plex Mono | 0.65rem | 400 | uppercase |

---

## 3. COLOR SYSTEM

```css
:root {
  --black:      #000000;
  --near-black: #080808;  /* per sezioni alternate */
  --white:      #f0ede8;  /* bianco caldo, non puro */
  --grey-mid:   #666660;
  --grey-light: #aaa8a0;

  /* Accent per categoria — come nel PDF */
  --accent-film:     #e8631a;  /* arancio — Featured Films */
  --accent-short:    #c9a84c;  /* oro — Shorts */
  --accent-branded:  #4ab8c1;  /* ciano — Branded/Commercials */
  --accent-awards:   #c9a84c;  /* oro — Awards */
}
```

---

## 4. STRUTTURA PAGINA (single-page scroll)

```
/
├── <Nav>          — sticky, minimal
├── <Hero>         — nome fullscreen
├── <Bio>          — griglia dati
├── <FeaturedFilms> — vetrina Netflix (documentari)
├── <Shorts>        — vetrina Netflix (cortometraggi)
├── <Branded>       — vetrina Netflix (branded content)
├── <Awards>        — lista premi
└── <Contact>       — contatti
```

---

## 5. COMPONENTI

### 5.1 `<Nav>`
```
Layout: flex, space-between, fixed top
Background: linear-gradient(to bottom, #000 0%, transparent 100%)
Left:  "E." — Anton, 1rem, color: accent-film
Right: link testuali — IBM Plex Mono, 0.6rem, uppercase, ls:0.2em
       [ bio | lavori | premi | contatti ]
Hover: color white

Comportamento: su scroll > 60px → background #000 solido con transition
```

### 5.2 `<Hero>`
```
Layout: fullscreen (100vh), flex column, justify-end, padding: 0 60px 80px
Content:
  - Eyebrow: "SCENEGGIATORE · AUTORE · SHOWRUNNER"
             IBM Plex Mono, 0.65rem, color: grey-mid, ls: 0.35em
  - Nome: "ERNESTO" (white) + "GIUNTINI" (white)
           Anton, clamp(7rem, 15vw, 16rem), line-height: 0.88
  - Tagline: "Firenze, 1988 — Dal 2010"
             EB Garamond, 1.1rem, italic, color: grey-mid

Decorazione:
  - Carattere "e." — Anton, 20rem, color: rgba(255,255,255,0.03)
    posizionato in basso a destra (overflow hidden)
    (come nel PDF: ogni sezione inizia con "e." in basso)
  - Sottile linea orizzontale dorata (1px, w:60px) sotto eyebrow

Animazione: staggered fadeUp (eyebrow → nome → tagline), delay 0.3s ciascuno
```

### 5.3 `<SectionDivider>` (riutilizzabile)
```
Ogni sezione inizia con:
  - Label: "01 — Featured Films" / "02 — Shorts" ecc.
           IBM Plex Mono, 0.55rem, uppercase, ls: 0.4em, color: accent della sezione
  - Riga separatrice: border-top 1px solid rgba(255,255,255,0.08)
```

### 5.4 `<NetflixShelf>` ⭐ COMPONENTE PRINCIPALE
Questo è il cuore del sito. Va replicato per ogni categoria (Films, Shorts, Branded).

#### Layout desktop
```
Container: full-width, overflow visible
Header riga: titolo sezione sinistra + "Vedi tutti →" destra

Shelf: flex row, gap: 16px, overflow-x: scroll, scroll-snap-type: x mandatory
       scrollbar nascosta (scrollbar-width: none)
       padding: 0 60px (rispetta i margini pagina)
```

#### Card base (stato normale)
```
Dimensioni:  width: 260px, flex-shrink: 0
Aspect ratio: ~2:3 (poster portrait, come poster cinematografici)
Background: #111 (placeholder se no immagine)
Poster: object-fit: cover, w:100%, h:100%

Overlay bottom: gradient trasparente→nero (60% dell'altezza)
  - Titolo film: Anton, 1.4rem, color white
  - Tipo: IBM Plex Mono, 0.5rem, uppercase, color: accent-categoria
  - Anno: IBM Plex Mono, 0.5rem, color: grey-mid

Transizione hover: transform scale(1.04), z-index elevato
                   duration: 0.35s ease
```

#### Card espansa (hover — stile Netflix)
```
Al hover, la card:
1. Si scala leggermente: scale(1.04)
2. Appare un pannello dettagli SOTTO la card (non sopra):
   - Background: #0d0d0d
   - border-top: 2px solid accent-categoria
   - Padding: 20px
   - Contenuto:
       · Titolo: Anton, 1.6rem
       · Metadati riga: "TIPO · PAESE · DURATA · ANNO · RUOLO"
                         IBM Plex Mono, 0.55rem, uppercase, color: grey-light
       · Director/Prod: EB Garamond, 0.95rem, italic, color: grey-mid
       · Sinossi: EB Garamond, 0.95rem, line-height 1.6, color: grey-light
                  max 3 righe, text clamp
       · Badge premi: piccoli pill — font IBM Plex Mono 0.45rem, 
                      border: 1px solid accent-categoria, color: accent
       · Link: "GUARDA IL FILM →" — IBM Plex Mono, uppercase, color: accent
   
   Animazione: slideDown + fadeIn, duration 0.25s ease-out
   Z-index: la card espansa va sopra le adiacenti

Nota: su mobile, l'espansione avviene al tap (no hover), toggle.
```

#### Navigazione shelf
```
Frecce sinistra/destra (◀ ▶):
  - Appaiono al hover della shelf
  - Posizione: absolute, centrate verticalmente, fuori dai margini laterali
  - Style: IBM Plex Mono, background: rgba(0,0,0,0.7), color: white
  - onClick: scrollano di (cardWidth + gap) × 3 cards
  - Nascosti se non c'è altro da scrollare (disabled state)
```

### 5.5 `<Bio>`
```
Layout: grid 2 colonne (1fr 1fr), gap: 80px
Padding sezione: 100px 60px

Colonna sinistra (testo):
  - Heading: EB Garamond, 3.5rem, italic, font-weight 300
             es. "Una voce italiana sul palco del mondo."
  - Paragrafi: EB Garamond, 1.15rem, color: grey-light, line-height 1.8

Colonna destra (dati):
  - Lista di righe:
    [LABEL]     [VALORE]
    NATO        Firenze, 21/03/1988
    RUOLO       Sceneggiatore · Autore · Showrunner
    LINGUE      Italiano · Inglese
    ATTIVO      Dal 2010
    SIAE        267421-0
    IMDB        → link
    
  - Ogni riga separata da border-top: 1px solid rgba(255,255,255,0.06)
  - LABEL: IBM Plex Mono, 0.55rem, uppercase, ls: 0.25em, color: grey-mid
  - VALORE: EB Garamond, 1rem, color: grey-light
  - Link: color: accent-film, no underline, border-bottom: 1px solid
```

### 5.6 `<Awards>`
```
Layout: padding 100px 60px

Statistiche (3 colonne grandi):
  "30+"  SELEZIONI INTERNAZIONALI
  "8"    PREMI VINTI  
  "5"    PAESI DI DISTRIBUZIONE
  
  Numero: Anton, 6rem, color: white
  Label: IBM Plex Mono, 0.55rem, uppercase, color: grey-mid

Lista premi:
  Grid 2 colonne
  Ogni item: border-top 1px solid rgba(255,255,255,0.06), padding 24px 0
  Layout item: [titolo film] [nome premio] [anno]
  
  Titolo film: Anton, 1.1rem, color: white
  Premio: EB Garamond, 0.95rem, italic, color: grey-light
  Anno: IBM Plex Mono, 0.65rem, color: gold, flex-shrink:0
```

### 5.7 `<Contact>`
```
Layout: min-height 55vh, flex, align-items center
Padding: 100px 60px

Grid 2 colonne:
  Sinistra:
    - Heading: Anton, clamp(3rem,6vw,7rem), "PARLIAMO."
    - Sub: EB Garamond, 1.1rem, italic, color: grey-light
           "Produttori, registi e brand manager possono
            contattarmi per nuovi progetti e collaborazioni."
  
  Destra:
    - Lista contatti cliccabili:
      [TELEFONO]  +39 340 341 0815  →
      [EMAIL]     ernesto.giuntini@gmail.com  →
      [IMDB]      Profilo Completo  →
    
    - Ogni item: flex space-between, border-top 1px solid rgba(255,255,255,0.06)
    - Hover: padding-left 12px (transition 0.3s), color → white
    - Link email: mailto:, link tel: tel:
```

---

## 6. DATI CONTENUTO (JSON-ready)

### Featured Films
```json
[
  {
    "id": "beat",
    "title": "BEAT",
    "type": "DOCUMENTARIO",
    "country": "ITALIA",
    "duration": "42'",
    "year": 2024,
    "role": "SCENEGGIATURA",
    "director": "Mattia Ramberti",
    "production": "Basement",
    "distribution": "Distribuzione in corso",
    "synopsis": "Un film sul jazz e sull'ottava edizione di Jazzmi. La musica come linguaggio universale, l'energia di una scena viva.",
    "watchUrl": "#",
    "watchPassword": "BEAT2024",
    "awards": [],
    "accentColor": "#e8631a"
  },
  {
    "id": "stage-and-race",
    "title": "Stage and Race",
    "type": "DOCUMENTARIO",
    "country": "ITALIA",
    "duration": "65'",
    "year": 2020,
    "role": "SCENEGGIATURA",
    "director": "Paolo Sponzilli",
    "production": "Prince",
    "distribution": "Rakuten TV Worldwide",
    "synopsis": "Con Ettore Bassi. Palcoscenico e pista da corsa: i confini tra performance artistica e competizione sportiva si dissolvono.",
    "watchUrl": "#",
    "awards": ["Rakuten TV Original", "Distribuzione Worldwide"],
    "accentColor": "#e8631a"
  }
]
```

### Shorts
```json
[
  {
    "id": "dream-weaver",
    "title": "Dream Weaver",
    "type": "CORTOMETRAGGIO",
    "country": "USA–VIETNAM",
    "duration": "17'",
    "year": 2024,
    "role": "SCENEGGIATURA",
    "director": "Davide Gentile",
    "production": "Basement",
    "distribution": "Distribuzione indipendente",
    "synopsis": "Cina, 1978. Una bambina osserva gli aerei che graffiano il cielo. Vent'anni dopo, a New York, il sogno si è fatto realtà. A tenerla ancorata: un pezzetto di stoffa tessuto dalla nonna.",
    "watchUrl": "#",
    "watchPassword": "dwbsmt",
    "scriptUrl": "#",
    "awards": [],
    "accentColor": "#c9a84c"
  },
  {
    "id": "wasted",
    "title": "Wasted",
    "type": "CORTOMETRAGGIO",
    "country": "ITALIA",
    "duration": "15'",
    "year": 2023,
    "role": "SCENEGGIATURA ORIGINALE",
    "director": "Tobia Passigato",
    "production": "Stellantis, Giffoni",
    "distribution": "Premiere Films",
    "synopsis": "Un naufrago su un'isola fatta interamente di rifiuti — il Trashchipelago — dove tutto ciò che il mondo considera inutile trova una seconda vita. Ma a volte il mondo sbaglia.",
    "watchUrl": "#",
    "watchPassword": "Wasted",
    "scriptUrl": "#",
    "awards": [
      "Miglior Cortometraggio — Cortinametraggio 2024",
      "Vincitore Premio FilmImpresa 2024",
      "Miglior Progetto Ambiente — MISFF 2024",
      "Award Winner — San Benedetto Film Fest 2024",
      "Honorable Mention — Milan Shorts Film Festival 2024",
      "Official Selection — SiciliAmbiente Film Festival 2024",
      "Official Selection — Visioni Italiane 30th Edition 2024",
      "Official Selection — Visioni Corte Int'l Short Film Festival 2024",
      "Official Selection — Fabriano Film Fest 2024",
      "Official Selection — Sezze Film Festival 2024",
      "Official Selection — CFF Caselle Film Festival 7th Ed. 2024",
      "Official Selection — Aria Film Fest 2024",
      "Official Selection — Corti in Cortile Film Fest 2024",
      "Finalist — Racconti di Mare 2024",
      "Official Selection — Planeta Mare Film Festival 2024",
      "Official Selection — Festival Inventa un Film LENOLA 25ª ed. 2024"
    ],
    "accentColor": "#c9a84c"
  },
  {
    "id": "warpigs",
    "title": "Warpigs",
    "type": "CORTOMETRAGGIO",
    "country": "ITALIA",
    "duration": "20'",
    "year": 2023,
    "role": "SCENEGGIATURA ORIGINALE",
    "director": "Giacomo Pellegrini",
    "production": "Overclock, 28Studios",
    "distribution": "Sayonara Films",
    "synopsis": "WWII. John e Fred, due soldati americani sconosciuti, si rifugiano in una chiesa bombardata. Una notte, una storia di maiali selvaggi, libertà e una trappola.",
    "watchUrl": "#",
    "watchPassword": "warpigs2024",
    "scriptUrl": "#",
    "awards": [
      "Best International Film — Los Angeles Movie Award 2024",
      "Best Cinematography — Los Angeles Movie Award 2024",
      "Best Costume Design — Los Angeles Movie Award 2024",
      "Best Production Design — Los Angeles Movie Award 2024",
      "Best Photography — Deluxe Film Festival 2024",
      "Premio Stampa — Mediterraneo Festival Corto 2024",
      "Official Selection — Fernando Di Leo Short Film Festival 2024",
      "Official Selection — MAAZZENI Film Festival 2024",
      "Official Selection — Central Michigan International Film Festival 2024",
      "Official Selection — Malescorto 2024",
      "Official Selection — Lucca Film Festival 2024",
      "Official Selection — Orlando Film Festival 2024"
    ],
    "accentColor": "#c9a84c"
  },
  {
    "id": "love-u-2cb",
    "title": "Love U 2cb",
    "type": "CORTOMETRAGGIO",
    "country": "ITALIA",
    "duration": "11'",
    "year": 2023,
    "role": "SCENEGGIATURA",
    "director": "Sami Schinaia",
    "production": "Basement",
    "distribution": "Premiere Films",
    "synopsis": "Fred e Momo — borghese e spacciatore — verso un live della DJ Bride. La notte si trasforma in un trip rosa dove il reale è ormai specchio del virtuale.",
    "watchUrl": "#",
    "scriptUrl": "#",
    "awards": [
      "Shortlist — Metropolis Film Festival 2024",
      "Official Selection — Biennale MArteLive 2024",
      "Official Selection — CONERO Film + ADV 2024",
      "Official Selection — Francigena Film Festival 2024",
      "Official Selection — Premio Nazionale del Cinema Indipendente 2024"
    ],
    "accentColor": "#c9a84c"
  },
  {
    "id": "la-prospettiva-del-topo",
    "title": "La Prospettiva del Topo",
    "type": "CORTOMETRAGGIO",
    "country": "ITALIA",
    "duration": "10'",
    "year": 2021,
    "role": "SCENEGGIATURA ORIGINALE",
    "director": "Paolo Sponzilli",
    "production": "Prince Production + Cloverthree Film",
    "distribution": "Premiere Films",
    "synopsis": "Italia, anni '90. Un magistrato sotto scorta racconta a suo figlio la favola della prospettiva del topo — la notte in cui quella morale diventa realtà.",
    "watchUrl": "#",
    "watchPassword": "LPDT",
    "scriptUrl": "#",
    "awards": [
      "Winner — MovieValley Film Festival 2022",
      "Official Selection — BCT Festival Nazionale Cinema e TV 2022",
      "Official Selection — Casole Film Festival 2022",
      "Official Selection — CORTO E A CAPO Premio Mario Puzo 2022",
      "Official Selection — Los Angeles Italia Film Fashion And Art Festival 2022",
      "Official Selection — Sedicicorto International Film Festival 2022",
      "Official Selection — Tiburon International Film Festival 2022",
      "Official Selection — VIII Premio Fausto Rossano 2022"
    ],
    "accentColor": "#c9a84c"
  }
]
```

### Branded Content
```json
[
  {
    "id": "macallan-spazio-del-tempo",
    "client": "MACALLAN",
    "title": "Lo Spazio del Tempo",
    "type": "BRANDED CONTENT",
    "country": "ITALIA",
    "year": 2024,
    "role": "AUTORE E SCENEGGIATORE",
    "director": "Serena Corvaglia",
    "production": "Eliofilm",
    "watchUrl": "#",
    "watchPassword": "TheKey_eng!",
    "accentColor": "#4ab8c1"
  },
  {
    "id": "maserati-folgore",
    "client": "MASERATI",
    "title": "Folgore: It Turns You On",
    "type": "BRANDED CONTENT",
    "country": "ITALIA",
    "year": 2024,
    "role": "AUTORE E SCENEGGIATORE",
    "director": "Gabriele Mainetti",
    "production": "Buddy Films",
    "watchUrl": "#",
    "accentColor": "#4ab8c1"
  },
  {
    "id": "alfa-romeo-masterpiece",
    "client": "ALFA ROMEO",
    "title": "Crafting a Masterpiece",
    "type": "FORMAT WEB",
    "country": "ITALIA",
    "year": 2023,
    "role": "AUTORE E SCENEGGIATORE",
    "director": "Nicolò Bravetta",
    "production": "Buddy Films",
    "watchUrl": "#",
    "accentColor": "#4ab8c1"
  },
  {
    "id": "baracuta-85th",
    "client": "BARACUTA",
    "title": "85th Anniversary",
    "type": "FORMAT WEB",
    "country": "UK",
    "year": 2023,
    "role": "AUTORE E SCENEGGIATORE",
    "director": "Jacopo Benassi",
    "production": "Basement",
    "watchUrl": "#",
    "accentColor": "#4ab8c1"
  },
  {
    "id": "lamborghini-movember",
    "client": "LAMBORGHINI",
    "title": "× Movember",
    "type": "BRANDED CONTENT",
    "country": "ITALIA",
    "year": 2022,
    "role": "AUTORE E SCENEGGIATORE",
    "director": "Iacopo Carapelli",
    "production": "Basement, Havas",
    "watchUrl": "#",
    "accentColor": "#4ab8c1"
  },
  {
    "id": "amdl-carpet",
    "client": "AMDL CIRCLE",
    "title": "× Carpet Edition",
    "type": "BRANDED CONTENT",
    "country": "ITALIA",
    "year": 2021,
    "role": "CREATIVE DIRECTOR E AUTORE",
    "director": "Sami Schinaia",
    "production": "Basement",
    "watchUrl": "#",
    "accentColor": "#4ab8c1"
  },
  {
    "id": "future-ready",
    "client": "ILSOLE24ORE × VODAFONE",
    "title": "Future Ready",
    "type": "FORMAT WEB",
    "country": "ITALIA",
    "year": "2019 – in corso",
    "role": "SHOWRUNNER",
    "director": "Paolo Cartago",
    "production": "Cloverthree",
    "watchUrl": "#",
    "accentColor": "#4ab8c1"
  },
  {
    "id": "tomorrow-pills",
    "client": "ILSOLE24ORE × ENI",
    "title": "Tomorrow Pills",
    "type": "FORMAT WEB",
    "country": "ITALIA",
    "year": "2021 – in corso",
    "role": "SHOWRUNNER",
    "director": "Paolo Cartago",
    "production": "Cloverthree",
    "watchUrl": "#",
    "accentColor": "#4ab8c1"
  },
  {
    "id": "rethink-everything",
    "client": "ILSOLE24ORE × LOMBARD ODIER",
    "title": "Rethink Everything",
    "type": "FORMAT WEB",
    "country": "ITALIA",
    "year": "2023 – in corso",
    "role": "SHOWRUNNER",
    "production": "Cloverthree",
    "watchUrl": "#",
    "accentColor": "#4ab8c1"
  },
  {
    "id": "tcct-tomorrow-of-history",
    "client": "TCCT",
    "title": "The Tomorrow of History",
    "type": "BRANDED CONTENT",
    "country": "ITALIA",
    "year": 2021,
    "role": "SCENEGGIATORE",
    "director": "Manuel Esposito",
    "production": "Basement",
    "watchUrl": "#",
    "accentColor": "#4ab8c1"
  }
]
```

---

## 7. STRUTTURA FILE REACT CONSIGLIATA

```
src/
├── App.jsx
├── index.css              ← reset + CSS variables + font import
├── data/
│   ├── films.js
│   ├── shorts.js
│   └── branded.js
├── components/
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── Bio.jsx
│   ├── NetflixShelf.jsx   ← componente riutilizzabile
│   ├── WorkCard.jsx       ← card singola con hover expand
│   ├── Awards.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
└── hooks/
    └── useScrollReveal.js  ← IntersectionObserver per animazioni
```

---

## 8. COMPORTAMENTO NETFLIX SHELF — DETTAGLIO IMPLEMENTAZIONE

```jsx
// NetflixShelf.jsx — logica essenziale
// Props: { title, label, items, accentColor }

// Stato:
// - activeCard: string | null  (id della card espansa)
// - scrollRef: ref al container scroll
// - canScrollLeft, canScrollRight: bool

// Al hover/focus card → setActiveCard(id)
// Al mouseleave shelf container → setActiveCard(null)

// La card espansa:
// - Non cambia width (per non disturbare lo scroll)
// - Il pannello dettagli si apre SOTTO con position relative
//   → questo spinge le card sotto verso il basso (solo se è l'ultima riga)
//   Alternativa preferita: pannello in overlay assoluto sotto la card,
//   con z-index alto, che va sopra il contenuto successivo

// Scroll buttons:
// scrollRef.current.scrollBy({ left: ±(260+16)*3, behavior: 'smooth' })
```

### CSS chiave per la shelf
```css
.shelf-container {
  display: flex;
  gap: 16px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding: 60px;
  scrollbar-width: none;
  padding: 20px 60px 40px;
  cursor: grab;
}
.shelf-container:active { cursor: grabbing; }

.work-card {
  flex-shrink: 0;
  width: 260px;
  aspect-ratio: 2/3;
  position: relative;
  scroll-snap-align: start;
  transition: transform 0.35s ease, z-index 0s;
  z-index: 1;
}
.work-card:hover,
.work-card.active {
  transform: scale(1.06);
  z-index: 10;
}

.card-details {
  position: absolute;
  top: 100%;
  left: 0; right: 0;
  background: #0d0d0d;
  border-top: 2px solid var(--accent);
  padding: 16px;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.25s, transform 0.25s;
  pointer-events: none;
  z-index: 20;
  min-width: 320px; /* può sbucare dalla card */
}
.work-card:hover .card-details,
.work-card.active .card-details {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

---

## 9. ANIMAZIONI

```
Principio: sobrie, cinematografiche, nessun bounce

Scroll reveal:
  - opacity: 0 → 1
  - transform: translateY(20px) → translateY(0)
  - duration: 0.7s ease
  - threshold: 0.15
  - stagger: 80ms tra elementi fratelli

Hero entrance:
  - Staggered fadeUp: eyebrow (0.3s) → nome (0.5s) → tagline (0.7s)
  - Nessun altro effetto

Card hover:
  - scale(1.06), duration 0.35s ease — NO spring, NO bounce

Nav background:
  - transition: background 0.4s ease su scroll > 60px

Scroll indicator hero (opzionale):
  - Linea verticale dorata che pulsa (keyframes opacity 0.4→1)
```

---

## 10. ASSET FOTOGRAFICI

Tutti gli asset sono stati estratti dal PDF "Dog & Pony Show" e sono disponibili nel file `giuntini_assets.zip` allegato a questo handoff. Vanno copiati in `public/` del progetto React mantenendo la struttura di cartelle sotto.

### Struttura cartelle

```
public/
├── posters/          ← poster portrait dei film (2:3), usati come copertina nelle card Netflix
├── photos/           ← foto di scena/background (landscape), usate come bg delle card
└── award_badges/     ← badge premi PNG con canale alpha trasparente
```

---

### 📁 public/posters/

Poster in alta risoluzione in formato portrait (usare come `src` dell'immagine nella card Netflix).
Aspect ratio ~2:3 — `object-fit: cover` sulla card.

| File | Dimensioni | Film |
|---|---|---|
| `beat_poster.jpg` | 1463×2048 | BEAT |
| `dream_weaver_poster.jpg` | 1448×2048 | Dream Weaver |
| `warpigs_poster.jpg` | 1449×2048 | Warpigs |
| `prospettiva_del_topo_poster.jpg` | 1448×2048 | La Prospettiva del Topo |

> ⚠️ **Mancanti:** `wasted_poster.jpg` e `love_u_2cb_poster.jpg` non erano nel PDF come immagini standalone. Da aggiungere manualmente. Nel frattempo usare il placeholder `#111` con il titolo in Anton centrato.

---

### 📁 public/photos/

Foto di scena in formato landscape — usate come background delle card Netflix (con overlay gradient scuro sopra) e come immagine di sfondo nelle sezioni dettaglio.
Applicare: `object-fit: cover`, `filter: brightness(0.4)` sotto il testo.

| File | Dimensioni | Utilizzo |
|---|---|---|
| `bio_photo.jpg` | 905×1024 | Sezione Bio (foto vintage "Dog & Pony Show") |
| `beat_bg.jpg` | 1180×787 | Card + bg sezione BEAT |
| `stage_and_race_bg.jpg` | 1000×544 | Card + bg sezione Stage and Race |
| `dream_weaver_bg.jpg` | 2048×1024 | Card + bg sezione Dream Weaver |
| `wasted_bg.jpg` | 2000×1392 | Card + bg sezione Wasted |
| `warpigs_bg.jpg` | 1920×799 | Card + bg sezione Warpigs |
| `love_u_2cb_bg.jpg` | 1300×760 | Card + bg sezione Love U 2cb |
| `prospettiva_del_topo_bg.jpg` | 2048×865 | Card + bg sezione La Prospettiva del Topo |
| `macallan_bg.jpg` | 827×1029 | Card + bg sezione Macallan |
| `maserati_bg.jpg` | 1200×675 | Card + bg sezione Maserati |
| `baracuta_bg.jpg` | 1457×816 | Card + bg sezione Baracuta |
| `lamborghini_bg.jpg` | 1920×900 | Card + bg sezione Lamborghini |
| `amdl_bg.jpg` | 1600×1389 | Card + bg sezione AMDL Circle |
| `tcct_bg.jpg` | 1280×632 | Card + bg sezione TCCT |
| `future_ready_bg.jpg` | 1400×788 | Card + bg sezione Future Ready |
| `tomorrow_pills_bg.jpg` | 1280×669 | Card + bg sezione Tomorrow Pills |

> ℹ️ `rethink_everything_bg.jpg` non estratto dal PDF — placeholder `#111` per ora.

---

### 📁 public/award_badges/

Badge dei premi in PNG con **canale alpha** (sfondo trasparente). Estratti con smask dal PDF.
Dimensioni: 1300×760px oppure 650×380px. Usare a dimensione ridotta nel pannello dettaglio della card (max-height: 40px circa, o come `<img>` in una flex row che wrappa).

> ⚠️ **Nota qualità:** sono raster JPEG compositi, non SVG vettoriali. Qualità adeguata per uso web a dimensioni ridotte.

#### Wasted (16 badge)
```
badge_wasted_00.png   badge_wasted_01.png   badge_wasted_02.png   badge_wasted_03.png
badge_wasted_04.png   badge_wasted_05.png   badge_wasted_06.png   badge_wasted_07.png
badge_wasted_08.png   badge_wasted_09.png   badge_wasted_10.png   badge_wasted_11.png
badge_wasted_12.png   badge_wasted_13.png   badge_wasted_14.png   badge_wasted_15.png
```

#### Warpigs (13 badge)
```
badge_warpigs_00.png  badge_warpigs_01.png  badge_warpigs_02.png  badge_warpigs_03.png
badge_warpigs_04.png  badge_warpigs_05.png  badge_warpigs_06.png  badge_warpigs_07.png
badge_warpigs_08.png  badge_warpigs_09.png  badge_warpigs_10.png  badge_warpigs_11.png
badge_warpigs_12.png
```

#### Love U 2cb (5 badge)
```
badge_love_u_2cb_00.png  badge_love_u_2cb_01.png  badge_love_u_2cb_02.png
badge_love_u_2cb_03.png  badge_love_u_2cb_04.png
```

#### La Prospettiva del Topo (8 badge)
```
badge_prospettiva_del_topo_00.png  badge_prospettiva_del_topo_01.png
badge_prospettiva_del_topo_02.png  badge_prospettiva_del_topo_03.png
badge_prospettiva_del_topo_04.png  badge_prospettiva_del_topo_05.png
badge_prospettiva_del_topo_06.png  badge_prospettiva_del_topo_07.png
```

---

### Integrazione nei dati JSON

Aggiornare i campi `posterUrl`, `bgUrl` e `badgeUrls` in ogni oggetto film:

```js
// Esempio — shorts.js
{
  "id": "wasted",
  "title": "Wasted",
  // ...
  "posterUrl": "/posters/wasted_poster.jpg",      // ← MANCANTE, usare null → placeholder
  "bgUrl":     "/photos/wasted_bg.jpg",
  "badgeUrls": [
    "/award_badges/badge_wasted_00.png",
    "/award_badges/badge_wasted_01.png",
    // ... fino a badge_wasted_15.png
  ]
}
```

### Componente card: logica poster vs bg

```jsx
// WorkCard.jsx
// Se posterUrl è disponibile → usare come immagine copertina della card
// Se posterUrl è null → usare bgUrl con brightness ridotta + titolo centrato in Anton
const cardImage = item.posterUrl ?? item.bgUrl;
const brightness = item.posterUrl ? 1 : 0.35;
```

---

### URL film
- Tutti i link `watchUrl` sono placeholder `"#"` — da aggiornare con gli URL reali
- Alcuni film hanno password: mostrare `(psw: XXXX)` accanto al link

### IMDb
- Il link IMDb al profilo reale di Ernesto va aggiunto quando disponibile

### Mobile (breakpoint < 768px)
- Nav: nascondere link testuali, lasciare solo "E." + hamburger menu (menu slide-in dal basso)
- Hero: font ridotto, padding 24px
- Shelf: mantenere scroll orizzontale, card width: 200px
- Card expand: al tap, aprire un bottom sheet (full-width, slide-up) invece del pannello inline
- Bio: colonna singola
- Contact: colonna singola

### Performance
- Usare `loading="lazy"` su tutte le immagini poster
- Il componente `NetflixShelf` non necessita di librerie esterne (no Swiper, no Embla) — implementazione vanilla con scroll nativo
- Google Fonts: preconnect + display=swap

### Accessibilità
- `role="listbox"` sulla shelf, `role="option"` su ogni card
- `aria-expanded` sulle card espanse
- Focus visible (outline dorato 2px) su tutti gli elementi interattivi
- `prefers-reduced-motion`: disabilitare scale e slide, mantenere solo opacity

---

## 11. COSA NON CAMBIARE

- URL del sito: `ernestogiuntini.netlify.app`
- Deploy pipeline Netlify (build command, publish dir)
- Eventuali routing già configurati
- **Nota:** verificare prima lo stack esatto (CRA vs Vite vs Next.js) guardando `package.json` nel repository

---

## 12. PRIORITÀ DI IMPLEMENTAZIONE (aggiornata)

```
1. [ALTA]  Setup font + CSS variables + reset
2. [ALTA]  Copiare giuntini_assets/ in public/ (posters/, photos/, award_badges/)
3. [ALTA]  Aggiornare posterUrl + bgUrl + badgeUrls nei file data/
4. [ALTA]  Hero section
5. [ALTA]  NetflixShelf + WorkCard (componente core)
6. [MEDIA] Bio section
7. [MEDIA] Awards section
8. [MEDIA] Contact section
9. [MEDIA] Nav con scroll behavior
10. [BASSA] Animazioni scroll reveal
11. [BASSA] Mobile bottom sheet per card expand
12. [BASSA] Drag-to-scroll sulla shelf (mouse)
13. [BASSA] Aggiungere wasted_poster.jpg e love_u_2cb_poster.jpg quando disponibili
```

---

*Handoff preparato il 01/05/2026 — Fonte: PDF "GIUNTINI'S DOG & PONY SHOW" + sito esistente ernestogiuntini.netlify.app*  
*Asset fotografici estratti dal PDF e inclusi in `giuntini_assets.zip` (18MB): 4 poster, 16 foto di scena, 42 badge premi PNG con alpha)*
