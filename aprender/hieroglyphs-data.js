/* Fonte única de dados dos hieróglifos.
 * Carregado por 02-unileteral.html, 03-biliteral.html e flashcards.html.
 * name_pt → usado nas páginas de lição (PT)
 * name_en → usado nos flashcards (nome Gardiner em inglês)
 * tip      → dica mnemônica em português
 */

const UNILITERALS = [
  { id:'G1',  glyph:'𓄿', phon:'ꜣ', name_pt:'abutre egípcio',    name_en:'Egyptian vulture',   tip:'O abutre egípcio. Som gutural, como um a aspirado. Aparece muito em palavras divinas.' },
  { id:'M17', glyph:'𓇋', phon:'j',  name_pt:'junco',             name_en:'reed',               tip:'Um junco/cana. Equivale ao nosso Y ou I. Muito comum no início de palavras.' },
  { id:'M17', glyph:'𓇌', phon:'y',  name_pt:'dois juncos',       name_en:'double reed',        tip:'Dois juncos, que reforçam o som Y. Aparece especialmente em sufixos e formas femininas.' },
  { id:'D36', glyph:'𓂝', phon:'ꜥ',  name_pt:'braço',             name_en:'forearm',            tip:'O braço com mão aberta. Som faríngeo sem equivalente em português. Imagine um "a" profundo na garganta.' },
  { id:'G43', glyph:'𓅱', phon:'w',  name_pt:'pintinho de codorna',name_en:'quail chick',        tip:'O pintinho de codorna. Som W, como em "uva". Um dos sinais mais frequentes do egípcio.' },
  { id:'D58', glyph:'𓃀', phon:'b',  name_pt:'pé',                name_en:'foot',               tip:'Um pé. O som B. Note que o sinal é um pé visto de lado.' },
  { id:'Q3',  glyph:'𓊪', phon:'p',  name_pt:'banco',             name_en:'stool',              tip:'Um banco visto de cima. O som P.' },
  { id:'I9',  glyph:'𓆑', phon:'f',  name_pt:'víbora cornuda',    name_en:'horned viper',       tip:'A víbora cornuda. O som F. Cuidado para não confundir com outras cobras.' },
  { id:'G17', glyph:'𓅓', phon:'m',  name_pt:'coruja',            name_en:'owl',                tip:'A coruja. O som M. Um dos sinais mais reconhecíveis: sempre olha para frente.' },
  { id:'N35', glyph:'𓈖', phon:'n',  name_pt:'ondas de água',     name_en:'water ripple',       tip:'Ondas de água. O som N. A forma em ziguezague é inconfundível.' },
  { id:'D21', glyph:'𓂋', phon:'r',  name_pt:'boca',              name_en:'mouth',              tip:'Uma boca vista de frente. O som R. Extremamente comum em gramática e sufixos.' },
  { id:'O4',  glyph:'𓉔', phon:'h',  name_pt:'abrigo de juncos',  name_en:'reed shelter',       tip:'Um abrigo de juncos. O H simples, como em "há".' },
  { id:'V28', glyph:'𓎛', phon:'ḥ',  name_pt:'pavio de linho',    name_en:'twisted flax wick',  tip:'Um pavio de linho torcido. H aspirado mais forte, pronuncie com mais ar.' },
  { id:'Aa1', glyph:'𓐍', phon:'ḫ',  name_pt:'placenta',          name_en:'placenta',           tip:'A placenta (interpretação incerta). Som KH gutural, como o CH alemão em "Bach".' },
  { id:'F32', glyph:'𓄡', phon:'ẖ',  name_pt:'barriga de animal', name_en:'belly of animal',    tip:'Barriga de animal. Outro som KH, ligeiramente mais palatal.' },
  { id:'O34', glyph:'𓊃', phon:'z',  name_pt:'tranca',            name_en:'bolt',               tip:'Uma tranca de porta. O som Z (ou S em alguns contextos).' },
  { id:'S29', glyph:'𓋴', phon:'s',  name_pt:'tecido dobrado',    name_en:'folded cloth',       tip:'Um tecido dobrado. O som S. Muito comum, aparece em centenas de palavras.' },
  { id:'N37', glyph:'𓈙', phon:'š',  name_pt:'lago de jardim',    name_en:'garden pool',        tip:'Um lago visto de cima. O som SH, como em "show".' },
  { id:'N29', glyph:'𓈎', phon:'q',  name_pt:'encosta',           name_en:'slope of hill',      tip:'Uma encosta de colina. Som Q gutural, mais fundo que o K.' },
  { id:'V31', glyph:'𓎡', phon:'k',  name_pt:'cesta com alça',    name_en:'basket with handle', tip:'Uma cesta com alça. O som K comum.' },
  { id:'W11', glyph:'𓎼', phon:'g',  name_pt:'suporte de jarro',  name_en:'stand for jar',      tip:'Um suporte para jarro. O som G, como em "gato".' },
  { id:'X1',  glyph:'𓏏', phon:'t',  name_pt:'pão achatado',      name_en:'bread loaf',         tip:'Um pão achatado. O som T. Este sinal também marca o feminino em substantivos.' },
  { id:'V13', glyph:'𓍿', phon:'ṯ',  name_pt:'corda',             name_en:'tethering rope',     tip:'Uma corda de amarrar. Som TJ palatal, como o CH italiano em "ciao".' },
  { id:'D46', glyph:'𓂧', phon:'d',  name_pt:'mão',               name_en:'hand',               tip:'Uma mão. O som D.' },
  { id:'I10', glyph:'𓌀', phon:'ḏ',  name_pt:'cobra com capuz',   name_en:'cobra',              tip:'Uma cobra com capuz. Som DJ, como em "djinn". Par palatal do D.' },
];

