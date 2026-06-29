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
  { id:'G17', glyph:'𓅱', phon:'w',  name_pt:'pintinho',          name_en:'quail chick',        tip:'O pintinho de codorna. Som W, como em "uva". Um dos sinais mais frequentes.' },
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

/* Biliterais da Lição 3 (30 sinais, incluindo unileteral usados como complemento). */
const BILITERALS_LESSON = [
  { id:'O1',  glyph:'𓉐', phon:'pr',  name_pt:'plano de casa',          name_en:'plan of house',    tip:'Plano de casa visto de cima. pr = "casa". Raiz de Faraó: pr-ꜥꜣ significa "grande casa".' },
  { id:'D2',  glyph:'𓁷', phon:'ḥr',  name_pt:'rosto',                  name_en:'face',             tip:'Rosto de frente. ḥr = "rosto" e também "sobre, em" (preposição muito usada).' },
  { id:'F4',  glyph:'𓂾', phon:'ḥꜣ',  name_pt:'parte dianteira de leão',name_en:'forepart of lion', tip:'Parte dianteira de leão. ḥꜣ = "trás, além de".' },
  { id:'D28', glyph:'𓆓', phon:'kꜣ',  name_pt:'dois braços levantados', name_en:'pair of arms',     tip:'Os dois braços levantados = ka, o duplo espiritual. Central na teologia egípcia.' },
  { id:'G25', glyph:'𓅐', phon:'ꜣḫ',  name_pt:'íbis com crista',        name_en:'crested ibis',     tip:'Íbis com crista = ꜣḫ, "espírito luminoso". Os mortos bem-sucedidos tornavam-se ꜣḫ.' },
  { id:'F34', glyph:'𓂗', phon:'jb',   name_pt:'coração',               name_en:'heart',            tip:'Coração. jb = "coração, desejo". Central em textos de sabedoria do Reino Médio.' },
  { id:'W24', glyph:'𓏌', phon:'nw',   name_pt:'vasos',                 name_en:'pots',             tip:'Vasos. nw = partícula antiga do plural.' },
  { id:'Aa11',glyph:'𓐛', phon:'mj',   name_pt:'sinal incerto',         name_en:'unknown sign',     tip:'Sinal de significado debatido. mj = "como, igual a" (partícula de comparação).' },
  { id:'R8',  glyph:'𓊽', phon:'nṯr',  name_pt:'estandarte / deus',     name_en:'god flag',         tip:'Estandarte = "deus" (nṯr). Um dos logogramas mais importantes em qualquer texto religioso.' },
  { id:'N37', glyph:'𓈙', phon:'šw',   name_pt:'lagoa de jardim',       name_en:'garden pool',      tip:'Lagoa de jardim. šw = nome do deus do ar.' },
  /* unileteral usados como complemento fonético */
  { id:'G1',  glyph:'𓄿', phon:'ꜣ',   name_pt:'abutre egípcio',        name_en:'Egyptian vulture', tip:'Unileteral ꜣ, muito frequente como complemento em palavras com esse som.' },
  { id:'M17', glyph:'𓇋', phon:'j',   name_pt:'junco',                  name_en:'reed',             tip:'Unileteral j/y. Complemento frequentíssimo no início e final de palavras.' },
  { id:'G17', glyph:'𓅓', phon:'m',   name_pt:'coruja',                 name_en:'owl',              tip:'Unileteral m. Muito usado como complemento em biliterais terminados em M.' },
  { id:'D21', glyph:'𓂋', phon:'r',   name_pt:'boca',                   name_en:'mouth',            tip:'Unileteral r, ubíquo como complemento de biliterais terminados em R.' },
  { id:'G43', glyph:'𓅱', phon:'w',   name_pt:'pintinho',               name_en:'quail chick',      tip:'Unileteral w, muito frequente como complemento.' },
  { id:'D36', glyph:'𓂝', phon:'ꜥ',  name_pt:'braço',                   name_en:'forearm',          tip:'Unileteral ꜥ, usado como complemento em muitos biliterais.' },
  { id:'D58', glyph:'𓃀', phon:'b',   name_pt:'pé',                     name_en:'foot',             tip:'Unileteral b, frequente como complemento.' },
  { id:'S29', glyph:'𓋴', phon:'s',   name_pt:'tecido dobrado',         name_en:'folded cloth',     tip:'Unileteral s, aparece muito como complemento.' },
  { id:'N35', glyph:'𓈖', phon:'n',   name_pt:'ondas de água',          name_en:'water ripple',     tip:'Unileteral n. A forma em ziguezague é inconfundível.' },
  { id:'Aa1', glyph:'𓐍', phon:'ḫ',  name_pt:'placenta',                name_en:'placenta',         tip:'Som KH gutural, como o CH alemão em "Bach". Muito comum como complemento em compostos.' },
  { id:'O34', glyph:'𓊃', phon:'z',   name_pt:'tranca',                 name_en:'bolt',             tip:'Unileteral z/s. Aparece em muitas palavras como complemento.' },
  { id:'V13', glyph:'𓍿', phon:'ṯ',  name_pt:'corda de amarrar',        name_en:'tethering rope',   tip:'Unileteral ṯ, comum em sufixos femininos e complementos.' },
  { id:'D46', glyph:'𓂧', phon:'d',   name_pt:'mão',                    name_en:'hand',             tip:'Unileteral d. Frequente como complemento de palavras terminadas em D.' },
  { id:'X1',  glyph:'𓏏', phon:'t',   name_pt:'pão achatado',           name_en:'bread loaf',       tip:'Unileteral t, marca o feminino em substantivos. Muito frequente.' },
  { id:'I9',  glyph:'𓆑', phon:'f',   name_pt:'víbora cornuda',         name_en:'horned viper',     tip:'Unileteral f, frequentíssimo como complemento.' },
  { id:'N29', glyph:'𓈎', phon:'q',   name_pt:'encosta',                name_en:'slope of hill',    tip:'Unileteral q. Aparece em palavras como qd (construir) e jqr (excelente).' },
  { id:'V31', glyph:'𓎡', phon:'k',   name_pt:'cesta com alça',         name_en:'basket with handle',tip:'Unileteral k. Muito frequente em sufixos de segunda pessoa.' },
  { id:'W11', glyph:'𓎼', phon:'g',   name_pt:'suporte de jarro',       name_en:'stand for jar',    tip:'Unileteral g. Aparece em gb (terra) e outras palavras fundamentais.' },
  { id:'Q3',  glyph:'𓊪', phon:'p',   name_pt:'banco',                  name_en:'stool',            tip:'Unileteral p. Aparece em pr (casa) e como complemento em muitos biliterais.' },
  { id:'F32', glyph:'𓄡', phon:'ẖ',  name_pt:'barriga de animal',       name_en:'belly of animal',  tip:'Barriga de animal. Outro som KH, ligeiramente mais palatal que ḫ.' },
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
