/* =========================================================================
   La Brace — content data (menu à la carte, vini, eventi, galleria)
   Struttura bilingue: i nomi dei piatti restano in italiano,
   le descrizioni hanno { it, en }. Prezzi in CHF.
   ========================================================================= */
window.LB = window.LB || {};

/* ---- MENU À LA CARTE ---------------------------------------------------- */
LB.alacarte = [
  {
    id: "arrosticini",
    title: { it: "Gli Arrosticini", en: "The Skewers" },
    lead: { it: "Per iniziare", en: "To begin" },
    items: [
      { name: "Cubi di pancetta croccante", note: { it: "3 pz", en: "3 pcs" },
        d: { it: "Spiedino di pancetta di maiale impanata, cetriolo in osmosi e salsa katsu",
             en: "Breaded pork belly skewer, osmosis cucumber and katsu sauce" },
        a: "1, 3, 6, 12", p: "16.50" },
      { name: "Sovracoscia di pollo", note: { it: "3 pz", en: "3 pcs" },
        d: { it: "Spiedino di sovracoscia di pollo arrostito, maionese e gochujang piccante",
             en: "Roasted chicken thigh skewer, mayonnaise and spicy gochujang" },
        a: "3, 6, 10", p: "18.50" },
      { name: "Manzo 2.0", note: { it: "3 pz", en: "3 pcs" },
        d: { it: "Spiedino di cubi di manzo marinati con salsa chimichurri",
             en: "Marinated beef cube skewer with chimichurri sauce" },
        a: "12", p: "20.50" },
      { name: "Tentacoli di polpo", note: { it: "3 pz", en: "3 pcs" },
        d: { it: "Spiedino di polpo arrostito, cremoso al pomodoro in agrodolce",
             en: "Roasted octopus skewer, sweet-and-sour tomato cream" },
        a: "4, 14", p: "22.50" }
    ],
    footnote: { it: "Prova tutti i mix di arrosticini (8 pz) a soli CHF 45.–",
                en: "Try the full skewer mix (8 pcs) for just CHF 45.–" }
  },
  {
    id: "salumi",
    title: { it: "Salumi e Formaggi", en: "Cured Meats & Cheeses" },
    items: [
      { name: "Crudo dell'Alpe Piora",
        d: { it: "Prosciutto crudo, pera allo zafferano e miele d'acacia",
             en: "Raw ham, saffron pear and acacia honey" },
        a: "", p: "28.50" },
      { name: "Bresaola di Wagyu svizzero",
        d: { it: "Con scaglie di Grana e vinaigrette balsamica",
             en: "With Grana flakes and balsamic vinaigrette" },
        a: "7", p: "36.50" },
      { name: "Formaggi delle valli",
        d: { it: "Gruyère, formaggella semistagionata, büscion e marmellata di stagione",
             en: "Gruyère, semi-aged formaggella, büscion and seasonal jam" },
        a: "7, 8", p: "18.50" }
    ]
  },
  {
    id: "tartare",
    title: { it: "Tartare", en: "Tartare" },
    items: [
      { name: "La Nostra Ricetta",
        d: { it: "Tartara di manzo con la nostra salsa al Worcester, cetriolini sottaceto e acciughe",
             en: "Beef tartare with our Worcester sauce, pickled gherkins and anchovies" },
        a: "3, 4, 10", p: "26.50" },
      { name: "Tartufata",
        d: { it: "Tartara di manzo, stracciatella di burrata, tuorlo d'uovo e caviale al tartufo",
             en: "Beef tartare, burrata stracciatella, egg yolk and truffle caviar" },
        a: "3, 7", p: "29.50" },
      { name: "Boscaiola",
        d: { it: "Tartara di manzo, maionese all'erba cipollina e polvere di spugnole",
             en: "Beef tartare, chive mayonnaise and morel powder" },
        a: "3, 7", p: "28.50" },
      { name: "Tris di Tartare",
        d: { it: "Assaggiale tutte: La Nostra Ricetta · Tartufata · Boscaiola",
             en: "Taste them all: Our Recipe · Truffle · Boscaiola" },
        a: "1, 3, 4, 7, 10", p: "30.50" }
    ]
  },
  {
    id: "primi",
    title: { it: "Primi", en: "First Courses" },
    items: [
      { name: "Lasagna Bianca ai Carciofi",
        d: { it: "Fonduta allo sbrinz, zafferano e guanciale",
             en: "Sbrinz fondue, saffron and guanciale" },
        a: "1, 3, 7", p: "26.50" },
      { name: "Tagliatelle La Brace",
        d: { it: "Ragù bianco di vitello al rosmarino",
             en: "White veal ragù with rosemary" },
        a: "1, 3, 7", p: "24.50" },
      { name: "Paccheri Polpo e Pecorino",
        d: { it: "Cacciatora di polpo al vino rosso e cremoso al pecorino",
             en: "Octopus cacciatora in red wine and pecorino cream" },
        a: "1, 4, 7, 12", p: "28.50" },
      { name: "Ravioli ai Formaggi d'Alpe",
        d: { it: "Salsa al gorgonzola, pera al vino rosso e noci",
             en: "Gorgonzola sauce, red-wine pear and walnuts" },
        a: "1, 3, 7", p: "22.50" }
    ]
  },
  {
    id: "carni",
    title: { it: "Carni Svizzere alla Brace", en: "Swiss Meats on the Grill" },
    lead: { it: "Le selezioni La Brace", en: "The La Brace selections" },
    items: [
      { name: "Controfiletto di Manzo", note: { it: "250–300 g", en: "250–300 g" },
        d: { it: "Taglio estremamente tenero e saporito grazie a sottili venature di grasso",
             en: "Extremely tender, flavourful cut with fine marbling" },
        a: "", p: "36.50" },
      { name: "Filetto di Manzo", note: { it: "200–250 g", en: "200–250 g" },
        d: { it: "Carne magra, tenerissima dal sapore delicato",
             en: "Lean, very tender meat with a delicate flavour" },
        a: "", p: "46.50" },
      { name: "Baffa di Costine del Carré al Forno",
        d: { it: "Costine di maiale dal sapore ricco e bilanciato",
             en: "Oven pork ribs, rich and balanced in flavour" },
        a: "", p: "34.50" },
      { name: "Galletto al Mattone",
        d: { it: "Cotto a bassa temperatura con il suo rub speziato e arrostito",
             en: "Slow-cooked with a spiced rub, then roasted" },
        a: "", p: "29.50" },
      { name: "Grigliata Mista", note: { it: "min. 2 persone", en: "min. 2 people" },
        d: { it: "Controfiletto, costine, galletto e salamella, compreso di contorno — a persona",
             en: "Sirloin, ribs, poussin and salamella, side included — per person" },
        a: "", p: "59.50" }
    ],
    sides: {
      title: { it: "Contorni", en: "Sides" },
      list: [
        { name: { it: "Insalata mista", en: "Mixed salad" }, p: "4.50" },
        { name: { it: "Insalata verde", en: "Green salad" }, p: "3.50" },
        { name: { it: "Patatine", en: "Fries" }, p: "5.50" },
        { name: { it: "Patate rosolate", en: "Sautéed potatoes" }, p: "6.50" },
        { name: { it: "Verdure grigliate", en: "Grilled vegetables" }, p: "7.50" }
      ]
    }
  },
  {
    id: "fritture",
    title: { it: "Fritture", en: "Fried" },
    items: [
      { name: "Cordon Bleu di Maiale",
        d: { it: "Fonduta di raclette e patate rosolate",
             en: "Raclette fondue and sautéed potatoes" },
        a: "1, 3, 7", p: "29.50" },
      { name: "Pollo Fritto Super Croccante",
        d: { it: "Maionese al tartufo nero e patate rosolate",
             en: "Black-truffle mayonnaise and sautéed potatoes" },
        a: "1, 3, 7", p: "26.50" }
    ]
  },
  {
    id: "hamburger",
    title: { it: "Hamburger", en: "Burgers" },
    lead: { it: "Serviti con patatine fritte", en: "Served with fries" },
    items: [
      { name: "Hamburger Classico",
        d: { it: "Pane artigianale, 200 g di manzo, edamer, pancetta, insalata, pomodoro e maionese",
             en: "Artisan bun, 200 g beef, edam, bacon, lettuce, tomato and mayo" },
        a: "1, 3, 7", p: "26.50" },
      { name: "Hamburger Tricolore",
        d: { it: "Pane artigianale, 200 g di manzo, burrata di bufala, rucola e pomodoro",
             en: "Artisan bun, 200 g beef, buffalo burrata, rocket and tomato" },
        a: "1, 3, 7", p: "28.50" },
      { name: "K. Chicken Burger",
        d: { it: "Pane artigianale, pollo croccante, cetrioli, salsa koreana, insalata di cavolo e sesamo",
             en: "Artisan bun, crispy chicken, gherkins, korean sauce, cabbage-sesame slaw" },
        a: "1, 7", p: "24.50" },
      { name: "Veggy Burger",
        d: { it: "Pane artigianale, burger 100% vegetale, formaggio vegetale, peperone arrostito, maionese vegana e insalata",
             en: "Artisan bun, 100% plant burger, vegan cheese, roasted pepper, vegan mayo and salad" },
        a: "1, 6", p: "24.50" }
    ]
  },
  {
    id: "pizze-classiche",
    title: { it: "Pizze Classiche", en: "Classic Pizzas" },
    items: [
      { name: "Marinara", d: { it: "Pomodoro San Marzano, aglio, origano, olio EVO", en: "San Marzano tomato, garlic, oregano, EVO oil" }, a: "1", p: "11.50" },
      { name: "Margherita", d: { it: "Pomodoro San Marzano, fior di latte, basilico fresco", en: "San Marzano tomato, fior di latte, fresh basil" }, a: "1, 7", p: "14.50" },
      { name: "Napoli", d: { it: "Pomodoro, fior di latte, acciughe, origano", en: "Tomato, fior di latte, anchovies, oregano" }, a: "1, 4, 7", p: "14.50" },
      { name: "Romana", d: { it: "Pomodoro, fior di latte, acciughe, capperi e olive nere", en: "Tomato, fior di latte, anchovies, capers and black olives" }, a: "1, 4, 7", p: "15.50" },
      { name: "Diavola", d: { it: "Pomodoro, fior di latte, salamino piccante", en: "Tomato, fior di latte, spicy salami" }, a: "1, 7", p: "16.50" },
      { name: "Prosciutto Cotto e Mascarpone", d: { it: "Pomodoro, fior di latte, prosciutto cotto, mascarpone", en: "Tomato, fior di latte, cooked ham, mascarpone" }, a: "1, 7", p: "17.50" },
      { name: "Prosciutto e Funghi", d: { it: "Pomodoro, fior di latte, prosciutto cotto, funghi freschi", en: "Tomato, fior di latte, cooked ham, fresh mushrooms" }, a: "1, 7", p: "17.50" },
      { name: "Capricciosa", d: { it: "Pomodoro, fior di latte, prosciutto cotto, funghi, carciofi e olive", en: "Tomato, fior di latte, cooked ham, mushrooms, artichokes and olives" }, a: "1, 7", p: "19.50" },
      { name: "Quattro Stagioni", d: { it: "Pomodoro, fior di latte, prosciutto cotto, funghi, carciofi, olive", en: "Tomato, fior di latte, cooked ham, mushrooms, artichokes, olives" }, a: "1, 7", p: "19.50" },
      { name: "Quattro Formaggi", d: { it: "Fior di latte, gorgonzola, scamorza, grana", en: "Fior di latte, gorgonzola, scamorza, grana" }, a: "1, 7", p: "18.50" },
      { name: "Tonno e Cipolla", d: { it: "Pomodoro, fior di latte, tonno, cipolla rossa", en: "Tomato, fior di latte, tuna, red onion" }, a: "1, 4, 7", p: "18.50" },
      { name: "Würstel", d: { it: "Pomodoro, fior di latte, würstel", en: "Tomato, fior di latte, frankfurter" }, a: "1, 7", p: "15.50" },
      { name: "Salsiccia", d: { it: "Pomodoro, fior di latte, salsiccia", en: "Tomato, fior di latte, sausage" }, a: "1, 7", p: "16.50" },
      { name: "Funghi", d: { it: "Pomodoro, fior di latte, funghi champignon", en: "Tomato, fior di latte, champignon mushrooms" }, a: "1, 7", p: "15.50" },
      { name: "Vegetariana", d: { it: "Pomodoro, fior di latte, verdure grigliate di stagione", en: "Tomato, fior di latte, seasonal grilled vegetables" }, a: "1, 7", p: "17.50" },
      { name: "Sfizzica", d: { it: "Pomodoro, fior di latte, cipolla, salsiccia e peperoncino", en: "Tomato, fior di latte, onion, sausage and chilli" }, a: "1, 7", p: "18.50" },
      { name: "Bufacrudo", d: { it: "Pomodoro, mozzarella di bufala, basilico fresco", en: "Tomato, buffalo mozzarella, fresh basil" }, a: "1, 7", p: "21.50" },
      { name: "Malafemmina", d: { it: "Mozzarella, mozzarella di bufala, salsiccia e friarielli", en: "Mozzarella, buffalo mozzarella, sausage and friarielli" }, a: "1, 7", p: "22.50" }
    ]
  },
  {
    id: "pizze-speciali",
    title: { it: "Pizze Speciali", en: "Signature Pizzas" },
    items: [
      { name: "La Tartufata", d: { it: "Pomodoro, fior di latte, crudo, burrata e tartufo", en: "Tomato, fior di latte, raw ham, burrata and truffle" }, a: "1, 7", p: "23.50" },
      { name: "Aspromonte", d: { it: "Fior di latte, 'nduja, porcini e pancetta", en: "Fior di latte, 'nduja, porcini and bacon" }, a: "1, 7", p: "21.50" },
      { name: "Bufaspeck", d: { it: "Pomodoro, fior di latte, speck croccante, porcini e bufala", en: "Tomato, fior di latte, crispy speck, porcini and buffalo mozzarella" }, a: "1, 7", p: "24.50" },
      { name: "Del Giò", d: { it: "Fior di latte, mortadella, burrata e granella di pistacchio", en: "Fior di latte, mortadella, burrata and pistachio grains" }, a: "1, 7, 8", p: "23.50" },
      { name: "La Tartare", d: { it: "Fior di latte, tartara di manzo, tuorlo d'uovo e pomodorini", en: "Fior di latte, beef tartare, egg yolk and cherry tomatoes" }, a: "1, 3, 7", p: "24.50" },
      { name: "La Brace", d: { it: "Fior di latte, sfilacciato di puntine, cipolla caramellata e grana", en: "Fior di latte, pulled ribs, caramelised onion and grana" }, a: "1, 7", p: "22.50" },
      { name: "Wagyu", d: { it: "Fior di latte, bresaola di wagyu, pomodorini, limone e grana 36 mesi", en: "Fior di latte, wagyu bresaola, cherry tomatoes, lemon and 36-month grana" }, a: "1, 7", p: "32.50" }
    ]
  },
  {
    id: "calzoni",
    title: { it: "Calzoni e Focacce", en: "Calzones & Focaccias" },
    items: [
      { name: "Calzone Classico", d: { it: "Pomodoro, fior di latte, prosciutto cotto", en: "Tomato, fior di latte, cooked ham" }, a: "1, 7", p: "17.50" },
      { name: "Calzone Farcito", d: { it: "Pomodoro, fior di latte, prosciutto cotto, funghi, uova", en: "Tomato, fior di latte, cooked ham, mushrooms, eggs" }, a: "1, 3, 7", p: "19.50" },
      { name: "Calzone Diavolo", d: { it: "Pomodoro, fior di latte, salamino piccante, scamorza", en: "Tomato, fior di latte, spicy salami, scamorza" }, a: "1, 7", p: "18.50" },
      { name: "Calzone Vegetariano", d: { it: "Pomodoro, fior di latte, verdure grigliate", en: "Tomato, fior di latte, grilled vegetables" }, a: "1, 7", p: "18.50" },
      { name: "Focaccia Bianca", d: { it: "Olio EVO, sale e aglio", en: "EVO oil, salt and garlic" }, a: "1", p: "9.50" },
      { name: "Focaccia Aglio Olio e Rosmarino", d: { it: "Olio EVO, sale, aglio e rosmarino", en: "EVO oil, salt, garlic and rosemary" }, a: "1", p: "9.50" },
      { name: "Focaccia Crudo", d: { it: "Prosciutto crudo, rucola e scaglie di grana", en: "Raw ham, rocket and grana flakes" }, a: "1, 7", p: "18.50" },
      { name: "Focaccia Caprese", d: { it: "Mozzarella di bufala, pomodorini e basilico", en: "Buffalo mozzarella, cherry tomatoes and basil" }, a: "1, 7", p: "16.50" }
    ],
    footnote: { it: "Impasti speciali: Multi Cereali +3.50 · Al Carbone +3.50 · Gluten Free +5.50",
                en: "Special doughs: Multi-grain +3.50 · Charcoal +3.50 · Gluten Free +5.50" }
  },
  {
    id: "bambini",
    title: { it: "Menù Bambini", en: "Kids' Menu" },
    items: [
      { name: "Pennette al Pomodoro", d: { it: "", en: "" }, a: "1, 3", p: "9.50" },
      { name: "Pollo Impanato e Patatine", d: { it: "", en: "" }, a: "1, 7", p: "12.50" },
      { name: "Hamburger di Manzo e Patatine", d: { it: "", en: "" }, a: "1, 3", p: "12.50" },
      { name: "Baby Pizza Margherita", d: { it: "Pomodoro San Marzano, fior di latte, basilico", en: "San Marzano tomato, fior di latte, basil" }, a: "1, 7", p: "12.00" },
      { name: "Patatapizza", d: { it: "", en: "" }, a: "1, 3", p: "13.50" },
      { name: "Baby Pizza Würstel", d: { it: "Pomodoro, patatine fritte, würstel", en: "Tomato, fries, frankfurter" }, a: "1, 7", p: "14.00" }
    ]
  }
];

