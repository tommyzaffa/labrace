/* =========================================================================
   La Brace — content data (menu à la carte, vini, eventi, galleria)
   Struttura bilingue: i nomi dei piatti restano in italiano,
   le descrizioni hanno { it, en }. Prezzi in CHF.
   ========================================================================= */
window.LB = window.LB || {};

/* ---- MENU À LA CARTE ---------------------------------------------------- */
LB.alacarte = [
  {
    id: "voraci",
    title: { it: "Per i più voraci", en: "For the hungriest" },
    lead: { it: "Le nostre esperienze da condividere", en: "Our experiences to share" },
    items: [
      { name: "Costine all you can eat",
        d: { it: "Baffe di costine del carré al forno servite a volontà, con contorno di patatine",
             en: "Oven-baked pork rib racks served unlimited, with a side of fries" },
        a: "1, 8, 10", p: "38.–" },
      { name: "Dry Aged", note: { it: "a partire da · ogni 100 g", en: "from · per 100 g" },
        d: { it: "Soffice focaccia con prosciutto stagionato 16 mesi. Scegli il tuo taglio di carne frollata (da 30 a 60 giorni) e accompagnala con il contorno che preferisci",
             en: "Soft focaccia with 16-month cured ham. Choose your dry-aged cut (30 to 60 days) and pair it with the side you prefer" },
        a: "1", p: "12.–" },
      { name: "Tris di Tartare",
        d: { it: "La nostra ricetta · Stracciatella e pistacchio · Tonnocciolata. Accompagnate da soffice focaccia e burro salato",
             en: "Our recipe · Stracciatella and pistachio · Tonnocciolata. Served with soft focaccia and salted butter" },
        a: "1, 3, 7, 8, 10", p: "30.50" },
      { name: "Giro Pizza", note: { it: "minimo 4 persone", en: "minimum 4 people" },
        d: { it: "Impasti speciali e proposte fuori carta",
             en: "Special doughs and off-menu creations" },
        a: "1, 3, 7", p: "25.–" }
    ]
  },
  {
    id: "salumi",
    title: { it: "Salumi e Formaggi", en: "Cured Meats & Cheeses" },
    lead: { it: "Tutti i taglieri sono accompagnati da soffice focaccia (1)",
            en: "All boards are served with soft focaccia (1)" },
    items: [
      { name: "Gran Tagliere",
        d: { it: "Prosciutto crudo Alpe Piora, salame nostrano, lardo venato, formaggella, gruyère, büscion, mostarda di stagione e sott'aceti",
             en: "Alpe Piora raw ham, local salami, veined lardo, formaggella, gruyère, büscion, seasonal mostarda and pickles" },
        a: "1, 7, 10, 12", p: "28.50" },
      { name: "Bresaola di Wagyu Svizzero",
        d: { it: "Sottilissima di wagyu argoviese, insalata di mela, nocciole e limone",
             en: "Paper-thin Aargau wagyu, apple salad, hazelnuts and lemon" },
        a: "1, 8, 12", p: "36.50" },
      { name: "Formaggi delle Valli",
        d: { it: "Formaggella, gruyère, büscion e mostarda di stagione",
             en: "Formaggella, gruyère, büscion and seasonal mostarda" },
        a: "1, 7, 10", p: "18.50" }
    ]
  },
  {
    id: "tartare",
    title: { it: "Tartare", en: "Tartare" },
    items: [
      { name: "La Nostra Ricetta",
        d: { it: "Tartara di manzo, con la nostra salsa al Worcester, cetriolini sottaceto, acciughe",
             en: "Beef tartare with our Worcester sauce, pickled gherkins, anchovies" },
        a: "1, 4, 10", p: "26.50" },
      { name: "Stracciatella e Pistacchio",
        d: { it: "Tartara di manzo, stracciatella di burrata, pistacchio e zest di limone",
             en: "Beef tartare, burrata stracciatella, pistachio and lemon zest" },
        a: "1, 7, 8", p: "29.50" },
      { name: "Tonnocciolata",
        d: { it: "Tartara di manzo, salsa tonnata alle nocciole, crostino di pane e foglie di cappero",
             en: "Beef tartare, hazelnut tuna sauce, bread crouton and caper leaves" },
        a: "1, 8, 10", p: "27.50" }
    ]
  },
  {
    id: "primi",
    title: { it: "Primi", en: "First Courses" },
    items: [
      { name: "Ravioli ripieni di Carbonara",
        d: { it: "Con salsa carbonara e polvere di guanciale",
             en: "With carbonara sauce and guanciale powder" },
        a: "1, 3", p: "22.50" },
      { name: "Tagliatelle La Brace",
        d: { it: "Burro all'aneto e ragù bianco di manzo dry aged",
             en: "Dill butter and white dry-aged beef ragù" },
        a: "1, 3, 7", p: "24.50" },
      { name: "Linguine alle Vongole Veraci",
        d: { it: "Bottarga di muggine e salsa al prezzemolo",
             en: "Grey mullet bottarga and parsley sauce" },
        a: "1, 4, 14", p: "28.50" },
      { name: "Colurgiones",
        d: { it: "Patate, menta, pecorino e lamine di tartufo nero estivo",
             en: "Potato, mint, pecorino and summer black truffle shavings" },
        a: "1, 3, 7", p: "28.50" }
    ]
  },
  {
    id: "carni",
    title: { it: "Selezioni di Carni Svizzere", en: "Swiss Meat Selections" },
    lead: { it: "La Brace", en: "La Brace" },
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
      { name: "Entraña di Manzo", note: { it: "300 g", en: "300 g" },
        d: { it: "", en: "" },
        a: "", p: "28.50" }
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
    id: "hamburger",
    title: { it: "Hamburger", en: "Burgers" },
    lead: { it: "Serviti con patatine fritte (1, 8)", en: "Served with fries (1, 8)" },
    items: [
      { name: "Hamburger Classico",
        d: { it: "Pane artigianale, 200 gr di manzo, edamer, pancetta, insalata, pomodoro e maionese",
             en: "Artisan bun, 200 g beef, edam, bacon, lettuce, tomato and mayo" },
        a: "1, 3, 7", p: "26.50" },
      { name: "Tartar Burger",
        d: { it: "Pane artigianale, tartara di manzo, tuorlo d'uovo marinato, pecorino e tartufo nero estivo",
             en: "Artisan bun, beef tartare, marinated egg yolk, pecorino and summer black truffle" },
        a: "1, 3, 6, 7", p: "28.50" },
      { name: "K. Chicken Burger",
        d: { it: "Pane artigianale, pollo croccante, cetrioli, salsa koreana, insalata di cavolo e sesamo",
             en: "Artisan bun, crispy chicken, gherkins, korean sauce, cabbage-sesame slaw" },
        a: "1, 6, 7", p: "24.50" },
      { name: "Veggy Burger",
        d: { it: "Pane artigianale, burger 100% vegetale, formaggio vegetale, peperone arrostito, maionese vegana e insalata verde",
             en: "Artisan bun, 100% plant burger, vegan cheese, roasted pepper, vegan mayo and green salad" },
        a: "1, 6, 10", p: "24.50" },
      { name: "Polpo e Burrata",
        d: { it: "Pane artigianale al carbone vegetale, polpo fritto, cremoso al pomodoro, rucola e burrata",
             en: "Charcoal artisan bun, fried octopus, tomato cream, rocket and burrata" },
        a: "1, 4, 7", p: "30.50" }
    ]
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
        d: { it: "Maionese piccante e patate rosolate",
             en: "Spicy mayonnaise and sautéed potatoes" },
        a: "1, 3, 7", p: "26.50" }
    ]
  },
  {
    id: "pizze-classiche",
    title: { it: "Pizze Classiche", en: "Classic Pizzas" },
    items: [
      { name: "Marinara", d: { it: "Pomodoro, aglio, origano, olio extravergine di oliva", en: "Tomato, garlic, oregano, extra virgin olive oil" }, a: "1", p: "11.50" },
      { name: "Margherita", d: { it: "Pomodoro, mozzarella fior di latte, basilico", en: "Tomato, fior di latte mozzarella, basil" }, a: "1, 7", p: "14.50" },
      { name: "Napoli", d: { it: "Pomodoro, mozzarella fior di latte, acciughe, origano", en: "Tomato, fior di latte mozzarella, anchovies, oregano" }, a: "1, 4, 7", p: "14.50" },
      { name: "Romana", d: { it: "Pomodoro, mozzarella fior di latte, acciughe, capperi e olive nere", en: "Tomato, fior di latte mozzarella, anchovies, capers and black olives" }, a: "1, 4, 7", p: "15.50" },
      { name: "Diavola", d: { it: "Pomodoro, mozzarella fior di latte, salame piccante", en: "Tomato, fior di latte mozzarella, spicy salami" }, a: "1, 7", p: "16.50" },
      { name: "Prosciutto Cotto e Mascarpone", d: { it: "Pomodoro, mozzarella fior di latte, prosciutto cotto, mascarpone", en: "Tomato, fior di latte mozzarella, cooked ham, mascarpone" }, a: "1, 7", p: "17.50" },
      { name: "Prosciutto e Funghi", d: { it: "Pomodoro, mozzarella fior di latte, prosciutto cotto, funghi", en: "Tomato, fior di latte mozzarella, cooked ham, mushrooms" }, a: "1, 7", p: "17.50" },
      { name: "Capricciosa", d: { it: "Pomodoro, mozzarella fior di latte, prosciutto cotto, funghi, carciofi e olive", en: "Tomato, fior di latte mozzarella, cooked ham, mushrooms, artichokes and olives" }, a: "1, 7", p: "19.50" },
      { name: "Quattro Stagioni", d: { it: "Pomodoro, mozzarella fior di latte, prosciutto cotto, funghi, carciofi, olive", en: "Tomato, fior di latte mozzarella, cooked ham, mushrooms, artichokes, olives" }, a: "1, 7", p: "19.50" },
      { name: "Quattro Formaggi", d: { it: "Mozzarella fior di latte, gorgonzola, scamorza, grana", en: "Fior di latte mozzarella, gorgonzola, scamorza, grana" }, a: "1, 7", p: "18.50" },
      { name: "Tonno e Cipolla", d: { it: "Pomodoro, mozzarella fior di latte, tonno, cipolla rossa", en: "Tomato, fior di latte mozzarella, tuna, red onion" }, a: "1, 4, 7", p: "18.50" },
      { name: "Würstel", d: { it: "Pomodoro, mozzarella fior di latte, würstel", en: "Tomato, fior di latte mozzarella, frankfurter" }, a: "1, 7", p: "15.50" },
      { name: "Vegetariana", d: { it: "Pomodoro, mozzarella fior di latte, verdure grigliate di stagione", en: "Tomato, fior di latte mozzarella, seasonal grilled vegetables" }, a: "1, 7", p: "17.50" },
      { name: "Sfizzica", d: { it: "Pomodoro, mozzarella fior di latte, cipolla, salsiccia e peperoncino", en: "Tomato, fior di latte mozzarella, onion, sausage and chilli" }, a: "1, 7", p: "18.50" },
      { name: "Bufacrudo", d: { it: "Pomodoro, mozzarella di bufala, prosciutto crudo e basilico fresco", en: "Tomato, buffalo mozzarella, raw ham and fresh basil" }, a: "1, 7", p: "21.50" },
      { name: "Malafemmina", d: { it: "Mozzarella, mozzarella di bufala, salsiccia e friarielli", en: "Mozzarella, buffalo mozzarella, sausage and friarielli" }, a: "1, 7", p: "22.50" }
    ]
  },
  {
    id: "pizze-speciali",
    title: { it: "Pizze Speciali", en: "Signature Pizzas" },
    items: [
      { name: "La Tartufata", d: { it: "Pomodoro, fior di latte, crudo, burrata e tartufo", en: "Tomato, fior di latte, raw ham, burrata and truffle" }, a: "1, 7", p: "23.50" },
      { name: "Aspromonte", d: { it: "Mozzarella fior di latte, 'nduja, porcini e pancetta", en: "Fior di latte mozzarella, 'nduja, porcini and bacon" }, a: "1, 7", p: "21.50" },
      { name: "Bufaspeck", d: { it: "Pomodoro, mozzarella fior di latte, speck croccante, porcini e bufala", en: "Tomato, fior di latte mozzarella, crispy speck, porcini and buffalo mozzarella" }, a: "1, 7", p: "24.50" },
      { name: "Del Giò", d: { it: "Mozzarella fior di latte, mortadella, burrata e granella di pistacchio", en: "Fior di latte mozzarella, mortadella, burrata and pistachio grains" }, a: "1, 7, 8", p: "23.50" },
      { name: "La Tartara", d: { it: "Mozzarella fior di latte, tartara di manzo, tuorlo d'uovo e pomodorini", en: "Fior di latte mozzarella, beef tartare, egg yolk and cherry tomatoes" }, a: "1, 3, 7", p: "24.50" },
      { name: "La Brace", d: { it: "Fior di latte, punta di filetto spadellati, pomodorini, rucola e grana", en: "Fior di latte, pan-seared fillet tips, cherry tomatoes, rocket and grana" }, a: "1, 7", p: "28.50" },
      { name: "Wagyu", d: { it: "Mozzarella fior di latte, bresaola di wagyu, pomodorini, limone e grana 36 mesi", en: "Fior di latte mozzarella, wagyu bresaola, cherry tomatoes, lemon and 36-month grana" }, a: "1, 7", p: "32.50" }
    ]
  },
  {
    id: "calzoni",
    title: { it: "Calzoni e Focacce", en: "Calzones & Focaccias" },
    items: [
      { name: "Calzone Classico", d: { it: "Pomodoro, mozzarella fior di latte, prosciutto cotto", en: "Tomato, fior di latte mozzarella, cooked ham" }, a: "1, 7", p: "17.50" },
      { name: "Calzone Farcito", d: { it: "Pomodoro, mozzarella fior di latte, prosciutto cotto, funghi, uova", en: "Tomato, fior di latte mozzarella, cooked ham, mushrooms, eggs" }, a: "1, 3, 7", p: "19.50" },
      { name: "Calzone Diavolo", d: { it: "Pomodoro, mozzarella fior di latte, salamino piccante, scamorza", en: "Tomato, fior di latte mozzarella, spicy salami, scamorza" }, a: "1, 7", p: "18.50" },
      { name: "Calzone Vegetariano", d: { it: "Pomodoro, mozzarella fior di latte, verdure grigliate", en: "Tomato, fior di latte mozzarella, grilled vegetables" }, a: "1, 7", p: "18.50" },
      { name: "Focaccia Bianca", d: { it: "Olio extravergine di oliva, sale e aglio", en: "Extra virgin olive oil, salt and garlic" }, a: "1", p: "9.50" },
      { name: "Focaccia Aglio Olio e Rosmarino", d: { it: "Olio extravergine di oliva, sale, aglio e rosmarino", en: "Extra virgin olive oil, salt, garlic and rosemary" }, a: "1", p: "9.50" },
      { name: "Focaccia Crudo", d: { it: "Prosciutto crudo, rucola e scaglie di grana", en: "Raw ham, rocket and grana flakes" }, a: "1, 7", p: "18.50" },
      { name: "Focaccia Caprese", d: { it: "Mozzarella di bufala, pomodorini e basilico", en: "Buffalo mozzarella, cherry tomatoes and basil" }, a: "1, 7", p: "16.50" }
    ]
  },
  {
    id: "impasti",
    title: { it: "Impasti Speciali e Supplementi", en: "Special Doughs & Extras" },
    items: [
      { name: "Multi Cereali",
        d: { it: "Cereali 96% (farina di grano tenero tipo \"1\", farina di segale, farro, orzo, fiocchi di avena integrale, mais, riso), semi di sesamo, girasole, zucchero di canna. Può contenere soia, latte, senape, lupini.",
             en: "96% cereals (type \"1\" soft wheat flour, rye, spelt, barley, wholegrain oat flakes, corn, rice), sesame and sunflower seeds, cane sugar. May contain soy, milk, mustard, lupin." },
        a: "1, 11 — può contenere: 6, 7, 10, 14", p: "3.50" },
      { name: "Al Carbone",
        d: { it: "Impasto di farina tipo 0 al carbone vegetale", en: "Type 0 flour dough with vegetable charcoal" },
        a: "1", p: "3.50" },
      { name: "Gluten Free",
        d: { it: "Farina di riso, amido di tapioca e mais, fecola di patate e lievito di birra. Può contenere: 1",
             en: "Rice flour, tapioca and corn starch, potato starch and brewer's yeast. May contain: 1" },
        a: "", p: "5.50" },
      { name: "Mozzarella vegana", d: { it: "", en: "" }, a: "", p: "3.50" },
      { name: "Mozzarella senza lattosio", d: { it: "", en: "" }, a: "7", p: "2.50" },
      { name: "Supplementi classici",
        d: { it: "Acciughe, capperi, rucola, cipolla, carciofi, funghi, spinaci, radicchio, würstel, uova, doppia mozzarella, grana, mascarpone",
             en: "Anchovies, capers, rocket, onion, artichokes, mushrooms, spinach, radicchio, frankfurter, eggs, double mozzarella, grana, mascarpone" },
        a: "1, 3, 4, 7", p: "2.50" },
      { name: "Supplementi speciali",
        d: { it: "Verdure grigliate, friarielli, cherry, mozzarella di bufala, porcini",
             en: "Grilled vegetables, friarielli, cherry tomatoes, buffalo mozzarella, porcini" },
        a: "1, 2, 4, 7, 14", p: "4.50" },
      { name: "Supplementi pregiati",
        d: { it: "Crudo, carpaccio di manzo, bresaola, speck, mortadella, burrata",
             en: "Raw ham, beef carpaccio, bresaola, speck, mortadella, burrata" },
        a: "1, 7", p: "5.50" }
    ]
  },
  {
    id: "bambini",
    title: { it: "Menù Bambini", en: "Kids' Menu" },
    items: [
      { name: "Pennette al Pomodoro", d: { it: "", en: "" }, a: "1, 3", p: "9.50" },
      { name: "Petto Impanato e Patatine", d: { it: "", en: "" }, a: "1, 7", p: "12.50" },
      { name: "Hamburger di Manzo e Patatine", d: { it: "", en: "" }, a: "1, 3", p: "12.50" },
      { name: "Baby Pizza Margherita", d: { it: "Pomodoro San Marzano, mozzarella fior di latte, basilico fresco", en: "San Marzano tomato, fior di latte mozzarella, fresh basil" }, a: "1, 7", p: "12.–" },
      { name: "Patapizza", d: { it: "", en: "" }, a: "1, 3", p: "13.50" },
      { name: "Baby Pizza Würstel e Patatine", d: { it: "Pomodoro, patatine fritte, würstel", en: "Tomato, fries, frankfurter" }, a: "1, 7", p: "14.–" }
    ]
  },
  {
    id: "bevande",
    title: { it: "Bevande", en: "Drinks" },
    lead: { it: "Caffetteria, aperitivi, birre e distillati", en: "Coffee, aperitifs, beers and spirits" },
    items: [
      { name: "Caffè", d: { it: "", en: "" }, a: "", p: "2.50 / 4.50" },
      { name: "Tè caldo", d: { it: "", en: "" }, a: "", p: "3.30" },
      { name: "Gin Tonic", d: { it: "Gordon 12 · Gin Mare 14 · Bombay 14 · Roku 15 · Speciale 18", en: "Gordon 12 · Gin Mare 14 · Bombay 14 · Roku 15 · Special 18" }, a: "", p: "12 – 18" },
      { name: "Aperitivi analcolici", d: { it: "Analcolico bianco · Analcolico rosso · Crodino", en: "White alcohol-free · Red alcohol-free · Crodino" }, a: "", p: "5" },
      { name: "Campari soda", d: { it: "", en: "" }, a: "", p: "6" },
      { name: "Martini bianco", d: { it: "", en: "" }, a: "", p: "8" },
      { name: "Calice Prosecco", d: { it: "", en: "" }, a: "", p: "8" },
      { name: "Calice Franciacorta", d: { it: "", en: "" }, a: "", p: "10" },
      { name: "Vino al calice", d: { it: "", en: "" }, a: "", p: "8 / 10" },
      { name: "Spritz e Hugo", d: { it: "Aperol spritz · Campari spritz · Hugo", en: "Aperol spritz · Campari spritz · Hugo" }, a: "", p: "10" },
      { name: "Cocktail", d: { it: "", en: "" }, a: "", p: "12 / 15" },
      { name: "Birra alla spina Eichhof Lager", d: { it: "2 dl 4.– · 3 dl 4.50 · 5 dl 7.50", en: "2 dl 4.– · 3 dl 4.50 · 5 dl 7.50" }, a: "1", p: "4.– / 7.50" },
      { name: "Panaché alla spina", d: { it: "2 dl 4.– · 3 dl 4.50 · 5 dl 7.50", en: "2 dl 4.– · 3 dl 4.50 · 5 dl 7.50" }, a: "1", p: "4.– / 7.50" },
      { name: "Birre in bottiglia", d: { it: "Ichnusa Non Filtrata 33 cl 6 · Moretti Sale di Mare 33 cl 6 · Moretti 0,0 analcolica 33 cl 6 · IPA Lagunitas 35 cl 7 · Erdinger Weiss 33 cl 5.50 · Finsterer Hubertus 33 cl 5 · Heiteres Kloster 33 cl 5.50 · Legendäres Bügel 40 cl 7 · Ittinger Amber 33 cl 7",
             en: "Ichnusa Non Filtrata 33 cl 6 · Moretti Sale di Mare 33 cl 6 · Moretti 0.0 alcohol-free 33 cl 6 · IPA Lagunitas 35 cl 7 · Erdinger Weiss 33 cl 5.50 · Finsterer Hubertus 33 cl 5 · Heiteres Kloster 33 cl 5.50 · Legendäres Bügel 40 cl 7 · Ittinger Amber 33 cl 7" },
        a: "1", p: "5 – 7" },
      { name: "Bibite analcoliche", d: { it: "Coca cola 33 cl 4.50 / 5 dl 5.– / 2 dl 3.50 · Coca cola zero 33 cl 4.50 · Fanta 33 cl 4.50 · Gazzosa limone o mandarino 35 cl 4.50 · Rivella rossa 33 cl 4.50 · Tè pesca/limone 33 cl 4.50, 5 dl 5.–, 2 dl 3.50",
             en: "Coca cola 33 cl 4.50 / 5 dl 5.– / 2 dl 3.50 · Coca cola zero 33 cl 4.50 · Fanta 33 cl 4.50 · Lemon or mandarin gazzosa 35 cl 4.50 · Rivella rossa 33 cl 4.50 · Peach/lemon iced tea 33 cl 4.50, 5 dl 5.–, 2 dl 3.50" },
        a: "", p: "3.50 – 5" },
      { name: "Acqua Lurisia", d: { it: "Naturale o frizzante · 5 dl 4.– · 7.5 dl 6.50", en: "Still or sparkling · 5 dl 4.– · 7.5 dl 6.50" }, a: "", p: "4.– / 6.50" },
      { name: "Amari", d: { it: "Montenegro · Averna · Jägermeister · Braulio riserva · Ramazzotti · Amaro del Capo · Appenzeller · Cynar · Generoso · Di Saronno — 4 cl",
             en: "Montenegro · Averna · Jägermeister · Braulio riserva · Ramazzotti · Amaro del Capo · Appenzeller · Cynar · Generoso · Di Saronno — 4 cl" }, a: "", p: "6" },
      { name: "Distillati", d: { it: "Cointreau 4 cl 8 · Whiskey 4 cl 10/12 · Rum 4 cl 9 · Cognac 2 cl 10/12 · Grappa 2 cl 8/15 · Jefferson 2 cl 7 · Baileys 2 cl 6 · Limoncello, Nocino, Sambuca 2 cl 5",
             en: "Cointreau 4 cl 8 · Whiskey 4 cl 10/12 · Rum 4 cl 9 · Cognac 2 cl 10/12 · Grappa 2 cl 8/15 · Jefferson 2 cl 7 · Baileys 2 cl 6 · Limoncello, Nocino, Sambuca 2 cl 5" },
        a: "", p: "5 – 15" }
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
    { cut: "Charra ES", profile: { it: "Sapore delicato, leggermente dolce, carne morbida e fine", en: "Delicate, slightly sweet flavour, soft and fine meat" }, ideal: { it: "Una carne elegante, facile e non invasiva", en: "An elegant, easy and gentle cut" } },
    { cut: "Manzetta IR", profile: { it: "Dolcezza, consistenza molto tenera", en: "Sweetness, very tender texture" }, ideal: { it: "Massima tenerezza e gusto leggero", en: "Maximum tenderness and a light taste" } },
    { cut: "Sashi Prussiana", profile: { it: "Note particolari, carne tenera e succosa", en: "Distinctive notes, tender and juicy meat" }, ideal: { it: "Provare qualcosa di diverso dal solito, senza eccessi", en: "To try something different, without excess" } },
    { cut: "Black Angus CH", profile: { it: "Saporito, rotondo, con note di carne \"classica\" e leggermente nocciolata", en: "Savoury, round, with \"classic\" slightly nutty meat notes" }, ideal: { it: "Una carne equilibrata, tenera e saporita, perfetta per una bistecca classica", en: "A balanced, tender and savoury cut, perfect for a classic steak" } },
    { cut: "Black Angus USA", profile: { it: "Sapore intenso, succulento, con forte carattere e aroma", en: "Intense, succulent flavour, with strong character and aroma" }, ideal: { it: "Una carne con carattere deciso, in stile steakhouse o BBQ", en: "A bold cut, steakhouse or BBQ style" } },
    { cut: "Wagyu JP", profile: { it: "Dolce, burroso, molto intenso ed elegante", en: "Sweet, buttery, very intense and elegant" }, ideal: { it: "L'equilibrio perfetto tra gusto deciso e succosità", en: "The perfect balance of bold taste and juiciness" } },
    { cut: "Rubia Gallega ES", profile: { it: "Gusto unico e profondo, tenera con grasso che si scioglie", en: "Unique, deep flavour, tender with melting fat" }, ideal: { it: "Una carne intensa, matura, riconoscibile", en: "An intense, mature and recognisable cut" } },
    { cut: "Minhota", profile: { it: "Sapore delicato, pulito, leggermente dolce", en: "Delicate, clean, slightly sweet flavour" }, ideal: { it: "Una carne leggera, delicata e facile da gustare, senza eccesso di grasso", en: "A light, delicate and easy cut, without excess fat" } },
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
