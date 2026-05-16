const I18N = {
  pt: {
    'brand':           'Musæum',
    'score-label':     'PONTOS',
    'begin':           'Começar a história',
    'challenge':       'Responder o desafio',
    'play-again':      'Recomeçar',
    'chapter':         'Capítulo',
    'intro-kicker':    'UMA HISTÓRIA DO EGITO ANTIGO · ~1800 a.C.',
    'intro-title':     'O Conto do Náufrago',
    'intro-subtitle':  'Uma das histórias mais antigas já escritas, agora em forma de jogo.',
    'intro-desc':      'Você vai ler a história em 8 partes baseadas no <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'papiro-hermitage\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'papiro-hermitage\')}">Papiro Hermitage 1115</span>. No fim de cada parte, um desafio sobre a trama ou a cultura egípcia. Acerte de primeira para coletar tesouros de <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'punt\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'punt\')}">Punt</span>!',
    'correct':         'CORRETO',
    'warning':         'CUIDADO!',
    'final-title':     'Fim da Jornada',
    'final-desc':      'Você acompanhou a história do náufrago até o fim. Veja sua classificação:',
    'final-inventory': 'TESOUROS TRAZIDOS DA INCRÍVEL ILHA',
    'points':          'pontos',
    'rank-apprentice': 'Aprendiz',
    'rank-student':    'Estudante de Hieróglifos',
    'rank-scribe':     'Escriba Hábil',
    'rank-master':     'Mestre Escriba',
    'credits-title':   'Referências Bibliográficas',
    'credits-body':    'ARAUJO, Emanuel. <b>Escrito para a Eternidade</b>: A literatura do Egito faraônico. Brasília, 2000.<br>BLACKMAN, A. M. <b>Middle-Egyptian Stories</b>. Part I. Brussels: Fondation Égyptologique Reine Élisabeth, 1932.<br>NEDERHOF, Mark-Jan. <b>The Shipwrecked Sailor</b>. Hieroglyphic transcription and translation. 2015.<br>POE, William Clay. <b>The Writing of a Skillful Scribe</b>: An introduction to hieratic Middle Egyptian through the text of The Shipwrecked Sailor. Santa Rosa, 2010.',
    'back-to-library': 'Voltar para o Musæum',
    'sound-label':     'Ativar ou desativar som',
    'inventory-label': 'Tesouros coletados',
    'splash-subtitle': 'O CONTO DO NÁUFRAGO',
    'splash-desc':     'Uma experiência interativa de leitura, gamificação e aprendizado baseada no Papiro Hermitage 1115',
    'enter':           'Entrar',
    'ankh-meaning':    'Símbolo da vida eterna',
    'chapter-glyph':   'HIERÓGLIFO DO CAPÍTULO',
    'challenge-count': 'DESAFIO',
    'context-label':   'CONTEXTO HISTÓRICO',
    'note-open':       '🔍 Nota Arqueológica',
    'note-close':      '✕ Fechar Nota',
    'next-chapter':    'Próximo Capítulo',
    'see-final':       'Ver Resultado Final',
    'treasure-got':    'Tesouro coletado',
    'wrong-default':   'Incorreto. Tente novamente!',
    'wrong-serpent':   '<b>Você ofendeu a Serpente!</b> Quase virou cinzas. Escolha rápido outra!',
    'final-rank-kicker': 'SEU TÍTULO',
    'final-rank-meaning':'O escriba mestre',
    'play-again-btn':  '↻ Recomeçar',
    'codex-label':     'Códex dos Hieróglifos',
    'codex-btn':       'Códex',
    'codex-title':     'Códex dos Hieróglifos',
    'codex-subtitle':  'Os signos que você encontrou ao longo da jornada',
    'codex-progress':  'DESCOBERTOS',
    'codex-locked':    'Ainda não descoberto',
    'codex-tutorial':  'Como ler hieróglifos',
    'codex-close':     'Fechar',
    'sheet-type':      'Tipo',
    'sheet-meaning':   'Significado',
    'sheet-note':      'Saiba mais',
    'sheet-appears':   'Aparece no',
    'sheet-back':      '← Voltar ao Códex',
    'tutorial-title':  'Como ler hieróglifos',
    'tutorial-sub':    'Uma introdução em três passos',
    'tut-prev':        '← Anterior',
    'tut-next':        'Próximo →',
    'tut-done':        'Concluído',
    'tut-s1-title':    'OS TRÊS TIPOS DE SIGNOS',
    'tut-s1-body':     'A escrita egípcia não é só imagens de palavras. Um mesmo signo pode funcionar de três maneiras diferentes dependendo do contexto. Saber distinguir é o primeiro passo da leitura.',
    'tut-s1-c1-label': 'Logograma',
    'tut-s1-c1-desc':  'representa a palavra inteira',
    'tut-s1-c2-label': 'Fonograma',
    'tut-s1-c2-desc':  'representa um som',
    'tut-s1-c3-label': 'Determinativo',
    'tut-s1-c3-desc':  'não se lê, classifica o sentido',
    'tut-s2-title':    'A DIREÇÃO DA LEITURA',
    'tut-s2-body':     'Os hieróglifos podem ser escritos da direita para a esquerda, da esquerda para a direita ou de cima para baixo. Como saber? Olhe para onde os animais e figuras humanas estão olhando: é de lá que o texto começa. Na maioria dos monumentos, a leitura é da direita para a esquerda.',
    'tut-s2-body2':    'No nosso jogo, todos os textos estão na direção ocidental (da esquerda para a direita) para facilitar a leitura moderna.',
    'tut-s3-title':    'O CARTUCHO REAL',
    'tut-s3-body':     'Quando você vê um grupo de signos cercado por uma moldura oval com uma linha embaixo, está olhando para um cartucho. Ele envolve o nome de um rei ou rainha e serve tanto como honra quanto como proteção mágica.',
    'tut-s3-body2':    'Foi graças ao cartucho que Champollion decifrou o egípcio antigo em 1822, comparando os nomes de Ptolomeu e Cleópatra na Pedra de Roseta.',
    'type-logogram':   'Logograma',
    'type-phonogram':  'Fonograma',
    'type-determin':   'Determinativo',
    'type-tri':        'Trilítero',
    'type-bi':         'Bilítero',
    'type-uni':        'Unilítero',
    'type-ideo':       'Ideograma',
    'glossary-btn':    'Glossário',
    'glossary-label':  'Glossário de termos',
    'glossary-title':  'Glossário',
    'glossary-subtitle':'Palavras e conceitos da história do Egito Antigo',
    'glossary-search': 'Buscar termo...',
    'glossary-empty':  'Nenhum termo encontrado.',
    'discovery-title': '✦ Novo signo descoberto!',
    'discovery-sub':   'Toque para ver no Códex',
    'splash-welcome':  'Boas-vindas de volta, ',
    'final-congrats':  'Parabéns, ',
  },
  en: {
    'brand':           'Musæum',
    'score-label':     'POINTS',
    'begin':           'Start the story',
    'challenge':       'Take the challenge',
    'play-again':      'Restart',
    'chapter':         'Chapter',
    'intro-kicker':    'AN ANCIENT EGYPTIAN TALE · c. 1800 BCE',
    'intro-title':    'The Shipwrecked Sailor',
    'intro-subtitle': 'One of the oldest stories ever written, now as a game.',
    'intro-desc':     'Read the tale in 8 parts based on the <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'papiro-hermitage\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'papiro-hermitage\')}">Hermitage Papyrus 1115</span>. After each part, take a challenge on the plot or Egyptian culture. Answer on the first try to collect treasures from <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'punt\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'punt\')}">Punt</span>!',
    'correct':         'CORRECT',
    'warning':         'WARNING!',
    'final-title':     'End of the Journey',
    'final-desc':      'You followed the sailor\'s tale to the end. Here is your rank:',
    'final-inventory': 'TREASURES FROM THE AMAZING ISLAND',
    'points':          'points',
    'rank-apprentice': 'Apprentice',
    'rank-student':    'Hieroglyph Student',
    'rank-scribe':     'Skillful Scribe',
    'rank-master':     'Master Scribe',
    'credits-title':   'Bibliographic References',
    'credits-body':    'ARAUJO, Emanuel. <b>Escrito para a Eternidade</b>: A literatura do Egito faraônico. Brasília, 2000.<br>BLACKMAN, A. M. <b>Middle-Egyptian Stories</b>. Brussels, 1932.<br>NEDERHOF, Mark-Jan. <b>The Shipwrecked Sailor</b>. 2015.<br>POE, William Clay. <b>The Writing of a Skillful Scribe</b>. Santa Rosa, 2010.',
    'back-to-library': 'Back to Musæum',
    'sound-label':     'Toggle sound on or off',
    'inventory-label': 'Collected treasures',
    'splash-subtitle': 'THE SHIPWRECKED SAILOR',
    'enter':           'Enter',
    'ankh-meaning':    'Symbol of eternal life',
    'chapter-glyph':   'CHAPTER HIEROGLYPH',
    'challenge-count': 'CHALLENGE',
    'context-label':   'HISTORICAL CONTEXT',
    'note-open':       '🔍 Archaeological Note',
    'note-close':      '✕ Close Note',
    'next-chapter':    'Next Chapter',
    'see-final':       'See Final Result',
    'treasure-got':    'Treasure collected',
    'wrong-default':   'Wrong. Try again!',
    'wrong-serpent':   '<b>You offended the Serpent!</b> Almost turned to ashes. Choose another fast!',
    'final-rank-kicker': 'YOUR TITLE',
    'final-rank-meaning':'The master scribe',
    'play-again-btn':  '↻ Restart',
    'codex-label':     'Hieroglyph Codex',
    'codex-btn':       'Codex',
    'codex-title':     'Hieroglyph Codex',
    'codex-subtitle':  'The signs you have discovered along the journey',
    'codex-progress':  'DISCOVERED',
    'codex-locked':    'Not yet discovered',
    'codex-tutorial':  'How to read hieroglyphs',
    'codex-close':     'Close',
    'sheet-type':      'Type',
    'sheet-meaning':   'Meaning',
    'sheet-note':      'Learn more',
    'sheet-appears':   'Appears in',
    'sheet-back':      '← Back to Codex',
    'tutorial-title':  'How to read hieroglyphs',
    'tutorial-sub':    'A three-step introduction',
    'tut-prev':        '← Previous',
    'tut-next':        'Next →',
    'tut-done':        'Done',
    'tut-s1-title':    'THE THREE KINDS OF SIGNS',
    'tut-s1-body':     'Egyptian writing is not just pictures of words. The same sign can work in three different ways depending on context. Learning to tell them apart is the first step to reading.',
    'tut-s1-c1-label': 'Logogram',
    'tut-s1-c1-desc':  'stands for the whole word',
    'tut-s1-c2-label': 'Phonogram',
    'tut-s1-c2-desc':  'stands for a sound',
    'tut-s1-c3-label': 'Determinative',
    'tut-s1-c3-desc':  'not read, classifies meaning',
    'tut-s2-title':    'THE DIRECTION OF READING',
    'tut-s2-body':     'Hieroglyphs can be written right-to-left, left-to-right, or top-to-bottom. How to tell? Look at where the animals and human figures face: that is where the text begins. On most monuments, reading goes right to left.',
    'tut-s2-body2':    'In our game, all texts are shown in the western direction (left to right) to make modern reading easier.',
    'tut-s3-title':    'THE ROYAL CARTOUCHE',
    'tut-s3-body':     'When you see a group of signs surrounded by an oval frame with a line beneath, you are looking at a cartouche. It encloses the name of a king or queen and serves as both honor and magical protection.',
    'tut-s3-body2':    'It was thanks to the cartouche that Champollion deciphered ancient Egyptian in 1822, by comparing the names of Ptolemy and Cleopatra on the Rosetta Stone.',
    'type-logogram':   'Logogram',
    'type-phonogram':  'Phonogram',
    'type-determin':   'Determinative',
    'type-tri':        'Triliteral',
    'type-bi':         'Biliteral',
    'type-uni':        'Uniliteral',
    'type-ideo':       'Ideogram',
    'glossary-btn':    'Glossary',
    'glossary-label':  'Glossary of terms',
    'glossary-title':  'Glossary',
    'glossary-subtitle':'Words and concepts from Ancient Egypt',
    'glossary-search': 'Search term...',
    'glossary-empty':  'No term found.',
    'discovery-title': '✦ New sign discovered!',
    'discovery-sub':   'Tap to view in the Codex',
    'splash-desc':     'An interactive experience of reading, gamification, and learning based on the Hermitage Papyrus 1115',
    'splash-welcome':  'Welcome back, ',
    'final-congrats':  'Congratulations, ',
  }
};