/* Biliterais da Lição 3 (20 sinais com dica mnemônica em português). */
const BILITERALS_LESSON = [
  { id:'O1',  glyph:'𓉐', phon:'pr',  name_pt:'planta de casa',          name_en:'plan of house',    tip:'pr = "casa". Raiz de per-aa (pr-ꜥꜣ), "grande casa" = Faraó. Frequente em topônimos como Per-Ramsés.' },
  { id:'D2',  glyph:'𓁷', phon:'ḥr',  name_pt:'rosto',                  name_en:'face',             tip:'ḥr = "rosto" e preposição "sobre, em". Aparece também no nome do deus Hórus (ḥrw).' },
  { id:'F4',  glyph:'𓄂', phon:'ḥꜣ',  name_pt:'parte dianteira de leão',name_en:'forepart of lion', tip:'ḥꜣ = "atrás, além de". Preposição espacial frequente em textos funerários e geográficos.' },
  { id:'D28', glyph:'𓂓', phon:'kꜣ',  name_pt:'dois braços erguidos',   name_en:'pair of arms',     tip:'kꜣ = "ka", o duplo espiritual de cada pessoa. Central na teologia egípcia e nos ritos funerários.' },
  { id:'G25', glyph:'𓅜', phon:'ꜣḫ',  name_pt:'íbis com crista',        name_en:'crested ibis',     tip:'ꜣḫ = "espírito luminoso". Os mortos bem-sucedidos tornavam-se ꜣḫ e habitavam o campo estelar.' },
  { id:'F34', glyph:'𓄣', phon:'ib',  name_pt:'coração',                name_en:'heart',            tip:'ib = "coração, vontade". Para os egípcios, o coração era a sede da inteligência e da memória.' },
  { id:'W24', glyph:'𓏌', phon:'nw',  name_pt:'vasos',                  name_en:'pots',             tip:'nw = partícula plural do Reino Antigo. Aparece em Nun/Nunu (nwn), o oceano primordial da criação.' },
  { id:'G19', glyph:'𓅕', phon:'mi',  name_pt:'coruja com antebraço',   name_en:'owl with arm',     tip:'mi = "como, igual a" (partícula de comparação). Frequente em expressões poéticas e laudatórias.' },
  { id:'V30', glyph:'𓎟', phon:'nb',  name_pt:'cesto',                  name_en:'basket',           tip:'nb = "senhor, todo, cada". Extremamente frequente: nb-tꜣwy = "Senhor das Duas Terras" = Faraó.' },
  { id:'G36', glyph:'𓅨', phon:'wr',  name_pt:'andorinha',              name_en:'swallow',          tip:'wr = "grande". Aparece em epítetos divinos (wr-nṯr, "o grande deus") e títulos nobiliárquicos.' },
  { id:'R8',  glyph:'𓊹', phon:'nṯr', name_pt:'tecido sobre mastro',    name_en:'god flag',         tip:'nṯr = "deus". Trileteral usado como logograma. Aparece em quase todo texto religioso egípcio.' },
  { id:'R11', glyph:'𓊽', phon:'ḏd',  name_pt:'coluna djed',            name_en:'djed pillar',      tip:'ḏd = "dizer" (verbo) e "estabilidade" (logograma). A coluna djed é símbolo de Osíris.' },
  { id:'N41', glyph:'𓈞', phon:'ḥm',  name_pt:'poço com ondas',         name_en:'well with ripples',tip:'ḥm = "servo" e "Majestade" em contexto real. ḥm-nṯr = "servo do deus" = sacerdote.' },
  { id:'D1',  glyph:'𓁶', phon:'tp',  name_pt:'cabeça',                 name_en:'head',             tip:'tp = "cabeça, topo, sobre". Funciona tanto como substantivo quanto como preposição.' },
  { id:'N16', glyph:'𓇾', phon:'tꜣ',  name_pt:'terra com grãos',        name_en:'flat land',        tip:'tꜣ = "terra, país, solo". Aparece em nb-tꜣwy e expressões geográficas fundamentais.' },
  { id:'G39', glyph:'𓅭', phon:'sꜣ',  name_pt:'pato',                   name_en:'duck',             tip:'sꜣ = "filho", "proteção" e "costas". Muito frequente em linhagens reais e títulos.' },
  { id:'S34', glyph:'𓋹', phon:'ꜥnḫ', name_pt:'ânkh',                   name_en:'ankh',             tip:'ꜥnḫ = "vida". O ankh é apresentado pelos deuses aos faraós como dom da vida eterna.' },
  { id:'N18', glyph:'𓈀', phon:'iw',  name_pt:'ilha',                   name_en:'island',           tip:'iw = "ilha". Também funciona como conectivo verbal frequentíssimo no início de orações.' },
  { id:'N36', glyph:'𓈘', phon:'mr',  name_pt:'canal',                  name_en:'canal',            tip:'mr = "canal" e verbo "amar, querer". Muito frequente em textos do Reino Médio.' },
  { id:'G38', glyph:'𓅬', phon:'gb',  name_pt:'ganso',                  name_en:'goose',            tip:'gb = nome do deus Geb, senhor da terra. O ganso era o animal sagrado de Geb nos textos cosmológicos.' },
];

