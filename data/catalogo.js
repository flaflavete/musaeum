// =============================================================
// Catálogo central das histórias do Musæum
// =============================================================
// Fonte única de verdade para a biblioteca (index.html), a Coleção,
// o Certificado e as próprias histórias. Cada entrada reúne:
//
//   storyId     id usado no save unificado (musaeum-stories)
//   href        página da experiência interativa
//   available   true = publicada (card aberto, conta para o certificado)
//   cardGlyph   hieróglifo do card na biblioteca
//   titlePt/En  título bilíngue
//   descPt/En   descrição curta do card
//   items       tesouros colecionáveis (8, um por capítulo)
//   codex       os 9 hieróglifos do Códex da história
//
// Para PUBLICAR uma história: mude available para true. Só isso.
// Cards, Coleção, Certificado e desbloqueio passam a incluí-la.
//
// Para CRIAR uma história nova: adicione uma entrada aqui com items
// e codex, crie data/<historia>.js (textos e desafios) e o HTML.

const MUSAEUM_CATALOG = [
  {
    storyId: 'naufrago',
    href: 'naufrago.html',
    available: true,
    cardGlyph: '𓊛',
    titlePt: 'O Conto do Náufrago',
    titleEn: 'The Shipwrecked Sailor',
    descPt: 'Uma jornada de sobrevivência, criaturas míticas e a importância da fala eficaz.',
    descEn: 'A journey of survival, mythical creatures, and the importance of effective speech.',
    items: [
      { pt: 'Uvas', en: 'Grapes', icon: '🍇' },
      { pt: 'Vinho', en: 'Wine', icon: '🍷' },
      { pt: 'Incenso', en: 'Incense', icon: '💨' },
      { pt: 'Mirra', en: 'Myrrh', icon: '🏺' },
      { pt: 'Óleo', en: 'Oil', icon: '🪔' },
      { pt: 'Marfim', en: 'Ivory', icon: '🦷' },
      { pt: 'Macaco', en: 'Monkey', icon: '🐒' },
      { pt: 'Cão', en: 'Dog', icon: '🐕' }
    ],
    codex: [
      {
        glyph: '𓋹', translit: 'ꜥnḫ', chapter: -1,
        namePt: 'Ankh', nameEn: 'Ankh',
        meaningPt: 'Logograma: ꜥnḫ, "vida"<br>Fonograma: trilítero ꜥnḫ',
        meaningEn: 'Logogram: ꜥnḫ, "life"<br>Phonogram: triliteral ꜥnḫ',
        typeKey: 'type-tri',
        notePt: 'Representa provavelmente uma sandália ritual amarrada no tornozelo, segundo a hipótese mais aceita por Alan Gardiner. Quando deuses seguram o ankh diante da boca de um faraó, transmitem-lhe a vida divina. É talvez o signo egípcio mais reconhecível e atravessou milênios como amuleto.',
        noteEn: 'Likely representing a ceremonial sandal tied at the ankle, according to Alan Gardiner\'s accepted hypothesis. When gods hold the ankh before a pharaoh\'s mouth, they transmit divine life. Perhaps the most recognizable Egyptian sign, it crossed millennia as an amulet.'
      },
      {
        glyph: '𓂀', translit: 'wḏꜣt', chapter: 0,
        namePt: 'Olho de Hórus (wedjat)', nameEn: 'Eye of Horus (wedjat)',
        meaningPt: 'Logograma: wḏꜣt, "o (olho) íntegro"',
        meaningEn: 'Logogram: wḏꜣt, "the whole (eye)"',
        typeKey: 'type-logogram',
        notePt: 'Segundo o mito, o olho de Hórus foi ferido por Seth e restaurado por Tot. Por isso significa restituição e integridade, e foi um dos amuletos mais populares do Egito.',
        noteEn: 'In the myth, Horus\'s eye was wounded by Seth and restored by Thoth. Hence it signifies restoration and wholeness, and it was one of the most popular amulets in Egypt.'
      },
      {
        glyph: '𓇳', translit: 'rꜥ', chapter: 1,
        namePt: 'Sol, deus Rá', nameEn: 'Sun, god Ra',
        meaningPt: 'Logograma: rꜥ, "sol", e o nome do deus Rá<br>Determinativo: tempo e luz',
        meaningEn: 'Logogram: rꜥ, "sun", and the god Ra<br>Determinative: time and light',
        typeKey: 'type-logogram',
        notePt: 'Um círculo com ponto no centro. Serve como logograma para "sol" e "Rá", e como determinativo em palavras ligadas ao tempo e à luz. O deus Rá era o sol do meio-dia; Khepri era o sol nascente e Atum, o poente.',
        noteEn: 'A circle with a dot at its center. It works as a logogram for "sun" and "Ra", and as a determinative in words tied to time and light. The god Ra was the midday sun; Khepri was the rising sun and Atum the setting one.'
      },
      {
        glyph: '𓈗', translit: 'mw', chapter: 2,
        namePt: 'Águas', nameEn: 'Waters',
        meaningPt: 'Ideograma: mw, "água"<br>Determinativo: líquidos, rios e travessias',
        meaningEn: 'Ideogram: mw, "water"<br>Determinative: liquids, rivers, crossings',
        typeKey: 'type-ideo',
        notePt: 'Três linhas onduladas representando ondulações da água. Pode aparecer como ideograma (a palavra "água") ou como determinativo de palavras ligadas a rios, líquidos e travessias. O Nilo e o "Grande Verde" (o Mediterrâneo) eram escritos com este signo.',
        noteEn: 'Three wavy lines representing rippling water. It can appear as an ideogram (the word "water") or as a determinative for words tied to rivers, liquids, and crossings. The Nile and the "Great Green" (the Mediterranean) were written with this sign.'
      },
      {
        glyph: '𓄣', translit: 'ỉb', chapter: 3,
        namePt: 'Coração', nameEn: 'Heart',
        meaningPt: 'Logograma: ỉb, "coração", "mente", "desejo"',
        meaningEn: 'Logogram: ỉb, "heart", "mind", "wish"',
        typeKey: 'type-logogram',
        notePt: 'Para os egípcios, o coração era a sede do pensamento, da memória e da personalidade, não o cérebro, que era descartado durante a mumificação. No julgamento de Osíris, o coração do morto era pesado contra a pena de Maat.',
        noteEn: 'For Egyptians, the heart was the seat of thought, memory and personality, not the brain, which was discarded during mummification. In Osiris\'s judgment, the dead one\'s heart was weighed against Maat\'s feather.'
      },
      {
        glyph: '𓆙', translit: 'ḥfꜣw', chapter: 4,
        namePt: 'Serpente', nameEn: 'Serpent',
        meaningPt: 'Determinativo: serpentes e répteis, na grafia de ḥfꜣw, "serpente"',
        meaningEn: 'Determinative: snakes and reptiles, in the spelling of ḥfꜣw, "serpent"',
        typeKey: 'type-determin',
        notePt: 'A serpente aparece em muitos signos egípcios, como determinativo de répteis e também em nomes de divindades protetoras, como a uraeus (a cobra na testa do faraó). No Conto do Náufrago, a serpente da ilha é uma entidade divina chamada de "Príncipe de Punt".',
        noteEn: 'The serpent appears in many Egyptian signs, as a determinative of reptiles and also in names of protective deities, like the uraeus (the cobra on the pharaoh\'s forehead). In the Shipwrecked Sailor, the island serpent is a divine being called "Prince of Punt".'
      },
      {
        glyph: '𓏞', translit: 'sš', chapter: 5,
        namePt: 'Kit do escriba', nameEn: 'Scribe\'s kit',
        meaningPt: 'Logograma: sš, "escriba", "escrever"',
        meaningEn: 'Logogram: sš, "scribe", "to write"',
        typeKey: 'type-logogram',
        notePt: 'Representa o estojo do escriba: a paleta com duas cavidades para tintas (preta e vermelha), o saquinho de pigmento em pó e os pincéis de junco. Ser escriba no Egito era uma das profissões mais prestigiosas. "Sê escriba, livra-te do trabalho duro", dizia um texto sapiencial.',
        noteEn: 'Depicts the scribe\'s kit: the palette with two cavities for ink (black and red), the small bag of pigment powder, and the reed brushes. Being a scribe in Egypt was among the most prestigious professions. "Be a scribe, free yourself from hard labor", said a wisdom text.'
      },
      {
        glyph: '𓊛', translit: 'dpt', chapter: 6,
        namePt: 'Barco, embarcação', nameEn: 'Boat, vessel',
        meaningPt: 'Logograma: dpt, "barco"<br>Determinativo: embarcações e navegação',
        meaningEn: 'Logogram: dpt, "boat"<br>Determinative: vessels and sailing',
        typeKey: 'type-logogram',
        notePt: 'O signo do barco é central na cultura egípcia. O Nilo era o eixo vital do país e o sol atravessava o céu em sua barca diária. Navios reais sepultados ao lado de pirâmides, como o de Quéops, mostram a importância religiosa do transporte fluvial.',
        noteEn: 'The boat sign is central in Egyptian culture. The Nile was the country\'s lifeline, and the sun crossed the sky in its daily bark. Royal ships buried beside pyramids, like Khufu\'s, show the religious weight of river travel.'
      },
      {
        glyph: '𓉐', translit: 'pr', chapter: 7,
        namePt: 'Casa', nameEn: 'House',
        meaningPt: 'Logograma: pr, "casa"<br>Fonograma: bilítero pr, como em prj, "sair"',
        meaningEn: 'Logogram: pr, "house"<br>Phonogram: biliteral pr, as in prj, "to go out"',
        typeKey: 'type-bi',
        notePt: 'A planta baixa de uma casa vista de cima. Como bilítero <i>pr</i>, forma palavras como <i>pr-ꜥnḫ</i> ("casa da vida", biblioteca de templo), <i>pr-ꜥꜣ</i> ("casa grande", donde vem a palavra "faraó") e <i>pr-ḥḏ</i> ("casa branca", o tesouro real).',
        noteEn: 'The floor plan of a house seen from above. As biliteral <i>pr</i>, it forms words like <i>pr-ꜥnḫ</i> ("house of life", temple library), <i>pr-ꜥꜣ</i> ("great house", source of the word "pharaoh") and <i>pr-ḥḏ</i> ("white house", the royal treasury).'
      }
    ]
  },

  {
    storyId: 'sinuhe',
    href: 'sinuhe.html',
    available: true,
    cardGlyph: '𓂻',
    titlePt: 'A História de Sinué',
    titleEn: 'The Story of Sinuhe',
    descPt: 'O exílio e o retorno. O épico máximo da literatura do Reino Médio.',
    descEn: 'Exile and return. The supreme epic of Middle Kingdom literature.',
    items: [
      { pt: 'Coroa', en: 'Crown', icon: '👑' },
      { pt: 'Falcão', en: 'Falcon', icon: '🦅' },
      { pt: 'Camelo', en: 'Camel', icon: '🐪' },
      { pt: 'Mel', en: 'Honey', icon: '🍯' },
      { pt: 'Arco', en: 'Bow', icon: '🏹' },
      { pt: 'Escaravelho', en: 'Scarab', icon: '🪲' },
      { pt: 'Rolo Real', en: 'Royal Scroll', icon: '📜' },
      { pt: 'Pena de Maat', en: 'Feather of Maat', icon: '🪶' }
    ],
    codex: [
      {
        glyph: '𓆣', translit: 'ḫpr', chapter: -1,
        namePt: 'Escaravelho de Khepri', nameEn: 'Khepri Scarab',
        meaningPt: 'Logograma: ḫpr, "tornar-se", "vir a ser"<br>Fonograma: trilítero ḫpr',
        meaningEn: 'Logogram: ḫpr, "to become", "to come into being"<br>Phonogram: triliteral ḫpr',
        typeKey: 'type-tri',
        notePt: 'O escaravelho Khepri empurra o sol nascente no horizonte, como o besouro empurra sua bola no chão. Seu nome deriva de <i>ḫpr</i>, "tornar-se". Como trilítero, o signo soa dentro de Kheper-ka-Rā, o nome de coroação de Sesostris I. Nesta história, a transformação é a de Sinué: de servo do palácio a exilado, a chefe tribal, a egípcio reintegrado.',
        noteEn: 'The Khepri beetle pushes the rising sun across the horizon, as the dung beetle pushes its ball along the ground. Its name derives from <i>ḫpr</i>, "to become". As a triliteral, the sign sounds inside Kheper-ka-Ra, the coronation name of Sesostris I. In this story, the transformation is Sinuhe\'s: from palace servant to exile, tribal chief, and reintegrated Egyptian.'
      },
      {
        glyph: '𓂋', translit: 'r', chapter: 0,
        namePt: 'Boca', nameEn: 'Mouth',
        meaningPt: 'Logograma: rꜣ, "boca", "fala"<br>Fonograma: unilítero r',
        meaningEn: 'Logogram: rꜣ, "mouth", "speech"<br>Phonogram: uniliteral r',
        typeKey: 'type-uni',
        notePt: 'Representa a boca humana vista de lado. Funciona como logograma de <i>rꜣ</i>, "boca", e como unilitero <i>r</i>, um dos signos mais frequentes da escrita; aparece, por exemplo, na grafia do nome do deus-sol <i>Rꜥ</i>. No capítulo, é pela boca dos mensageiros que a notícia da morte do rei se espalha.',
        noteEn: 'Depicts the human mouth seen from the side. It works as the logogram of <i>rꜣ</i>, "mouth", and as the uniliteral <i>r</i>, one of the most frequent signs in the script; it appears, for instance, in the spelling of the sun god\'s name <i>Rꜥ</i>. In the chapter, it is through the messengers\' mouths that the news of the king\'s death spreads.'
      },
      {
        glyph: '𓄔', translit: 'sḏm', chapter: 1,
        namePt: 'Orelha bovina', nameEn: 'Bovine ear',
        meaningPt: 'Ideograma: sḏm, "ouvir", também "obedecer"<br>Fonograma: jdn, como em jdnw, "substituto"',
        meaningEn: 'Ideogram: sḏm, "to hear", also "to obey"<br>Phonogram: jdn, as in jdnw, "deputy"',
        typeKey: 'type-ideo',
        notePt: 'A orelha de boi é ideograma e determinativo do verbo <i>sḏm</i>, "ouvir", que também significa "obedecer" (quem ouve, atende). É o verbo-modelo das gramáticas de egípcio médio, usado para nomear as formas verbais (<i>sḏm=f</i>). No capítulo, é uma audição acidental que muda o destino de Sinué: ele ouve o que não devia.',
        noteEn: 'The ox ear is the ideogram and determinative of the verb <i>sḏm</i>, "to hear", which also means "to obey" (who hears, heeds). It is the model verb of Middle Egyptian grammars, used to name the verb forms (<i>sḏm=f</i>). In the chapter, an accidental act of hearing changes Sinuhe\'s fate: he hears what he should not.'
      },
      {
        glyph: '𓈉', translit: 'xꜣst', chapter: 2,
        namePt: 'Terra estrangeira', nameEn: 'Foreign land',
        meaningPt: 'Logograma e determinativo: xꜣst, "terra estrangeira", "deserto"',
        meaningEn: 'Logogram and determinative: xꜣst, "foreign land", "desert"',
        typeKey: 'type-determin',
        notePt: 'O signo representa colinas rochosas com vales, evocando o terreno acidentado das terras além do Nilo. É o determinativo padrão de topônimos estrangeiros como <i>Rtnw</i> (Retjenu). Na ideologia egípcia, as terras estrangeiras eram associadas à desordem, em contraste com o Egito regido por <span class="gloss" data-gloss="maat">Maat</span>.',
        noteEn: 'The sign depicts rocky hills with valleys, evoking the rough terrain beyond the Nile. It is the standard determinative for foreign place names like <i>Rtnw</i> (Retjenu). In Egyptian ideology, foreign lands were associated with disorder, in contrast with Egypt governed by <span class="gloss" data-gloss="maat">Maat</span>.'
      },
      {
        glyph: '𓃒', translit: 'kꜣ', chapter: 3,
        namePt: 'Touro', nameEn: 'Bull',
        meaningPt: 'Logograma: kꜣ, "touro", "boi"',
        meaningEn: 'Logogram: kꜣ, "bull", "ox"',
        typeKey: 'type-logogram',
        notePt: 'O signo <i>kꜣ</i> (touro) é homófono de <i>kꜣ</i> (a força vital, o duplo espiritual). Na iconografia real o touro é imagem de poder desde a Paleta de Narmer, e "Touro Poderoso" (<i>kꜣ nḫt</i>) tornou-se epíteto de faraós no Reino Novo. Em Iaa, Sinué recebe gado sem limite.',
        noteEn: 'The sign <i>kꜣ</i> (bull) is a homophone of <i>kꜣ</i> (the vital force, the spiritual double). In royal iconography the bull is an image of power since the Narmer Palette, and "Mighty Bull" (<i>kꜣ nḫt</i>) became a pharaonic epithet in the New Kingdom. In Yaa, Sinuhe receives cattle without limit.'
      },
      {
        glyph: '𓃭', translit: 'rw', chapter: 4,
        namePt: 'Leão', nameEn: 'Lion',
        meaningPt: 'Logograma: rw, "leão"<br>Fonograma: bilítero rw',
        meaningEn: 'Logogram: rw, "lion"<br>Phonogram: biliteral rw',
        typeKey: 'type-bi',
        notePt: 'O leão deitado é o bilítero <i>rw</i>, usado na grafia da própria palavra <i>rw</i>, "leão". No período ptolomaico, serviu para o som "l" em nomes como Ptolomeu e Cleópatra, nos cartuchos que guiaram Champollion. Na imagética real, textos descrevem o faraó como leão em batalha, e a esfinge combina corpo de leão e cabeça humana. No duelo, Sinué vence o campeão de Retjenu com flecha e machado.',
        noteEn: 'The recumbent lion is the biliteral <i>rw</i>, used in the spelling of the word <i>rw</i>, "lion", itself. In the Ptolemaic period it served for the sound "l" in names such as Ptolemy and Cleopatra, in the cartouches that guided Champollion. In royal imagery, texts describe the pharaoh as a lion in battle, and the sphinx combines a lion body with a human head. In the duel, Sinuhe defeats the champion of Retjenu with arrow and axe.'
      },
      {
        glyph: '𓇹', translit: 'jꜥḥ', chapter: 5,
        namePt: 'Lua crescente', nameEn: 'Crescent moon',
        meaningPt: 'Logograma: jꜥḥ, "lua"<br>Determinativo: tempo e datas, como em ꜣbd, "mês"',
        meaningEn: 'Logogram: jꜥḥ, "moon"<br>Determinative: time and dates, as in ꜣbd, "month"',
        typeKey: 'type-logogram',
        notePt: 'A lua crescente é logograma de <i>jꜥḥ</i>, "lua", e aparece na grafia de palavras ligadas ao tempo, como <i>ꜣbd</i>, "mês": era pela lua que os egípcios contavam os meses do calendário. Para Sinué envelhecido em Iaa, o que pesa no coração é o medo de morrer sob um céu estrangeiro, sem o ritual egípcio que permite à alma enfrentar o julgamento de Osíris.',
        noteEn: 'The crescent moon is the logogram of <i>jꜥḥ</i>, "moon", and appears in the spelling of words tied to time, such as <i>ꜣbd</i>, "month": it was by the moon that the Egyptians counted the months of the calendar. For the aging Sinuhe in Yaa, what weighs on the heart is the fear of dying under a foreign sky, without the Egyptian ritual that allows the soul to face Osiris\'s judgment.'
      },
      {
        glyph: '𓆸', translit: 'sšn', chapter: 6,
        namePt: 'Flor de lótus', nameEn: 'Lotus flower',
        meaningPt: 'Logograma: sšn, "lótus"',
        meaningEn: 'Logogram: sšn, "lotus"',
        typeKey: 'type-logogram',
        notePt: 'O lótus azul do Nilo abre suas pétalas ao amanhecer e fecha ao entardecer, e por isso foi associado ao ciclo da criação e do renascimento solar: na arte egípcia, o deus-sol criança emerge de uma flor de lótus, e o deus Nefertem traz a flor sobre a cabeça. No capítulo, é a carta do rei que oferece a Sinué a chance de renascer no Egito.',
        noteEn: 'The blue Nile lotus opens its petals at dawn and closes at dusk, and was therefore associated with the cycle of creation and solar rebirth: in Egyptian art, the child sun god emerges from a lotus flower, and the god Nefertem bears the flower on his head. In the chapter, it is the king\'s letter that offers Sinuhe the chance of rebirth in Egypt.'
      },
      {
        glyph: '𓇼', translit: 'sbꜣ', chapter: 7,
        namePt: 'Estrela', nameEn: 'Star',
        meaningPt: 'Logograma: sbꜣ, "estrela"<br>Fonograma: sbꜣ, como em sbꜣyt, "ensinamento", e dwꜣ, "adorar"',
        meaningEn: 'Logogram: sbꜣ, "star"<br>Phonogram: sbꜣ, as in sbꜣyt, "teaching", and dwꜣ, "to adore"',
        typeKey: 'type-logogram',
        notePt: 'A estrela de cinco pontas é o logograma de <i>sbꜣ</i>, "estrela", e aparece na grafia de <i>dwꜣ</i>, "adorar" e "manhã". Nos Textos das Pirâmides, o rei morto une-se às "estrelas imperecíveis" do céu setentrional. No fim da história, Sinué recebe uma pirâmide, monumento ligado a esse destino celeste dos reis.',
        noteEn: 'The five-pointed star is the logogram of <i>sbꜣ</i>, "star", and appears in the spelling of <i>dwꜣ</i>, "to adore" and "morning". In the Pyramid Texts, the dead king joins the "imperishable stars" of the northern sky. At the end of the story, Sinuhe receives a pyramid, a monument tied to this celestial destiny of kings.'
      }
    ]
  },

  {
    storyId: 'campones',
    href: null,
    available: false,
    cardGlyph: '𓃾',
    titlePt: 'Camponês Eloquente',
    titleEn: 'The Eloquent Peasant',
    descPt: 'O poder da retórica e o clamor por justiça de um homem simples.',
    descEn: "The power of rhetoric and a simple man's plea for justice.",
    items: null,
    codex: null
  }
];

// Busca uma história do catálogo pelo id.
function catalogGet(storyId) {
  return MUSAEUM_CATALOG.find(s => s.storyId === storyId) || null;
}