const ITEMS = [
  { pt: 'Uvas', en: 'Grapes', icon: '🍇' },
  { pt: 'Vinho', en: 'Wine', icon: '🍷' },
  { pt: 'Incenso', en: 'Incense', icon: '💨' },
  { pt: 'Mirra', en: 'Myrrh', icon: '🏺' },
  { pt: 'Óleo', en: 'Oil', icon: '🪔' },
  { pt: 'Marfim', en: 'Ivory', icon: '🦷' },
  { pt: 'Macaco', en: 'Monkey', icon: '🐒' },
  { pt: 'Cão', en: 'Dog', icon: '🐕' }
];

// ============================================================
// GLOSSÁRIO DE TERMOS DIFÍCEIS
// ============================================================
const GLOSSARY = [
  {
    id: 'punt',
    termPt: 'Punt', termEn: 'Punt',
    tagPt: 'Lugar', tagEn: 'Place',
    defPt: 'Reino lendário ao sul do Egito, fonte de incenso, mirra, ouro, marfim e madeira de ébano. Sua localização exata ainda é debatida, mas provavelmente ficava na região do Corno da África (Somália, Eritreia ou Iêmen). Para os egípcios, Punt era conhecida como <i>Ta-Netjer</i>, "Terra do Deus".',
    defEn: 'Legendary kingdom south of Egypt, source of incense, myrrh, gold, ivory, and ebony wood. Its exact location is still debated, but likely lay in the Horn of Africa (Somalia, Eritrea, or Yemen). For the Egyptians, Punt was known as <i>Ta-Netjer</i>, "Land of the God".'
  },
  {
    id: 'covado',
    termPt: 'Côvado (meh)', termEn: 'Cubit (meh)',
    tagPt: 'Medida', tagEn: 'Measure',
    defPt: 'Unidade de comprimento baseada no antebraço, do cotovelo à ponta do dedo médio. O "côvado real" egípcio media cerca de 52,3 cm. O navio de 120 côvados da história tinha portanto uns 60 metros, um tamanho considerável para a época.',
    defEn: 'Unit of length based on the forearm, from elbow to the tip of the middle finger. The Egyptian "royal cubit" measured about 52.3 cm. The 120-cubit ship in the story was therefore about 60 meters, quite a size for its time.'
  },
  {
    id: 'grande-verde',
    termPt: 'Grande Verde (Wadj-Wer)', termEn: 'Great Green (Wadj-Wer)',
    tagPt: 'Lugar', tagEn: 'Place',
    defPt: 'Nome egípcio para o Mar Mediterrâneo, e às vezes para o Mar Vermelho. Para os egípcios, o mar era um espaço de caos, diferente do Nilo, que era controlado e previsível. Navegar no "Grande Verde" sempre carregava a aura de uma aventura perigosa.',
    defEn: 'Egyptian name for the Mediterranean Sea, and sometimes for the Red Sea. For the Egyptians, the sea was a space of chaos, unlike the Nile, which was controlled and predictable. Sailing the "Great Green" always carried the aura of a dangerous adventure.'
  },
  {
    id: 'ka',
    termPt: 'Ka', termEn: 'Ka',
    tagPt: 'Conceito', tagEn: 'Concept',
    defPt: 'A força vital ou "duplo espiritual" de uma pessoa, criada no nascimento pelo deus Khnum em seu torno de oleiro. Continuava existindo após a morte e precisava de oferendas de comida e bebida nos túmulos. Dizer que alguém "foi para o seu Ka" era uma forma poética de dizer que havia morrido.',
    defEn: 'The life force or "spiritual double" of a person, created at birth by the god Khnum on his potter\'s wheel. It continued to exist after death and needed offerings of food and drink in tombs. Saying someone "went to their Ka" was a poetic way of saying they had died.'
  },
  {
    id: 'maat',
    termPt: 'Maat', termEn: 'Maat',
    tagPt: 'Deusa / Conceito', tagEn: 'Goddess / Concept',
    defPt: 'Deusa e conceito da ordem cósmica, verdade, justiça e equilíbrio. Representada como uma mulher com uma pena de avestruz na cabeça. No julgamento após a morte, o coração era pesado contra a pena de Maat: se mais leve que a pena, a alma era justa.',
    defEn: 'Goddess and concept of cosmic order, truth, justice, and balance. Shown as a woman with an ostrich feather on her head. In the judgment after death, the heart was weighed against Maat\'s feather: if lighter than the feather, the soul was righteous.'
  },
  {
    id: 'osiris',
    termPt: 'Osíris', termEn: 'Osiris',
    tagPt: 'Deus', tagEn: 'God',
    defPt: 'Deus do além-túmulo, da ressurreição e da vegetação. Segundo o mito, foi assassinado e desmembrado por seu irmão Seth, depois ressuscitado por Ísis. Tornou-se o juiz dos mortos. É representado como uma múmia com coroa branca.',
    defEn: 'God of the afterlife, resurrection, and vegetation. According to the myth, he was murdered and dismembered by his brother Seth, then resurrected by Isis. He became the judge of the dead. He is shown as a mummy with a white crown.'
  },
  {
    id: 'lapis-lazuli',
    termPt: 'Lápis-lazúli', termEn: 'Lapis lazuli',
    tagPt: 'Material', tagEn: 'Material',
    defPt: 'Pedra semipreciosa de um azul profundo, importada principalmente do Afeganistão, a milhares de quilômetros do Egito. Seu alto custo fazia dela material exclusivo das elites e dos deuses. Na arte, o cabelo dos deuses era feito de lápis-lazúli.',
    defEn: 'Deep blue semi-precious stone, imported mostly from Afghanistan, thousands of kilometers from Egypt. Its high cost made it a material reserved for elites and gods. In art, the gods\' hair was made of lapis lazuli.'
  },
  {
    id: 'mirra',
    termPt: 'Mirra', termEn: 'Myrrh',
    tagPt: 'Material', tagEn: 'Material',
    defPt: 'Resina aromática extraída da árvore <i>Commiphora</i>, cultivada em Punt e na Arábia. Usada em perfumes, cosméticos, rituais de templo e, principalmente, no processo de mumificação para preservar o corpo.',
    defEn: 'Aromatic resin extracted from the <i>Commiphora</i> tree, grown in Punt and Arabia. Used in perfumes, cosmetics, temple rituals, and especially in the mummification process to preserve the body.'
  },
  {
    id: 'incenso',
    termPt: 'Incenso', termEn: 'Incense',
    tagPt: 'Material', tagEn: 'Material',
    defPt: 'Resina aromática queimada em rituais nos templos. A palavra egípcia era <i>senetjer</i>, literalmente "aquilo que torna divino". Acreditava-se que a fumaça subia aos céus levando as preces aos deuses. Era tão valioso quanto o ouro.',
    defEn: 'Aromatic resin burned in temple rituals. The Egyptian word was <i>senetjer</i>, literally "that which makes divine". It was believed that the smoke rose to the heavens carrying prayers to the gods. It was as valuable as gold.'
  },
  {
    id: 'kohl',
    termPt: 'Kohl (msdmt)', termEn: 'Kohl (msdmt)',
    tagPt: 'Material', tagEn: 'Material',
    defPt: 'Cosmético escuro à base de galena (sulfeto de chumbo) ou antimônio, usado pelos egípcios para delinear os olhos. Em egípcio chamado <i>msdmt</i>. Além da função estética, acreditava-se que protegia os olhos do sol intenso e afastava maus espíritos. Homens e mulheres de todas as classes sociais o usavam.',
    defEn: 'Dark cosmetic made of galena (lead sulfide) or antimony, used by Egyptians to line the eyes. In Egyptian it was called <i>msdmt</i>. Beyond its aesthetic function, it was believed to protect the eyes from intense sun and ward off evil spirits. Men and women of all social classes wore it.'
  },
  {
    id: 'farao',
    termPt: 'Faraó', termEn: 'Pharaoh',
    tagPt: 'Título', tagEn: 'Title',
    defPt: 'Soberano do Egito Antigo. A palavra vem de <i>per-aa</i>, "grande casa" ou "grande palácio", originalmente referindo-se à residência real e só depois ao próprio rei. O faraó era considerado a manifestação viva de Hórus e mediador entre os deuses e os humanos.',
    defEn: 'Sovereign of Ancient Egypt. The word comes from <i>per-aa</i>, "great house" or "great palace", originally referring to the royal residence and only later to the king himself. The pharaoh was considered the living manifestation of Horus and mediator between gods and humans.'
  },
  {
    id: 'reino-medio',
    termPt: 'Reino Médio', termEn: 'Middle Kingdom',
    tagPt: 'Período', tagEn: 'Period',
    defPt: 'Período da história egípcia entre cerca de 2055 e 1650 a.C. (11ª a 13ª Dinastias). Considerado a "era clássica" da literatura egípcia: é quando foram compostos o Conto do Náufrago, o Conto de Sinuhe e muitos textos sapienciais. O egípcio clássico usado nestas obras tornou-se o modelo literário por séculos.',
    defEn: 'Period of Egyptian history between about 2055 and 1650 BCE (11th to 13th Dynasties). Considered the "classical era" of Egyptian literature: it is when the Tale of the Shipwrecked Sailor, the Tale of Sinuhe, and many wisdom texts were composed. The classical Egyptian used in these works became the literary model for centuries.'
  },
  {
    id: 'wawat',
    termPt: 'Wawat', termEn: 'Wawat',
    tagPt: 'Região', tagEn: 'Region',
    defPt: 'Denominação egípcia para a Baixa Núbia, região entre a primeira e a segunda cataratas do Nilo (no atual norte do Sudão e sul do Egito). Era explorada por expedições reais em busca de ouro, cobre e pedras semipreciosas. Manter o controle de Wawat era fundamental para a política expansionista dos faraós do Reino Médio.',
    defEn: 'Egyptian name for Lower Nubia, the region between the first and second cataracts of the Nile (in present-day northern Sudan and southern Egypt). It was exploited by royal expeditions for gold, copper, and semi-precious stones. Maintaining control of Wawat was central to the expansionist policy of Middle Kingdom pharaohs.'
  },
  {
    id: 'senemut',
    termPt: 'Senemut', termEn: 'Senemut',
    tagPt: 'Região', tagEn: 'Region',
    defPt: 'Área rochosa associada à região da segunda catarata do Nilo, na Núbia. As "águas de Senemut" mencionadas no Conto do Náufrago indicam que a embarcação havia partido de uma expedição muito além das fronteiras sul do Egito, adentrando as zonas de extração mineral controladas pela coroa.',
    defEn: 'Rocky area associated with the region of the second cataract of the Nile, in Nubia. The "waters of Senemut" mentioned in the Tale of the Shipwrecked Sailor indicate that the vessel had returned from an expedition far beyond Egypt\'s southern borders, into the mineral extraction zones controlled by the crown.'
  }
];