/* Biliterais dos flashcards (15 sinais curados para prática rápida). */
const BILITERALS_FLASH = [
  { id:'D28', glyph:'𓐝', phon:'kꜣ',  name_pt:'par de braços',         name_en:'pair of arms' },
  { id:'F34', glyph:'𓄤', phon:'nfr',  name_pt:'coração com traqueia', name_en:'heart with trachea' },
  { id:'N5',  glyph:'𓇳', phon:'rꜥ',  name_pt:'disco solar',           name_en:'sun disc' },
  { id:'S34', glyph:'𓋹', phon:'ꜥnḫ', name_pt:'ankh',                  name_en:'ankh' },
  { id:'G25', glyph:'𓅐', phon:'ꜣḫ',  name_pt:'íbis com crista',       name_en:'crested ibis' },
  { id:'M22', glyph:'𓇷', phon:'wn',   name_pt:'junco',                 name_en:'rush' },
  { id:'D4',  glyph:'𓁹', phon:'jr',   name_pt:'olho',                  name_en:'eye' },
  { id:'G43', glyph:'𓅱', phon:'wꜣ',  name_pt:'pintinho (bil)',         name_en:'quail chick (bil)' },
  { id:'N36', glyph:'𓈗', phon:'mr',   name_pt:'canal',                 name_en:'canal' },
  { id:'F35', glyph:'𓄥', phon:'ms',   name_pt:'três peles de raposa',  name_en:'three fox skins' },
  { id:'D54', glyph:'𓇼', phon:'jw',   name_pt:'pernas caminhando',     name_en:'walking legs' },
  { id:'O29', glyph:'𓋴𓄿',phon:'sꜣ', name_pt:'tecido + abutre',       name_en:'folded cloth + vulture' },
  { id:'G1',  glyph:'𓄿𓏏',phon:'ꜣt', name_pt:'abutre + pão',          name_en:'vulture + bread' },
  { id:'N18', glyph:'𓏇', phon:'jw',   name_pt:'ilha',                  name_en:'island' },
  { id:'V4',  glyph:'𓌀', phon:'wꜥ',  name_pt:'laço',                  name_en:'lasso' },
];