/* ---- DRY AGE (sezione dedicata, tabella cuts) --------------------------- */
LB.dryage = {
  intro: {
    it: "La carne Dry Aged è il frutto di una maturazione lenta e controllata, che concentra il sapore e ne affina la struttura, esaltandone la tenerezza. L'espressione più alta della carne rossa.",
    en: "Dry-aged beef is the result of a slow, controlled maturation that concentrates flavour and refines the structure, enhancing tenderness. The highest expression of red meat."
  },
  from: { it: "A partire da CHF 12.– ogni 100 g", en: "From CHF 12.– per 100 g" },
  head: {
    cut: { it: "Taglio", en: "Cut" },
    profile: { it: "Profilo di gusto", en: "Flavour profile" },
    ideal: { it: "Ideale se vuoi…", en: "Ideal if you want…" }
  },
  cuts: [
    { cut: "Charra ES", profile: { it: "Delicato, leggermente dolce, morbido e fine", en: "Delicate, slightly sweet, soft and fine" }, ideal: { it: "Iniziare con una carne elegante e non invasiva", en: "To start with an elegant, gentle cut" } },
    { cut: "Manzetta IR", profile: { it: "Dolcezza, consistenza molto tenera", en: "Sweetness, very tender texture" }, ideal: { it: "Massima tenerezza e gusto leggero", en: "Maximum tenderness and a light taste" } },
    { cut: "Sashi Choco FI", profile: { it: "Dolce con note particolari, tenera e succosa", en: "Sweet with distinctive notes, tender and juicy" }, ideal: { it: "Qualcosa di diverso, senza eccessi", en: "Something different, without excess" } },
    { cut: "Black Angus CH", profile: { it: "Saporito, rotondo, note classiche leggermente nocciolate", en: "Savoury, round, classic slightly nutty notes" }, ideal: { it: "Una carne equilibrata, perfetta per una bistecca classica", en: "A balanced cut, perfect for a classic steak" } },
    { cut: "Black Angus USA", profile: { it: "Intenso, succulento, forte carattere e aroma", en: "Intense, succulent, strong character and aroma" }, ideal: { it: "Un carattere deciso, stile steakhouse o BBQ", en: "A bold character, steakhouse or BBQ style" } },
    { cut: "Wagyu JP", profile: { it: "Dolce, burroso, molto intenso ed elegante", en: "Sweet, buttery, very intense and elegant" }, ideal: { it: "L'equilibrio perfetto tra gusto e succosità", en: "The perfect balance of taste and juiciness" } },
    { cut: "Rubia Gallega ES", profile: { it: "Gusto unico e profondo, grasso che si scioglie", en: "Unique, deep flavour, melting fat" }, ideal: { it: "Un'esperienza intensa, matura e riconoscibile", en: "An intense, mature and recognisable experience" } },
    { cut: "Manzetta PL", profile: { it: "Delicato, pulito, leggermente dolce", en: "Delicate, clean, slightly sweet" }, ideal: { it: "Una carne leggera e facile, senza eccesso di grasso", en: "A light, easy cut without excess fat" } },
    { cut: "Wagyu AU", profile: { it: "Umami pronunciato, grasso fondente in bocca", en: "Pronounced umami, fat melting in the mouth" }, ideal: { it: "Massima morbidezza e avvolgenza al palato", en: "Maximum softness and richness on the palate" } }
  ]
};