const t = (k) => I18N[state.lang][k] || k;

const CHAPTERS = [
  {
    titlePt: 'A Fala Eficaz',
    titleEn: 'The Effective Speech',
    featured: { glyph: '𓂀', translit: 'wḏꜣt', meaningPt: 'o Olho de Hórus, símbolo de proteção', meaningEn: 'the Eye of Horus, protection' },
    notePt: 'A menção a <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'wawat\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'wawat\')}">Wawat</span> e <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'senemut\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'senemut\')}">Senemut</span> no Conto do Náufrago não é meramente poética; ela ancora a narrativa na realidade administrativa da XII Dinastia, situando a história em um contexto de exploração mineral e controle de fronteiras.',
    noteEn: 'The mention of <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'wawat\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'wawat\')}">Wawat</span> and <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'senemut\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'senemut\')}">Senemut</span> in the Tale of the Shipwrecked Sailor is not merely poetic; it anchors the narrative in the administrative reality of the 12th Dynasty, situating the story in a context of mineral exploration and border control.',
    storyPt: `<p class="dropcap">A expedição havia terminado. O navio finalmente atracava em solo egípcio, mas o coração do comandante estava pesado de temor. Ele havia falhado em sua missão oficial perante o soberano e temia o julgamento real.</p><p>Vendo o desespero de seu mestre, um marinheiro astuto aproximou-se. <i>"wḏꜣ jb.k ḥꜣty-ꜥ"</i> (Que teu coração prospere, líder), disse ele. "Acalme o seu coração, meu senhor, eis que chegamos em casa! O malhete foi seguro, as amarras presas e a corda da proa já toca a terra. Agradeça aos deuses, pois nossa tripulação voltou a salvo e não houve baixas em nossa jornada.</p><p>Deixamos <span class="gloss" tabindex="0" onclick="openGlossaryAt('wawat')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('wawat')}">Wawat</span> para trás e passamos pelas águas de <span class="gloss" tabindex="0" onclick="openGlossaryAt('senemut')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('senemut')}">Senemut</span>. Já retornamos sãos e salvos e pisamos em nossa terra. Agora, ouça-me: purifique-se e derrame água sobre seus dedos. Quando for levado diante do Rei e interrogado, deverá responder com firmeza e segurança, sem gaguejar. Lembre-se que a boca de um homem pode salvá-lo. Deixe-me contar-lhe o que aconteceu comigo em uma missão semelhante, para que entenda que o destino pode ser generoso, mesmo após o desastre."</p>`,
    storyEn: `<p class="dropcap">The expedition had ended. The ship was finally docking on Egyptian soil, but the commander's heart was heavy with fear. He had failed his official mission before the sovereign and dreaded royal judgment.</p><p>Seeing his master's despair, an astute sailor approached. <i>"wḏꜣ jb.k ḥꜣty-ꜥ"</i> (May your heart prosper, leader), he said. "Calm your heart, my lord, for we have come home! The mooring post was secure, the moorings fast, and the bow rope already touches the land. Give thanks to the gods, for our crew returned safely and there were no losses on our journey.</p><p>We left <span class="gloss" tabindex="0" onclick="openGlossaryAt('wawat')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('wawat')}">Wawat</span> behind and passed through the waters of <span class="gloss" tabindex="0" onclick="openGlossaryAt('senemut')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('senemut')}">Senemut</span>. We have returned safe and sound and set foot on our land. Now, hear me: purify yourself and pour water over your fingers. When you are brought before the King and questioned, you must answer with firmness and confidence, without faltering. Remember that a man's mouth can save him. Let me tell you what happened to me on a similar mission, so that you may understand that fate can be generous, even after disaster."</p>`,
    question: {
      promptPt: 'Por que o capitão está preocupado após a missão?',
      promptEn: 'Why is the captain worried after the mission?',
      options: [
        { pt: 'Ele perdeu o navio na tempestade', en: 'He lost the ship in the storm', correct: false },
        { pt: 'A expedição teve perdas e ele teme o Rei', en: 'The expedition had losses and he fears the King', correct: true },
        { pt: 'O marinheiro desobedeceu suas ordens', en: 'The sailor disobeyed his orders', correct: false },
        { pt: 'Ele não conseguiu encontrar ouro', en: 'He could not find any gold', correct: false },
      ],
      factPt: 'No Egito, fracassar em uma missão real era gravíssimo. Nobres prestavam contas diretamente ao <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'farao\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'farao\')}">faraó</span>.',
      factEn: 'In Egypt, failing a royal mission was very serious. Nobles answered directly to the <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'farao\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'farao\')}">pharaoh</span>.'
    }
  },
  {
    titlePt: 'A Grande Viagem',
    titleEn: 'The Great Voyage',
    featured: { glyph: '𓇳', translit: 'rꜥ', meaningPt: 'o Sol, o deus Rá, senhor do dia', meaningEn: 'the Sun, the god Ra' },
    notePt: 'O navio media <strong>120 <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'covado\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'covado\')}">côvados</span></strong>, cerca de 60 metros. Para a época, isso seria o equivalente a um navio de carga gigante. O "côvado real" era a medida baseada no antebraço do <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'farao\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'farao\')}">Faraó</span>.',
    noteEn: 'The ship measured <strong>120 <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'covado\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'covado\')}">cubits</span></strong>, about 60 meters. At the time, this would be the equivalent of a giant cargo ship. The "royal cubit" was the measure based on the <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'farao\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'farao\')}">Pharaoh\'s</span> forearm.',
    storyPt: `<p class="dropcap">"Deixa que eu te conte algo semelhante que me aconteceu quando fui enviado às minas do Soberano. Eu navegava pelo mar a bordo de um grande navio, uma embarcação de cento e vinte <span class="gloss" tabindex="0" onclick="openGlossaryAt('covado')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('covado')}">côvados</span> de comprimento por quarenta de largura. Nele embarcaram cento e vinte marinheiros, escolhidos entre os melhores de todo o Egito; homens cujos corações eram mais intrépidos que o de leões. Fosse observando o céu, fosse observando a terra, eles possuíam a sabedoria de prever uma borrasca antes mesmo dela sobrevir e uma tempestade antes de rebentar. Contudo, no meio do mar, uma tormenta terrível nos atingiu."</p>`,
    storyEn: `<p class="dropcap">"Let me tell you something similar that happened to me when I was sent to the sovereign's mines. I was sailing the sea aboard a great ship, a vessel of one hundred and twenty <span class="gloss" tabindex="0" onclick="openGlossaryAt('covado')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('covado')}">cubits</span> in length by forty in width. On board were one hundred and twenty sailors, chosen from the finest in all of Egypt; men whose hearts were more fearless than those of lions. Whether watching the sky or observing the land, they had the wisdom to foresee a squall before it arose and a storm before it broke. Yet in the midst of the sea, a terrible tempest struck us."</p>`,
    question: {
      promptPt: 'Qual o tamanho aproximado do navio de 120 côvados?',
      promptEn: 'What is the approximate size of a 120-cubit ship?',
      options: [
        { pt: 'Cerca de 20 metros', en: 'About 20 meters', correct: false },
        { pt: 'Cerca de 60 metros', en: 'About 60 meters', correct: true  },
        { pt: 'Cerca de 100 metros', en: 'About 100 meters', correct: false },
        { pt: 'Cerca de 10 metros', en: 'About 10 meters', correct: false },
      ],
      factPt: 'O côvado real egípcio (meh) media aproximadamente 52,3 cm.',
      factEn: 'The Egyptian royal cubit (meh) measured approximately 52.3 cm.'
    }
  },
  {
    titlePt: 'O Naufrágio',
    titleEn: 'The Shipwreck',
    featured: { glyph: '𓈗', translit: 'mw', meaningPt: 'as águas, três linhas onduladas', meaningEn: 'the waters, three wavy lines' },
    notePt: 'O termo para tempestade usado aqui é nšnı͗. No imaginário egípcio, o mar era o domínio do caos. Sobreviver a um naufrágio era visto como uma intervenção divina direta do <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'ka\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'ka\')}">Ka</span>, a força vital.',
    noteEn: 'The term for storm used here is <strong>nšnı͗</strong>. In the Egyptian imagination, the sea was the domain of chaos. Surviving a shipwreck was seen as a direct divine intervention of the <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'ka\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'ka\')}">Ka</span>, the life force.',
    storyPt: `<p class="dropcap">"A tormenta irrompeu enquanto ainda estávamos no <span class="gloss" tabindex="0" onclick="openGlossaryAt('grande-verde')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('grande-verde')}">Grande Verde</span>, antes que pudéssemos alcançar a terra. O vento rugiu sem parar e as ondas atingiram oito <span class="gloss" tabindex="0" onclick="openGlossaryAt('covado')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('covado')}">côvados</span> de altura, chocando-se contra o mastro com tamanha violência que o navio pereceu. De todos os que estavam a bordo, ninguém sobreviveu, exceto eu. Fui arrebatado e lançado em uma ilha por uma gigantesca onda do mar."</p>`,
    storyEn: `<p class="dropcap">"The tempest broke while we were still on the <span class="gloss" tabindex="0" onclick="openGlossaryAt('grande-verde')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('grande-verde')}">Great Green</span>, before we could reach land. The wind roared without stop and the waves reached eight <span class="gloss" tabindex="0" onclick="openGlossaryAt('covado')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('covado')}">cubits</span> in height, crashing against the mast with such violence that the ship perished. Of all those on board, none survived except me. I was swept away and cast upon an island by a gigantic wave of the sea."</p>`,
    question: {
      promptPt: 'Como o marinheiro chegou à ilha após o naufrágio?',
      promptEn: 'How did the sailor reach the island after the shipwreck?',
      options: [
        { pt: 'Agarrou-se a um pedaço de madeira', en: 'He clung to a piece of wood', correct: false },
        { pt: 'Foi lançado na ilha por uma gigantesca onda', en: 'He was cast onto the island by a gigantic wave', correct: true },
        { pt: 'Nadou três dias até alcançar a costa', en: 'He swam for three days until reaching the shore', correct: false },
        { pt: 'Foi resgatado por pescadores', en: 'He was rescued by fishermen', correct: false },
      ],
      factPt: 'O naufrágio solitário é um tema comum que reforça a ideia de destino individual e proteção divina.',
      factEn: 'The solitary shipwreck is a common theme reinforcing individual fate and divine protection.'
    }
  },
  {
    titlePt: 'A Ilha de Abundância',
    titleEn: 'The Island of Abundance',
    featured: { glyph: '𓄣', translit: 'ỉb', meaningPt: 'o coração, sede do pensamento', meaningEn: 'the heart, seat of thought' },
    notePt: 'A ilha é descrita como um local de abundância impossível como figos, uvas e <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'incenso\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'incenso\')}">incenso</span>. Para os egípcios do <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'reino-medio\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'reino-medio\')}">Reino Médio</span>, isso representava a Ilha do <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'ka\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'ka\')}">Ka</span>, um plano espiritual onde a vida nunca termina.',
    noteEn: 'The island is described as a place of impossible abundance such as figs, grapes, and <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'incenso\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'incenso\')}">incense</span>. For <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'reino-medio\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'reino-medio\')}">Middle Kingdom</span> Egyptians, this represented the Island of the <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'ka\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'ka\')}">Ka</span>, a spiritual plane where life never ends.',
    storyPt: `<p class="dropcap">"Passei três dias sozinho, tendo apenas o meu próprio coração por companheiro. Ali, estendido sob o abrigo de uma cabana, eu abraçava a minha própria sombra. Mas a terra era generosa; sobrevivi comendo o que ela me oferecia: figos, uvas, excelentes legumes, peixes e aves. Nada havia que não se encontrasse ali. Saciei-me e, em gratidão, fiz uma fogueira e queimei oferendas aos deuses, pois estava diante de uma terra de absoluta abundância."</p>`,
    storyEn: `<p class="dropcap">"I spent three days alone, with only my own heart for company. There, lying under the shelter of a hut, I embraced my own shadow. But the land was generous; I survived eating what it offered me: figs, grapes, fine vegetables, fish, and birds. There was nothing that was not to be found there. I was satisfied and, in gratitude, I lit a fire and burned offerings to the gods, for I stood upon a land of absolute abundance."</p>`,
    question: {
      promptPt: 'Qual órgão era considerado a sede do intelecto no Egito?',
      promptEn: 'Which organ was considered the seat of intellect in Egypt?',
      options: [
        { pt: 'O Cérebro', en: 'The Brain', correct: false },
        { pt: 'O Estômago', en: 'The Stomach', correct: false },
        { pt: 'O Coração', en: 'The Heart', correct: true  },
        { pt: 'O Fígado', en: 'The Liver', correct: false },
      ],
      factPt: 'O coração (ỉb) era pesado no tribunal de <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'osiris\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'osiris\')}">Osíris</span> contra a pena de <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'maat\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'maat\')}">Maat</span> para decidir o destino da alma.',
      factEn: 'The heart (ỉb) was weighed in <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'osiris\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'osiris\')}">Osiris\'s</span> court against <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'maat\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'maat\')}">Maat\'s</span> feather to decide the soul\'s fate.'
    }
  },
  {
    titlePt: 'A Aparição Divina',
    titleEn: 'The Divine Appearance',
    featured: { glyph: '𓆙', translit: 'ḥfꜣw', meaningPt: 'a serpente de poder antigo', meaningEn: 'the serpent of ancient power' },
    notePt: 'A serpente é descrita com corpo de ouro e sobrancelhas de <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'lapis-lazuli\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'lapis-lazuli\')}">lápis-lazúli</span> real. Essas cores indicam divindade. Ela não é um monstro, mas uma entidade sábia e antiga.',
    noteEn: 'The serpent is described with body of gold and eyebrows of real <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'lapis-lazuli\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'lapis-lazuli\')}">lapis lazuli</span>. These colors indicate divinity. He is not a monster, but a wise and ancient entity.',
    storyPt: `<p class="dropcap">"De repente, ouvi um estrondo como o de um trovão. A terra tremeu e as árvores balançaram. Quando abri os olhos, vi uma serpente gigantesca aproximando-se. Ela tinha trinta <span class="gloss" tabindex="0" onclick="openGlossaryAt('covado')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('covado')}">côvados</span> de comprimento, sua pele era revestida de ouro e suas sobrancelhas eram de puro <span class="gloss" tabindex="0" onclick="openGlossaryAt('lapis-lazuli')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('lapis-lazuli')}">lápis-lazúli</span>.</p><p>A criatura parou diante de mim e perguntou, com voz de trovão: 'Quem te trouxe, baixinho? Se demorares a me dizer quem te trouxe a esta ilha, farei com que te tornes cinzas.' Eu estava tão aterrorizado que não conseguia entender minhas próprias palavras.</p><p>A serpente, então, levou-me gentilmente em sua boca até sua morada e repetiu a pergunta. Contei-lhe sobre a missão do Rei, a tempestade e o naufrágio. Ao ouvir minha dor, a serpente me confortou: 'Não temas, não empalideças. Foi o próprio Deus quem permitiu que sobrevivesses e te trouxe a esta Ilha da Abundância. Nada te faltará. Passarás quatro meses aqui, até que um navio de tua terra venha buscar-te, e voltarás para os teus filhos e para a tua casa.'"</p>`,
    storyEn: `<p class="dropcap">"Suddenly, I heard a roar like thunder. The earth shook and the trees swayed. When I opened my eyes, I saw a gigantic serpent approaching. It was thirty <span class="gloss" tabindex="0" onclick="openGlossaryAt('covado')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('covado')}">cubits</span> in length, its skin was covered in gold, and its eyebrows were of pure <span class="gloss" tabindex="0" onclick="openGlossaryAt('lapis-lazuli')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('lapis-lazuli')}">lapis lazuli</span>.</p><p>The creature stopped before me and asked, with a voice like thunder: 'Who brought you here, little one? If you delay in telling me who brought you to this island, I shall make you turn to ashes.' I was so terrified that I could not understand my own words.</p><p>The serpent then gently carried me in its mouth to its dwelling and repeated the question. I told it of the King's mission, the storm, and the shipwreck. Upon hearing of my suffering, the serpent comforted me: 'Fear not, do not grow pale. It was God himself who permitted you to survive and brought you to this Island of Abundance. You shall want for nothing. You will spend four months here, until a ship from your land comes to fetch you, and you will return to your children and to your home.'"</p>`,
    question: {
      promptPt: 'Quais materiais indicavam a divindade da Serpente?',
      promptEn: 'Which materials indicated the Serpent\'s divinity?',
      options: [
        { pt: 'Prata e Turquesa', en: 'Silver and Turquoise', correct: false },
        { pt: 'Ouro e Lápis-lazúli', en: 'Gold and Lapis-lazuli', correct: true  },
        { pt: 'Cobre e Obsidiana', en: 'Copper and Obsidian', correct: false },
        { pt: 'Ferro e Quartzo', en: 'Iron and Quartz', correct: false },
      ],
      factPt: 'Ouro e Lápis-lazúli eram associados à carne e ao cabelo dos deuses.',
      factEn: 'Gold and Lapis-lazuli were associated with the flesh and hair of the gods.'
    }
  },
  {
    titlePt: 'A História da Serpente',
    titleEn: 'The Serpent\'s Tale',
    featured: { glyph: '𓏞', translit: 'sš', meaningPt: 'o kit de escriba, escrita', meaningEn: 'the scribe kit, writing' },
    notePt: 'O Poe analisa este trecho como um espelhamento narrativo. A Serpente conta sua própria tragédia para mostrar ao marinheiro que ele não é o único a sofrer. Ela menciona que morava com setenta e cinco parentes antes de um desastre atingir a ilha.',
    noteEn: 'Poe analyzes this part as narrative mirroring. The Serpent tells its own tragedy to show the sailor he is not the only one suffering. It mentions living with seventy-five kin before a disaster struck the island.',
    storyPt: `<p class="dropcap">"A serpente contou-me, então, sua própria tristeza. Ela vivia naquela ilha com sua família de setenta e cinco serpentes ao todo. Mas um dia, enquanto ela estava fora, uma estrela caiu do céu e incendiou o lugar, consumindo todos os seus entes queridos. Ela sobreviveu sozinha, carregando a dor da perda, assim como eu.</p><p>Ela me prometeu: 'Se fores forte e controlares teu coração, abraçarás tua mulher e verás tua casa novamente.' Prostrei-me diante dela, prometendo enviar-lhe <span class="gloss" tabindex="0" onclick="openGlossaryAt('incenso')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('incenso')}">incensos</span> e perfumes preciosos do Egito quando eu voltasse. Mas a serpente apenas riu e disse: 'Tu não és rico em <span class="gloss" tabindex="0" onclick="openGlossaryAt('mirra')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('mirra')}">mirra</span> e <span class="gloss" tabindex="0" onclick="openGlossaryAt('incenso')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('incenso')}">incenso</span>, mas eu sou a Senhora de <span class="gloss" tabindex="0" onclick="openGlossaryAt('punt')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('punt')}">Punt</span>, e todos os perfumes me pertencem. Além disso, quando partires, esta ilha nunca mais será vista; ela afundará nas ondas.'"</p>`,
    storyEn: `<p class="dropcap">"The serpent then told me of its own sorrow. It had lived on that island with its family of seventy-five serpents in all. But one day, while it was away, a star fell from the sky and set the place ablaze, consuming all its beloved kin. It had survived alone, bearing the pain of loss, just as I had.</p><p>It promised me: 'If you are strong and master your heart, you will embrace your wife and see your home once more.' I prostrated myself before it, promising to send it <span class="gloss" tabindex="0" onclick="openGlossaryAt('incenso')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('incenso')}">incense</span> and precious perfumes from Egypt upon my return. But the serpent only laughed and said: 'You are not rich in <span class="gloss" tabindex="0" onclick="openGlossaryAt('mirra')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('mirra')}">myrrh</span> and <span class="gloss" tabindex="0" onclick="openGlossaryAt('incenso')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('incenso')}">incense</span>, but I am the Lady of <span class="gloss" tabindex="0" onclick="openGlossaryAt('punt')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('punt')}">Punt</span>, and all the perfumes belong to me. Moreover, when you depart, this island will never be seen again; it will sink beneath the waves.'"</p>`,
    question: {
      promptPt: 'O que aconteceu com a família da Serpente?',
      promptEn: 'What happened to the Serpent\'s family?',
      options: [
        { pt: 'Foram capturados por marinheiros', en: 'They were captured by sailors', correct: false },
        { pt: 'Uma estrela caiu e o fogo os consumiu', en: 'A star fell and fire consumed them', correct: true },
        { pt: 'Eles fugiram para outra ilha', en: 'They fled to another island', correct: false },
        { pt: 'Eles se tornaram estátuas de ouro', en: 'They became golden statues', correct: false },
      ],
      factPt: 'A queda da estrela é uma das primeiras menções literárias a um evento astronômico catastrófico.',
      factEn: 'The falling star is one of the earliest literary mentions of a catastrophic astronomical event.'
    }
  },
  {
    titlePt: 'O Resgate e Presentes',
    titleEn: 'The Rescue and Gifts',
    featured: { glyph: '𓊛', translit: 'dpt', meaningPt: 'barco, embarcação', meaningEn: 'boat, vessel' },
    notePt: 'A Serpente previu que um navio viria em quatro meses. Quando o navio chega, o marinheiro promete oferendas, mas a Serpente ri, dizendo que já possui todo o <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'incenso\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'incenso\')}">incenso</span> de <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'punt\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'punt\')}">Punt</span>. Ela pede apenas que ele fale bem dela em sua cidade.',
    noteEn: 'The Serpent predicted a ship would come in four months. When the ship arrives, the sailor promises offerings, but the Serpent laughs, saying it already owns all the <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'incenso\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'incenso\')}">incense</span> of <span class="gloss" tabindex="0" onclick="openGlossaryAt(\'punt\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'punt\')}">Punt</span>. It only asks that he speak well of it in his city.',
    storyPt: `<p class="dropcap">"E então o navio chegou, como ela predissera. Corri para a praia, subi numa árvore bem alta e reconheci os que estavam a bordo[...] Então ela me deu um carregamento de <span class="gloss" tabindex="0" onclick="openGlossaryAt('mirra')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('mirra')}">mirra</span>, <span class="gloss" tabindex="0" onclick="openGlossaryAt('kohl')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('kohl')}">kohl</span>, rabos de girafa, uma grande pilha de <span class="gloss" tabindex="0" onclick="openGlossaryAt('incenso')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('incenso')}">incenso</span>, presas de elefante, cães de caça, macacos e toda sorte de coisas preciosas."</p>`,
    storyEn: `<p class="dropcap">"And then the ship arrived, just as she had foretold. I ran to the shore, climbed a very tall tree, and recognized those on board […] Then she gave me a cargo of <span class="gloss" tabindex="0" onclick="openGlossaryAt('mirra')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('mirra')}">myrrh</span>, <span class="gloss" tabindex="0" onclick="openGlossaryAt('kohl')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('kohl')}">kohl</span>, giraffe tails, a great heap of <span class="gloss" tabindex="0" onclick="openGlossaryAt('incenso')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('incenso')}">incense</span>, elephant tusks, hunting dogs, monkeys, and all kinds of precious things."</p>`,
    question: {
      promptPt: 'O que a Serpente deu ao marinheiro ao partir?',
      promptEn: 'What did the Serpent give the sailor upon his departure?',
      options: [
        { pt: 'Ouro, prata e pedras preciosas', en: 'Gold, silver, and precious stones', correct: false },
        { pt: 'Kohl, incenso e toda sorte de coisas preciosas', en: 'Kohl, incense, and all kinds of precious things', correct: true },
        { pt: 'Armas, cavalos e carros de guerra', en: 'Weapons, horses, and war chariots', correct: false },
        { pt: 'Mapas e rotas de navegação', en: 'Maps and navigation routes', correct: false },
      ],
      factPt: '<span class="gloss" tabindex="0" onclick="openGlossaryAt(\'punt\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'punt\')}">Punt</span> era a região lendária de onde os egípcios importavam bens exóticos e incenso.',
      factEn: '<span class="gloss" tabindex="0" onclick="openGlossaryAt(\'punt\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openGlossaryAt(\'punt\')}">Punt</span> was the legendary region from which Egyptians imported exotic goods and incense.'
    }
  },
  {
    titlePt: 'O Fim da Jornada',
    titleEn: 'The End of the Journey',
    featured: { glyph: '𓉐', translit: 'pr', meaningPt: 'a casa, o lar', meaningEn: 'the house, the home' },
    notePt: 'A ilha desaparece no final, tornando-se água novamente. Arqueologicamente, isso simboliza a natureza efêmera do contato com o divino. A história termina com o capitão recusando o consolo, um toque de realismo literário raro.',
    noteEn: 'The island disappears at the end, becoming water again. Archaeologically, this symbolizes the ephemeral nature of contact with the divine. The story ends with the captain refusing consolation, a rare touch of literary realism.',
    storyPt: `<p class="dropcap">"Voltei ao Egito, fui recebido pelo Soberano e gratificado por minha jornada.</p><p>Portanto, meu senhor, ouça-me: é proveitoso escutar o que passei. Não se entregue ao desespero."</p><p>Mas o comandante, ainda amargurado, respondeu com tristeza: "Não tente ser tão otimista, meu amigo. Quem daria água a um ganso ao amanhecer, sabendo que ele será abatido ao entardecer?"</p>`,
    storyEn: `<p class="dropcap">"I returned to Egypt, was received by the Sovereign, and rewarded for my journey.</p><p>Therefore, my lord, hear me: it is worthwhile to listen to what I have been through. Do not give yourself to despair."</p><p>But the commander, still bitter, replied sadly: "Do not try to be so optimistic, my friend. Who would give water to a goose at dawn, knowing it will be slaughtered at dusk?"</p>`,
    question: {
      promptPt: 'Como termina o diálogo entre o marinheiro e o capitão?',
      promptEn: 'How does the dialogue between the sailor and the captain end?',
      options: [
        { pt: 'O capitão agradece o conselho', en: 'The captain thanks for the advice', correct: false },
        { pt: 'O capitão permanece cético', en: 'The captain remains skeptical', correct: true  },
        { pt: 'Eles celebram com um banquete', en: 'They celebrate with a banquet', correct: false },
        { pt: 'O Rei os recompensa com ouro', en: 'The King rewards them with gold', correct: false },
      ],
      factPt: 'O capitão encerra o conto com uma frase pessimista, indicando que palavras não mudam o destino.',
      factEn: 'The captain ends the tale with a pessimistic phrase, indicating words do not change fate.'
    }
  }
];

