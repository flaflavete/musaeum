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
        meaningPt: 'Vida, vida eterna',
        meaningEn: 'Life, eternal life',
        typeKey: 'type-tri',
        notePt: 'Representa provavelmente uma sandália ritual amarrada no tornozelo, segundo a hipótese mais aceita por Alan Gardiner. Quando deuses seguram o ankh diante da boca de um faraó, transmitem-lhe a vida divina. É talvez o signo egípcio mais reconhecível e atravessou milênios como amuleto.',
        noteEn: 'Likely representing a ceremonial sandal tied at the ankle, according to Alan Gardiner\'s accepted hypothesis. When gods hold the ankh before a pharaoh\'s mouth, they transmit divine life. Perhaps the most recognizable Egyptian sign, it crossed millennia as an amulet.'
      },
      {
        glyph: '𓂀', translit: 'wḏꜣt', chapter: 0,
        namePt: 'Olho de Hórus (wedjat)', nameEn: 'Eye of Horus (wedjat)',
        meaningPt: 'O que está completo, proteção, cura',
        meaningEn: 'What is whole, protection, healing',
        typeKey: 'type-logogram',
        notePt: 'Segundo o mito, o olho de Hórus foi ferido por Seth e restaurado por Tot. Por isso significa restituição e integridade. Cada parte do desenho representa uma fração (1/2, 1/4, 1/8...) que somadas dão 63/64. O pequeno resto é a "magia de Tot".',
        noteEn: 'In the myth, Horus\'s eye was wounded by Seth and restored by Thoth. Hence it signifies restoration and wholeness. Each part of the drawing represents a fraction (1/2, 1/4, 1/8...) summing to 63/64. The small remainder is "Thoth\'s magic".'
      },
      {
        glyph: '𓇳', translit: 'rꜥ', chapter: 1,
        namePt: 'Sol, deus Rá', nameEn: 'Sun, god Ra',
        meaningPt: 'Sol, dia, o deus Rá',
        meaningEn: 'Sun, day, the god Ra',
        typeKey: 'type-logogram',
        notePt: 'Um círculo com ponto no centro. Serve como logograma para "sol" e "Rá", e como determinativo em palavras ligadas ao tempo e à luz. O deus Rá era o sol do meio-dia; Khepri era o sol nascente e Atum, o poente.',
        noteEn: 'A circle with a dot at its center. It works as a logogram for "sun" and "Ra", and as a determinative in words tied to time and light. The god Ra was the midday sun; Khepri was the rising sun and Atum the setting one.'
      },
      {
        glyph: '𓈗', translit: 'mw', chapter: 2,
        namePt: 'Águas', nameEn: 'Waters',
        meaningPt: 'Água, águas, líquido',
        meaningEn: 'Water, waters, liquid',
        typeKey: 'type-ideo',
        notePt: 'Três linhas onduladas representando ondulações da água. Pode aparecer como ideograma (a palavra "água") ou como determinativo de palavras ligadas a rios, líquidos e travessias. O Nilo e o "Grande Verde" (o Mediterrâneo) eram escritos com este signo.',
        noteEn: 'Three wavy lines representing rippling water. It can appear as an ideogram (the word "water") or as a determinative for words tied to rivers, liquids, and crossings. The Nile and the "Great Green" (the Mediterranean) were written with this sign.'
      },
      {
        glyph: '𓄣', translit: 'ỉb', chapter: 3,
        namePt: 'Coração', nameEn: 'Heart',
        meaningPt: 'Coração, mente, vontade',
        meaningEn: 'Heart, mind, will',
        typeKey: 'type-logogram',
        notePt: 'Para os egípcios, o coração era a sede do pensamento, da memória e da personalidade, não o cérebro, que era descartado durante a mumificação. No julgamento de Osíris, o coração do morto era pesado contra a pena de Maat.',
        noteEn: 'For Egyptians, the heart was the seat of thought, memory and personality, not the brain, which was discarded during mummification. In Osiris\'s judgment, the dead one\'s heart was weighed against Maat\'s feather.'
      },
      {
        glyph: '𓆙', translit: 'ḥfꜣw', chapter: 4,
        namePt: 'Serpente', nameEn: 'Serpent',
        meaningPt: 'Serpente, réptil',
        meaningEn: 'Serpent, reptile',
        typeKey: 'type-determin',
        notePt: 'A serpente aparece em muitos signos egípcios, como determinativo de répteis e também em nomes de divindades protetoras, como a uraeus (a cobra na testa do faraó). No Conto do Náufrago, a serpente da ilha é uma entidade divina chamada de "Príncipe de Punt".',
        noteEn: 'The serpent appears in many Egyptian signs, as a determinative of reptiles and also in names of protective deities, like the uraeus (the cobra on the pharaoh\'s forehead). In the Shipwrecked Sailor, the island serpent is a divine being called "Prince of Punt".'
      },
      {
        glyph: '𓏞', translit: 'sš', chapter: 5,
        namePt: 'Kit do escriba', nameEn: 'Scribe\'s kit',
        meaningPt: 'Escriba, escrita, escrever',
        meaningEn: 'Scribe, writing, to write',
        typeKey: 'type-bi',
        notePt: 'Representa o estojo do escriba: a paleta com duas cavidades para tintas (preta e vermelha), o saquinho de pigmento em pó e os pincéis de junco. Ser escriba no Egito era uma das profissões mais prestigiosas. "Sê escriba, livra-te do trabalho duro", dizia um texto sapiencial.',
        noteEn: 'Depicts the scribe\'s kit: the palette with two cavities for ink (black and red), the small bag of pigment powder, and the reed brushes. Being a scribe in Egypt was among the most prestigious professions. "Be a scribe, free yourself from hard labor", said a wisdom text.'
      },
      {
        glyph: '𓊛', translit: 'dpt', chapter: 6,
        namePt: 'Barco, embarcação', nameEn: 'Boat, vessel',
        meaningPt: 'Barco, navio, travessia',
        meaningEn: 'Boat, ship, crossing',
        typeKey: 'type-logogram',
        notePt: 'O signo do barco é central na cultura egípcia. O Nilo era a espinha dorsal do país e o sol atravessava o céu em sua barca diária. Navios reais sepultados ao lado de pirâmides, como o de Quéops, mostram a importância religiosa do transporte fluvial.',
        noteEn: 'The boat sign is central in Egyptian culture. The Nile was the country\'s backbone, and the sun crossed the sky in its daily bark. Royal ships buried beside pyramids, like Khufu\'s, show the religious weight of river travel.'
      },
      {
        glyph: '𓉐', translit: 'pr', chapter: 7,
        namePt: 'Casa', nameEn: 'House',
        meaningPt: 'Casa, lar, domínio',
        meaningEn: 'House, home, domain',
        typeKey: 'type-bi',
        notePt: 'A planta baixa de uma casa vista de cima. Como bilítero <i>pr</i>, forma palavras como <i>pr-ꜥnḫ</i> ("casa da vida", biblioteca de templo), <i>pr-ꜥꜣ</i> ("casa grande", donde vem a palavra "faraó") e <i>pr-ḥḏ</i> ("casa branca", o tesouro real).',
        noteEn: 'The floor plan of a house seen from above. As biliteral <i>pr</i>, it forms words like <i>pr-ꜥnḫ</i> ("house of life", temple library), <i>pr-ꜥꜣ</i> ("great house", source of the word "pharaoh") and <i>pr-ḥḏ</i> ("white house", the royal treasury).'
      }
    ]
  },

  {
    storyId: 'sinuhe',
    href: 'sinuhe.html',
    available: false, // bloqueada temporariamente para ajustes
    cardGlyph: '𓂻',
    titlePt: 'A História de Sinué',
    titleEn: 'The Story of Sinuhe',
    descPt: 'O exílio e o retorno. O épico máximo da literatura do Reino Médio.',
    descEn: 'Exile and return. The supreme epic of Middle Kingdom literature.',
    items: [
      { pt: 'Trigo', en: 'Wheat', icon: '🌾' },
      { pt: 'Falcão', en: 'Falcon', icon: '🦅' },
      { pt: 'Onda', en: 'Wave', icon: '🌊' },
      { pt: 'Palmeira', en: 'Palm tree', icon: '🌴' },
      { pt: 'Espadas', en: 'Swords', icon: '⚔️' },
      { pt: 'Pena de Maat', en: 'Feather of Maat', icon: '🪶' },
      { pt: 'Lua', en: 'Moon', icon: '🌙' },
      { pt: 'Rolo Real', en: 'Royal Scroll', icon: '📜' }
    ],
    codex: [
      {
        glyph: '𓆣', translit: 'ḫpr', chapter: -1,
        namePt: 'Escaravelho de Khepri', nameEn: 'Khepri Scarab',
        meaningPt: 'Transformação, renascimento, o devir',
        meaningEn: 'Transformation, rebirth, becoming',
        typeKey: 'type-logogram',
        notePt: 'O escaravelho Khepri empurra o sol nascente no horizonte, como o besouro empurra sua bola no chão. Seu nome deriva de <i>ḫpr</i>, "tornar-se". Nesta história, o escaravelho simboliza a grande transformação de Sinué: de servo do palácio a exilado, a chefe tribal, a egípcio reintegrado.',
        noteEn: 'The Khepri beetle pushes the rising sun across the horizon, as the dung beetle pushes its ball along the ground. Its name derives from <i>ḫpr</i>, "to become". In this story, the scarab symbolizes Sinuhe\'s great transformation: from palace servant to exile, tribal chief, and reintegrated Egyptian.'
      },
      {
        glyph: '𓂋', translit: 'r', chapter: 0,
        namePt: 'Boca', nameEn: 'Mouth',
        meaningPt: 'Boca, discurso, o anúncio',
        meaningEn: 'Mouth, speech, the announcement',
        typeKey: 'type-uni',
        notePt: 'Unilitero <i>r</i>, representa a boca humana vista de lado. É também componente do logograma de "sol" (<i>Rꜥ</i>). No contexto da morte do faraó, a boca é o órgão que recebe a notícia terrível, que faz o coração de Sinué tremer e os membros fraquejarem.',
        noteEn: 'Uniliteral <i>r</i>, depicts the human mouth seen from the side. It is also a component of the logogram for "sun" (<i>Rꜥ</i>). In the context of the pharaoh\'s death, the mouth is the organ that receives the terrible news, making Sinuhe\'s heart tremble and his limbs go weak.'
      },
      {
        glyph: '𓅓', translit: 'm', chapter: 1,
        namePt: 'Coruja', nameEn: 'Owl',
        meaningPt: 'Coruja, o unilitero m, silêncio',
        meaningEn: 'Owl, the uniliteral m, silence',
        typeKey: 'type-uni',
        notePt: 'A coruja pintada de frente é o unilitero <i>m</i>. É um dos raros hieróglifos representados frontalmente, ao contrário da maioria dos seres vivos, que aparecem de perfil. A fuga de Sinué acontece de noite, em silêncio, como o voo da coruja: sem testemunhas, cruzando fronteiras no escuro.',
        noteEn: 'The horned owl depicted frontally is the uniliteral <i>m</i>. It is one of the rare hieroglyphs shown face-on, as almost all living beings appear in profile. Sinuhe\'s flight takes place at night, in silence, like an owl\'s flight: no witnesses, crossing borders in the dark.'
      },
      {
        glyph: '𓈉', translit: 'xꜣst', chapter: 2,
        namePt: 'Terra estrangeira', nameEn: 'Foreign land',
        meaningPt: 'Colinas estrangeiras, o além-fronteira',
        meaningEn: 'Foreign hills, beyond the border',
        typeKey: 'type-determin',
        notePt: 'O signo representa colinas rochosas com vales, evocando o terreno acidentado das terras além do Nilo. É o determinativo padrão de topônimos estrangeiros como <i>Rtnw</i> (Retjenu). Para um egípcio, o mundo além dessas colinas era caos, ausência da ordem de <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'maat\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'maat\')}">Maat</span>.',
        noteEn: 'The sign depicts rocky hills with valleys, evoking the rough terrain beyond the Nile. It is the standard determinative for foreign place names like <i>Rtnw</i> (Retjenu). To an Egyptian, the world beyond those hills meant chaos, the absence of <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'maat\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'maat\')}">Maat</span>\'s order.'
      },
      {
        glyph: '𓆸', translit: 'sšn', chapter: 3,
        namePt: 'Flor de lótus', nameEn: 'Lotus flower',
        meaningPt: 'Lótus, criação, eloquência que floresce',
        meaningEn: 'Lotus, creation, eloquence in bloom',
        typeKey: 'type-logogram',
        notePt: 'O lótus azul do Nilo abre suas pétalas ao amanhecer e fecha ao entardecer, simbolizando o ciclo da criação e do renascimento solar. Na arte egípcia, figuras emergindo de uma flor de lótus representam o surgimento do ser do nada. O elogio de Sinué a Sesostris floresce como o lótus: nasce da lealdade e se abre em eloquência.',
        noteEn: 'The blue Nile lotus opens its petals at dawn and closes at dusk, symbolizing the cycle of creation and solar rebirth. In Egyptian art, figures emerging from a lotus represent the arising of being from nothing. Sinuhe\'s praise of Sesostris blooms like the lotus: born of loyalty and opening into eloquence.'
      },
      {
        glyph: '𓃒', translit: 'kꜣ', chapter: 4,
        namePt: 'Touro', nameEn: 'Bull',
        meaningPt: 'Touro, força, abundância',
        meaningEn: 'Bull, strength, abundance',
        typeKey: 'type-logogram',
        notePt: 'O touro é símbolo de força, fertilidade e realeza no Egito. O signo <i>kꜣ</i> (touro) é homófono de <i>kꜣ</i> (alma vital, o duplo espiritual). Em Araru, Sinué recebe gado sem limite: o touro representa tanto a prosperidade material como a vitalidade espiritual que ele reconstrói longe de sua terra natal.',
        noteEn: 'The bull is a symbol of strength, fertility, and royalty in Egypt. The sign <i>kꜣ</i> (bull) is a homophone of <i>kꜣ</i> (vital soul, the spiritual double). In Araru, Sinuhe receives cattle without limit: the bull represents both the material prosperity and the spiritual vitality he rebuilds far from his homeland.'
      },
      {
        glyph: '𓃭', translit: 'rw', chapter: 5,
        namePt: 'Leão', nameEn: 'Lion',
        meaningPt: 'Leão, o campeão, força guerreira',
        meaningEn: 'Lion, the champion, warrior strength',
        typeKey: 'type-determin',
        notePt: 'O leão deitado é o hieróglifo <i>rw</i> e determinativo de palavras ligadas a força, poder e feras. Faraós eram comparados a leões em batalha; a esfinge, o guardião mais poderoso do Egito, tem corpo de leão. No duelo de Sinué, ele enfrenta um campeão sem igual com a coragem de um leão, vencendo com arco e machado.',
        noteEn: 'The recumbent lion is the hieroglyph <i>rw</i> and a determinative for words tied to strength, power, and wild animals. Pharaohs were compared to lions in battle; the sphinx, Egypt\'s mightiest guardian, has the body of a lion. In Sinuhe\'s duel, he faces a champion without equal with a lion\'s courage, winning with bow and axe.'
      },
      {
        glyph: '𓇹', translit: 'jꜥḥ', chapter: 6,
        namePt: 'Lua crescente', nameEn: 'Crescent moon',
        meaningPt: 'Lua, a noite, o deus Iah',
        meaningEn: 'Moon, the night, the god Iah',
        typeKey: 'type-logogram',
        notePt: 'A lua crescente era o signo do deus lunar <i>Jꜥḥ</i> e aparece como determinativo de palavras ligadas ao tempo noturno e às estações. Para Sinué envelhecido em Araru, o que pesa no coração é o medo de morrer sob um céu estrangeiro, sem o ritual egípcio que permite à alma enfrentar o julgamento de Osíris.',
        noteEn: 'The crescent moon was the sign of the lunar god <i>Jꜥḥ</i> and appears as a determinative for words tied to night and seasons. For the aging Sinuhe in Araru, what weighs on the heart is the fear of dying under a foreign sky, without the Egyptian ritual that allows the soul to face Osiris\'s judgment.'
      },
      {
        glyph: '𓇼', translit: 'sbꜣ', chapter: 7,
        namePt: 'Estrela', nameEn: 'Star',
        meaningPt: 'Estrela, eternidade, o além-celeste',
        meaningEn: 'Star, eternity, the celestial beyond',
        typeKey: 'type-logogram',
        notePt: 'A estrela de cinco pontas é o logograma de <i>sbꜣ</i> ("estrela") e determinativo de palavras ligadas ao céu e à eternidade. As almas dos faraós mortos tornavam-se "estrelas imperecíveis" no céu setentrional. O retorno de Sinué ao Egito é também seu retorno à ordem cósmica, à possibilidade de se tornar ele mesmo uma estrela.',
        noteEn: 'The five-pointed star is the logogram <i>sbꜣ</i> ("star") and a determinative for words tied to the sky and eternity. Dead pharaohs\' souls became "imperishable stars" in the northern sky. Sinuhe\'s return to Egypt is also his return to cosmic order, to the possibility of becoming a star himself.'
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