/* ---- CARTA VINI (contenuti provvisori, realistici) ---------------------- */
LB.wine = {
  note: {
    it: "Selezione in aggiornamento — una piccola parte della nostra cantina. Chiedete in sala per l'annata e i suggerimenti dello chef.",
    en: "Selection being updated — a small part of our cellar. Ask our staff for the vintage and the chef's pairing."
  },
  cats: [
    {
      title: { it: "Rossi del Ticino", en: "Ticino Reds" },
      items: [
        { name: "Merlot del Ticino DOC — Gialdi", d: { it: "Speziato, morbido, ciliegia matura", en: "Spicy, soft, ripe cherry" }, p: "52" },
        { name: "Rovere Riserva — Vinattieri", d: { it: "Merlot in barrique, struttura e vaniglia", en: "Barrique Merlot, structure and vanilla" }, p: "68" },
        { name: "Ronco Bain — Cantina Kopp", d: { it: "Elegante, frutti rossi e tabacco", en: "Elegant, red fruit and tobacco" }, p: "74" },
        { name: "Sassi Grossi — Gialdi", d: { it: "Grande Merlot ticinese, lungo e profondo", en: "Great Ticino Merlot, long and deep" }, p: "95" }
      ]
    },
    {
      title: { it: "Bolgheri & Toscana", en: "Bolgheri & Tuscany" },
      items: [
        { name: "Bolgheri Rosso DOC — Le Macchiole", d: { it: "Cabernet e Merlot, mora e macchia mediterranea", en: "Cabernet and Merlot, blackberry and Mediterranean scrub" }, p: "78" },
        { name: "Guado al Tasso — Antinori", d: { it: "Potente ed elegante, frutta scura e spezie", en: "Powerful and elegant, dark fruit and spice" }, p: "165" },
        { name: "Brunello di Montalcino — Banfi", d: { it: "Sangiovese, tannini fini e lunga persistenza", en: "Sangiovese, fine tannins and long finish" }, p: "120" },
        { name: "Tignanello — Antinori", d: { it: "Il super-tuscan iconico, complesso e vellutato", en: "The iconic super-tuscan, complex and velvety" }, p: "175" }
      ]
    },
    {
      title: { it: "Grandi Rossi d'Italia", en: "Great Italian Reds" },
      items: [
        { name: "Barolo DOCG — Pio Cesare", d: { it: "Nebbiolo, rosa, catrame e liquirizia", en: "Nebbiolo, rose, tar and liquorice" }, p: "110" },
        { name: "Amarone della Valpolicella — Allegrini", d: { it: "Ricco, appassito, frutta in confettura", en: "Rich, dried-grape, jammy fruit" }, p: "98" },
        { name: "Primitivo di Manduria — Gianfranco Fino", d: { it: "Caldo, prugna e cioccolato", en: "Warm, plum and chocolate" }, p: "72" }
      ]
    },
    {
      title: { it: "Bianchi & Bollicine", en: "Whites & Sparkling" },
      items: [
        { name: "Bianco del Ticino — Chardonnay", d: { it: "Fresco, agrumi e nota minerale", en: "Fresh, citrus and mineral note" }, p: "48" },
        { name: "Gavi di Gavi DOCG — La Scolca", d: { it: "Cortese, secco e sapido", en: "Cortese, dry and savoury" }, p: "56" },
        { name: "Franciacorta Brut — Ca' del Bosco", d: { it: "Bollicina fine, crosta di pane e agrumi", en: "Fine bubbles, brioche and citrus" }, p: "85" },
        { name: "Champagne Brut — Réserve", d: { it: "Elegante e persistente", en: "Elegant and persistent" }, p: "130" }
      ]
    }
  ]
};