function setLang(lang) {
  ttsStop();
  state.lang = lang;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  const btnPt = document.getElementById('btn-pt');
  const btnEn = document.getElementById('btn-en');
  btnPt.classList.toggle('active', lang === 'pt');
  btnEn.classList.toggle('active', lang === 'en');
  btnPt.setAttribute('aria-pressed', lang === 'pt');
  btnEn.setAttribute('aria-pressed', lang === 'en');
  document.getElementById('brandText').textContent = t('brand');
  // Labels acessíveis dinâmicos
  const btnBack = document.getElementById('btnBack');
  if (btnBack) {
    btnBack.setAttribute('aria-label', t('back-to-library'));
    btnBack.setAttribute('title', t('back-to-library'));
  }
  const btnSound = document.getElementById('btnSound');
  if (btnSound) btnSound.setAttribute('aria-label', t('sound-label'));
  const btnCodex = document.getElementById('btnCodex');
  if (btnCodex) btnCodex.setAttribute('aria-label', t('codex-label') + ': ' + state.discoveredGlyphs.size + '/' + GLYPHS_CODEX.length);
  const codexLbl = document.getElementById('codexBtnLabel');
  if (codexLbl) codexLbl.textContent = t('codex-btn');
  const btnGlossary = document.getElementById('btnGlossary');
  if (btnGlossary) btnGlossary.setAttribute('aria-label', t('glossary-label'));
  const glossaryLbl = document.getElementById('glossaryBtnLabel');
  if (glossaryLbl) glossaryLbl.textContent = t('glossary-btn');
  // Toast strings
  const toastTitle = document.getElementById('toastTitle');
  const toastSub = document.getElementById('toastSub');
  if (toastTitle) toastTitle.textContent = t('discovery-title');
  if (toastSub) toastSub.textContent = t('discovery-sub');

  const invHud = document.getElementById('inventoryHud');
  if (invHud) invHud.setAttribute('aria-label', t('inventory-label'));
  for (let i = 0; i < ITEMS.length; i++) {
    const slot = document.getElementById(`slot-${i}`);
    if (slot) slot.setAttribute('title', lang === 'pt' ? ITEMS[i].pt : ITEMS[i].en);
  }
  if (state.modalView) renderModal();
  render();
}

function updateScoreHUD() {
  document.getElementById('scoreDisplay').textContent = state.score;
  document.querySelector('[data-i18n="score-label"]').textContent = t('score-label');
}

function updateInventoryUI() {
  const hud = document.getElementById('inventoryHud');
  if (state.screen === 'splash' || state.screen === 'intro' || state.screen === 'final') {
    hud.style.display = 'none';
  } else {
    hud.style.display = 'flex';
  }
  
  for(let i=0; i<8; i++) {
    const slot = document.getElementById(`slot-${i}`);
    if(slot) slot.classList.toggle('found', state.collected[i]);
  }
}

function renderProgress() {
  const bar = document.getElementById('progressBar');
  const total = CHAPTERS.length;
  let html = '<div class="progress-track">';
  for (let i = 0; i < total; i++) {
    const cls = i < state.chapter ? 'done' : (i === state.chapter ? 'current' : '');
    html += `<div class="progress-node ${cls}">${i + 1}</div>`;
    if (i < total - 1) html += `<div class="progress-dash ${i < state.chapter ? 'done' : ''}"></div>`;
  }
  html += '</div>';
  bar.innerHTML = html;
}

// ===== TOAST DE DESCOBERTA =====
let toastTimer = null;
function showDiscoveryToast(glyphIdx) {
  const g = GLYPHS_CODEX[glyphIdx];
  if (!g) return;
  const toast = document.getElementById('discoveryToast');
  const toastGlyph = document.getElementById('toastGlyph');
  const toastSub = document.getElementById('toastSub');
  if (!toast) return;
  toastGlyph.textContent = g.glyph;
  toastSub.textContent = (state.lang === 'pt' ? g.namePt : g.nameEn) + ' · ' + g.translit;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
  // Pulse no botão do códex
  state.codexHasNew = true;
  updateCodexButton();
}