/* ---- EVENTI ------------------------------------------------------------- */
LB.events = [
  { feature: true, img: "events/evento_01.jpeg",
    tag: { it: "Evento del mese", en: "Event of the month" },
    title: { it: "Costate e Fiorentine a volontà", en: "Unlimited T-bones & Florentine steaks" } },
  { img: "0055_Braceria_Manno_050526.jpg",
    tag: { it: "Su prenotazione", en: "On reservation" },
    title: { it: "Cene aziendali & eventi privati", en: "Corporate dinners & private events" },
    d: { it: "Sale su misura per aziende, compleanni e ricorrenze. Menu dedicati costruiti insieme a voi, dalla brace alle bollicine.",
         en: "Tailored spaces for companies, birthdays and celebrations. Bespoke menus built with you, from the grill to the bubbles." },
    price: "" },
  { img: "0796_Braceria_Manno_050526.jpg",
    tag: { it: "A persona", en: "Per person" },
    title: { it: "Giro Pizza", en: "Pizza Round" },
    d: { it: "Assaggia i nostri impasti speciali e le creazioni fuori carta del pizzaiolo, servite a volontà.",
         en: "Taste our special doughs and the pizzaiolo's off-menu creations, served to your heart's content." },
    price: "CHF 25.–", note: { it: "min. 4 persone", en: "min. 4 people" } },
  { img: "0707_Braceria_Manno_050526.jpg",
    tag: { it: "Da condividere", en: "To share" },
    title: { it: "Fondue Chinoise & Bourguignonne", en: "Fondue Chinoise & Bourguignonne" },
    d: { it: "Carpaccio di manzo da cuocere in brodo aromatico o nell'olio, con salse home made. Un rito conviviale.",
         en: "Beef carpaccio to cook in aromatic broth or oil, with home-made sauces. A convivial ritual." },
    price: { it: "da CHF 39.50", en: "from CHF 39.50" }, note: { it: "min. 2 persone", en: "min. 2 people" } }
];