function onToastClick() {
  document.getElementById('discoveryToast').classList.remove('show');
  if (toastTimer) clearTimeout(toastTimer);
  openCodex();
}

function updateCodexButton() {
  const btn = document.getElementById('btnCodex');
  if (!btn) return;
  btn.classList.toggle('has-new', state.codexHasNew);
}

// Descoberta com efeitos (toast + pulse)
function discoverGlyph(idx) {
  if (state.discoveredGlyphs.has(idx)) return;
  state.discoveredGlyphs.add(idx);
  updateCodexCount();
  // Só mostra toast se não estamos na tela inicial
  if (state.screen !== 'splash') {
    showDiscoveryToast(idx);
  }
}

function render() {
  const root = document.getElementById('sceneContainer');
  const moveFocus = root.contains(document.activeElement);
  const progBar = document.getElementById('progressBar');
  const scoreHud = document.getElementById('scoreHud');
  const btnCodex = document.getElementById('btnCodex');
  const btnGlossary = document.getElementById('btnGlossary');

  if (state.screen === 'splash') {
    progBar.style.display = 'none';
    scoreHud.style.display = 'none';
    if (btnCodex) btnCodex.style.display = 'none';
    if (btnGlossary) btnGlossary.style.display = 'none';
    updateInventoryUI();
    root.innerHTML = renderSplash();
  } else {
    progBar.style.display = 'block';
    scoreHud.style.display = 'block';
    if (btnCodex) btnCodex.style.display = 'inline-flex';
    if (btnGlossary) btnGlossary.style.display = 'inline-flex';
    updateScoreHUD();
    updateInventoryUI();
    updateCodexCount();
    renderProgress();

    const ch = CHAPTERS[state.chapter];
    if (state.screen === 'intro')           root.innerHTML = renderIntro();
    else if (state.screen === 'final')      root.innerHTML = renderFinal();
    else if (state.screen === 'story')      root.innerHTML = renderStory(ch);
    else if (state.screen === 'minigame') { root.innerHTML = renderMinigame(ch); attachMinigame(ch); }
  }

  saveState();
  if (moveFocus) root.focus();
}

function renderSplash() {
  const title = state.lang === 'pt' ? 'A Ilha e a Serpente' : 'The Island & The Serpent';
  const name = getPlayerName();
  const greeting = name
    ? `<p style="font-family:'EB Garamond','Noto Serif',serif; font-style:italic; color:var(--papyrus-soft); font-size:16px; margin-bottom:44px;">${t('splash-welcome')}<strong>${escapeHtml(name)}</strong></p>`
    : '';
  return `
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:70vh; text-align:center;">
      <div aria-hidden="true" style="font-family:'Noto Sans Egyptian Hieroglyphs', sans-serif; font-size:110px; color:var(--gold); margin-bottom: 10px;">𓊛</div>
      <h1 style="font-family:'Cinzel', serif; font-size:clamp(32px, 6vw, 64px); color:var(--gold); margin-bottom: 8px;">${title}</h1>
      <p style="font-family:'Cinzel', serif; color:var(--terracotta-lt); letter-spacing:0.3em; font-size:12px; margin-bottom: 16px;">${t('splash-subtitle')}</p>
      <p style="font-family:'EB Garamond','Noto Serif',serif; font-style:italic; color:var(--papyrus-dim); font-size:15px; max-width:480px; line-height:1.6; margin-bottom: ${name ? '16px' : '44px'};">${t('splash-desc')}</p>
      ${greeting}
      <button class="btn gold" onclick="enterGame()">${t('enter')} →</button>
    </div>`;
}

function enterGame() {
  const audio = document.getElementById('bgMusic');
  if (audio) { audio.volume = 0.5; audio.play().catch(() => {}); }
  if (resumeScreen) {
    state.screen = resumeScreen;
    resumeScreen = null;
  } else {
    state.screen = 'intro';
  }
  if (!state.discoveredGlyphs.has(0)) state.discoveredGlyphs.add(0);
  updateCodexCount();
  render();
}

function renderIntro() {
  return `
    <div class="scene">
      <div class="chapter-label">${t('intro-kicker')}</div>
      <h1 class="title">${t('intro-title')}</h1>
      <div class="glyph-feature" data-kicker="ANKH · ${state.lang === 'pt' ? 'A VIDA' : 'LIFE'}">
        <div class="big-glyph" aria-hidden="true">𓋹</div>
        <div class="translit">ꜥnḫ</div>
        <div class="meaning">${t('ankh-meaning')}</div>
      </div>
      <p class="story">${t('intro-desc')}</p>
      <div class="actions"><button class="btn gold" onclick="startGame()">${t('begin')} →</button></div>
    </div>`;
}