/* ---- ALLERGENI ---------------------------------------------------------- */
LB.allergens = {
  it: ["Cereali contenenti glutine","Crostacei","Uova","Pesce","Arachidi","Soia","Latte e derivati","Frutta a guscio","Sedano","Senape","Sesamo","Anidride solforosa e solfiti","Lupini","Molluschi"],
  en: ["Gluten cereals","Crustaceans","Eggs","Fish","Peanuts","Soy","Milk & dairy","Tree nuts","Celery","Mustard","Sesame","Sulphur dioxide & sulphites","Lupin","Molluscs"]
};

/* ---- GALLERIA (foto curate) --------------------------------------------- */
LB.gallery = [
  "0668_Braceria_Manno_050526.jpg","0796_Braceria_Manno_050526.jpg","0055_Braceria_Manno_050526.jpg",
  "0707_Braceria_Manno_050526.jpg","0022_Braceria_Manno_050526.jpg","0339_Braceria_Manno_050526.jpg",
  "0004_Braceria_Manno_050526.jpg","0037_Braceria_Manno_050526.jpg","0073_Braceria_Manno_050526.jpg",
  "0080_Braceria_Manno_050526.jpg","0150_Braceria_Manno_050526.jpg","0207_Braceria_Manno_050526.jpg",
  "0251_Braceria_Manno_050526.jpg","0277_Braceria_Manno_050526.jpg","0360_Braceria_Manno_050526.jpg",
  "0485_Braceria_Manno_050526.jpg","0535_Braceria_Manno_050526.jpg","0617_Braceria_Manno_050526.jpg",
  "0723_Braceria_Manno_050526.jpg","0765_Braceria_Manno_050526.jpg","0826_Braceria_Manno_050526.jpg",
  "0865_Braceria_Manno_050526.jpg","0902_Braceria_Manno_050526.jpg","0939_Braceria_Manno_050526.jpg",
  "0173_Braceria_Manno_050526.jpg","0621_Braceria_Manno_050526.jpg","0678_Braceria_Manno_050526.jpg",
  "0308_Braceria_Manno_050526.jpg","0116_Braceria_Manno_050526.jpg","0644_Braceria_Manno_050526.jpg"
];

/* ---- REELS (video verticali) -------------------------------------------- */
LB.reels = [
  "Reel_1_La_Brace_Manno","Reel_2_La_Brace_Manno","Reel_3_La_Brace_Manno",
  "Reel_4_La_Brace_Manno","Reel_7_La_Brace_Manno","Reel_8_La_Brace_Manno"
];