function renderStory(ch) {
  const title = state.lang === 'pt' ? ch.titlePt : ch.titleEn;
  const body = state.lang === 'pt' ? ch.storyPt : ch.storyEn;
  const note = state.lang === 'pt' ? ch.notePt : ch.noteEn;
  const f = ch.featured;
  // Descobrir o signo deste capítulo no Códice (com toast)
  const glyphIdx = GLYPHS_CODEX.findIndex(g => g.chapter === state.chapter);
  if (glyphIdx !== -1) {
    discoverGlyph(glyphIdx);
  }
  return `
    <div class="scene">
      <div class="chapter-label">${t('chapter')} ${state.chapter + 1}</div>
      <h1 class="title">${title}</h1>
      <div class="glyph-feature" data-kicker="${t('chapter-glyph')}">
        <div class="big-glyph" aria-hidden="true">${f.glyph}</div>
        <div class="translit">${f.translit}</div>
        <div class="meaning">${state.lang === 'pt' ? f.meaningPt : f.meaningEn}</div>
      </div>
      <div class="story">${body}</div>

<button class="note-toggle" id="btnNote" onclick="toggleNote()">
        ${t('note-open')}
      </button>
      <div class="archaeo-note" id="archaeoNote">
        <strong>${t('context-label')}</strong>
        ${note}
      </div>

      <div class="actions"><button class="btn" onclick="goMinigame()">${t('challenge')} →</button></div>
    </div>`;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderMinigame(ch) {
  const q = ch.question;
  const prompt = state.lang === 'pt' ? q.promptPt : q.promptEn;
  state.shuffledOptions = shuffleArray(q.options);
  return `
    <div class="scene">
      <div class="chapter-label">${t('challenge-count')} ${state.chapter + 1}/8</div>
      <div class="minigame-intro"><div class="question">${prompt}</div></div>
      <div class="choices" id="choicesWrap" role="group" aria-label="${prompt}">
        ${state.shuffledOptions.map((o, idx) => {
          const isGlyph = q.optionsType === 'glyph';
          const label = isGlyph ? ` aria-label="${escapeHtml(state.lang === 'pt' ? (o.namePt || o.glyph) : (o.nameEn || o.glyph))}"` : '';
          const content = isGlyph
            ? `<div aria-hidden="true" style="font-family:'Noto Sans Egyptian Hieroglyphs', sans-serif; font-size:40px;">${o.glyph}</div>`
            : (state.lang === 'pt' ? o.pt : o.en);
          return `<button type="button" class="choice" data-idx="${idx}"${label}>${content}</button>`;
        }).join('')}
      </div>
      <div id="feedbackSlot" aria-live="polite"></div>
      <div class="actions" id="actionSlot"></div>
    </div>`;
}

function attachMinigame(ch) {
  state.answered = false;
  state.attempts = 0;
  const q = ch.question;
  document.querySelectorAll('.choice').forEach(el => {
    el.onclick = () => {
      if (state.answered) return;
      const idx = +el.dataset.idx;
      const option = state.shuffledOptions[idx];
      if (option.correct) {
        el.classList.add('correct');
        playFeedback('correct');
        onAnswer(true, q, state.attempts === 0);
      } else {
        el.classList.add('wrong');
        playFeedback('wrong');
        if (window.Research) Research.trackAttempt();
        state.attempts++;
        const msg = state.chapter === 4 ? t('wrong-serpent') : t('wrong-default');
        document.getElementById('feedbackSlot').innerHTML = `<div class="feedback danger"><strong class="label">${t('warning')}</strong>${msg}</div>`;
        setTimeout(() => el.classList.remove('wrong'), 700);
      }
    };
  });
}

function onAnswer(isCorrect, q, firstTry) {
  state.answered = true;
  const earned = firstTry ? 20 : (state.attempts === 1 ? 10 : (state.attempts === 2 ? 5 : 2));
  state.score += earned;
  
  if(firstTry) {
    state.collected[state.chapter] = true;
  }

  const fact = state.lang === 'pt' ? q.factPt : q.factEn;
  const itemName = state.lang === 'pt' ? ITEMS[state.chapter].pt : ITEMS[state.chapter].en;
  const collectionMsg = firstTry ? `<br><b>${t('treasure-got')}: ${itemName}!</b>` : '';
  
  document.getElementById('feedbackSlot').innerHTML = `<div class="feedback good"><strong class="label">${t('correct')}</strong>+${earned} ${t('points')}. ${collectionMsg} <div style="margin-top:8px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px; font-style:italic;">${fact}</div></div>`;
  const isLast = state.chapter >= CHAPTERS.length - 1;
  
  updateInventoryUI();
  
  const nextLabel = isLast ? t('see-final') : t('next-chapter');
  document.getElementById('actionSlot').innerHTML = `<button class="btn gold" onclick="${isLast ? 'goFinal()' : 'nextChapter()'}">${nextLabel} →</button>`;
  saveState();
}

function startGame() { state.chapter = 0; state.screen = 'story'; state.score = 0; state.collected = [false, false, false, false, false, false, false, false]; render(); scrollTop(); }
function restartGame() { state.chapter = 0; state.screen = 'splash'; state.score = 0; state.answered = false; state.attempts = 0; state.collected = [false, false, false, false, false, false, false, false]; state.discoveredGlyphs = new Set(); state.codexHasNew = false; saveState(); render(); scrollTop(); }
function goMinigame() { ttsStop(); state.screen = 'minigame'; render(); scrollTop(); }
function nextChapter() { ttsStop(); state.chapter++; state.screen = 'story'; render(); scrollTop(); }
function goFinal() {
  ttsStop();
  state.screen = 'final';
  if (window.Research) Research.trackComplete({
    storyId:  'naufrago',
    score:    state.score,
    maxScore: CHAPTERS.length * 20,
    lang:     state.lang,
  });
  render();
  scrollTop();
}

function renderFinal() {
  const max = CHAPTERS.length * 20;
  const pct = state.score / max;
  let rank = pct >= 0.9 ? t('rank-master')
           : pct >= 0.7 ? t('rank-scribe')
           : pct >= 0.4 ? t('rank-student')
           : t('rank-apprentice');
  
  let treasuresHtml = '';
  const hasTreasures = state.collected.some(c => c);
  
  if (hasTreasures) {
    treasuresHtml = `
      <div style="margin-top: 30px;">
        <div class="chapter-label">${t('final-inventory')}</div>
        <div class="final-treasures">
          ${state.collected.map((c, i) => c ? `<div class="treasure-item"><span class="treasure-icon" aria-hidden="true">${ITEMS[i].icon}</span><span class="treasure-label">${state.lang === 'pt' ? ITEMS[i].pt : ITEMS[i].en}</span></div>` : '').join('')}
        </div>
      </div>
    `;
  }

  const playerName = getPlayerName();
  const congratsHtml = playerName
    ? `<p style="font-family:'EB Garamond','Noto Serif',serif; font-style:italic; color:var(--papyrus-soft); font-size:18px; margin-bottom:6px;">${t('final-congrats')}<strong>${escapeHtml(playerName)}</strong>!</p>`
    : '';

  return `<div class="scene" style="text-align:center;">
    ${congratsHtml}
    <h1 class="title">${t('final-title')}</h1>
    <div class="glyph-feature" data-kicker="${t('final-rank-kicker')}">
      <div class="big-glyph" aria-hidden="true">𓏞</div>
      <div class="translit">sš</div>
      <div class="meaning">${t('final-rank-meaning')}</div>
    </div>
    <div style="font-size:48px; color:var(--gold); font-family:Cinzel;">${state.score} / ${max}</div>
    <div class="final-rank">✦ ${rank} ✦</div>
    
    ${treasuresHtml}

    <div class="actions"><button class="btn ghost" onclick="restartGame()">${t('play-again-btn')}</button><a href="index.html" class="btn ghost">${t('back-to-library')}</a></div>
    <div class="credits">
      <strong>${t('credits-title')}</strong>
      <span style="font-size:13px; color:var(--papyrus-dim); line-height:1.4;">${t('credits-body')}</span>
    </div>
  </div>`;
}

// ───── ELEVENLABS TTS ─────
const TTS_PROXY = 'http://localhost:3001/api/tts';

const ttsCache = {};   // { 'chap_lang': objectURL }
let ttsAudio   = null;
let ttsStatus  = 'idle'; // 'idle' | 'loading' | 'playing' | 'paused'

function ttsPlainText(html) {
  const d = document.createElement('div');
  d.innerHTML = html;
  d.querySelectorAll('i').forEach(el => el.remove());
  return (d.textContent || d.innerText || '').replace(/\s+/g, ' ').trim();
}

function ttsSync() {
  const btn = document.getElementById('ttsBtn');
  if (!btn) return;
  const icon  = btn.querySelector('.tts-icon');
  const label = btn.querySelector('.tts-label');
  const pt    = state.lang === 'pt';
  const map   = {
    idle:    { icon: '▶', pt: 'Ouvir',    en: 'Listen'   },
    loading: { icon: '…', pt: 'Gerando…', en: 'Loading…' },
    playing: { icon: '⏸', pt: 'Pausar',   en: 'Pause'    },
    paused:  { icon: '▶', pt: 'Retomar',  en: 'Resume'   },
  };
  const c = map[ttsStatus] || map.idle;
  icon.textContent  = c.icon;
  label.textContent = pt ? c.pt : c.en;
  btn.classList.toggle('playing', ttsStatus === 'playing');
  btn.classList.toggle('loading', ttsStatus === 'loading');
  btn.disabled = ttsStatus === 'loading';
}

function ttsStop() {
  if (ttsAudio) { ttsAudio.pause(); ttsAudio = null; }
  ttsStatus = 'idle';
  ttsSync();
}

async function ttsToggle() {
  if (ttsStatus === 'playing') {
    ttsAudio.pause();
    ttsStatus = 'paused';
    ttsSync();
    return;
  }
  if (ttsStatus === 'paused' && ttsAudio) {
    await ttsAudio.play();
    ttsStatus = 'playing';
    ttsSync();
    return;
  }
  ttsStop();
  ttsStatus = 'loading';
  ttsSync();
  const ch   = CHAPTERS[state.chapter];
  const html = state.lang === 'pt' ? ch.storyPt : ch.storyEn;
  const key  = `${state.chapter}_${state.lang}`;
  try {
    let url = ttsCache[key];
    if (!url) {
      const res = await fetch(TTS_PROXY, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ text: ttsPlainText(html) }),
      });
      if (!res.ok) { const msg = await res.text().catch(() => ''); throw new Error(`TTS ${res.status}: ${msg}`); }
      url = URL.createObjectURL(await res.blob());
      ttsCache[key] = url;
    }
    ttsAudio = new Audio(url);
    ttsAudio.onplay  = () => { ttsStatus = 'playing'; ttsSync(); };
    ttsAudio.onpause = () => { if (ttsAudio && !ttsAudio.ended) { ttsStatus = 'paused'; ttsSync(); } };
    ttsAudio.onended = () => { ttsStatus = 'idle';    ttsSync(); };
    ttsAudio.onerror = () => { ttsStatus = 'idle';    ttsSync(); };
    await ttsAudio.play();
  } catch (e) {
    console.error('TTS:', e);
    ttsStatus = 'idle';
    ttsSync();
    alert(state.lang === 'pt'
      ? 'Não foi possível gerar o áudio. Tente novamente.'
      : 'Could not generate audio. Please try again.');
  }
}

function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ============================================================
// BANCO DE SIGNOS DO CODEX
// ============================================================
const GLYPHS_CODEX = [
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
];
