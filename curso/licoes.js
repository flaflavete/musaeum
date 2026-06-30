/* Curso de Hieróglifos (rebuild) — fonte única de dados das lições.
   Consumida pelo índice (index.html) e pelo motor (licao.html via curso.js).
   Acaba com a duplicação tripla do curso antigo: cada lição é dados, não HTML.

   Modelo de uma lição:
   {
     id, num, glyph,
     ready: true,                      // false = ainda não construída (aparece bloqueada no índice)
     kicker, title, desc, dur, type,   // {pt,en} — usados no índice e no hero
     badge, badgeClass,                // selo do índice
     intro,                            // {pt,en} — parágrafo do hero da lição
     sections: [ { title:{pt,en}, blocks:[...] } ],
     quiz: { glyph, question, options:[{label,correct}], feedbackOk, feedbackErr }
   }

   Tipos de bloco (kind):
   - 'p'          { html:{pt,en} }                         parágrafo (HTML inline permitido)
   - 'callout'    { variant:'gold'|'azul', html:{pt,en} }  destaque
   - 'signtypes'  { cards:[{badge,variant,glyph,title,desc}] }
   - 'word'       { label:{pt,en}, signs:[{glyph,id,phon,type,tip}], result?, note }
   - 'direction'  { rows:[{label,glyphs,rtl,arrow}] }
   Exemplos extraídos de vocabulário padrão e bem atestado (Gardiner/Faulkner). */

window.CURSO_LICOES = [
  {
    id: 'sistema',
    num: 1,
    glyph: '𓁹',
    ready: true,
    kicker: { pt: 'Lição 1 · Fundamentos', en: 'Lesson 1 · Foundations' },
    title:  { pt: 'Como funciona a escrita egípcia', en: 'How Egyptian writing works' },
    desc:   { pt: 'Entenda os três tipos de sinais (fonéticos, logogramas, determinativos) e a lógica do sistema antes de qualquer símbolo.', en: 'Understand the three types of signs (phonetic, logogram, determinative) and the logic of the system before any individual symbol.' },
    dur:    { pt: '~10 min', en: '~10 min' },
    type:   { pt: 'Teoria', en: 'Theory' },
    badge:  { pt: 'Começar aqui', en: 'Start here' },
    badgeClass: 'badge-start',
    intro:  { pt: 'Antes de decorar qualquer sinal, você precisa entender a lógica do sistema. A escrita hieroglífica não é um simples alfabeto, pois combina três tipos de sinais de formas que, uma vez compreendidas, tornam tudo mais fácil.', en: 'Before memorizing any sign, you need to understand the logic of the system. Hieroglyphic writing is not a simple alphabet; it combines three types of signs in ways that, once understood, make everything much easier.' },
    sections: [
      {
        title: { pt: 'Hieróglifos não são letras', en: 'Hieroglyphs are not letters' },
        blocks: [
          { kind: 'p', html: { pt: 'O nome <em>hieróglifo</em> vem do grego: <em>hieros</em> (sagrado) + <em>glyphe</em> (gravura). Os próprios egípcios chamavam sua escrita de <strong>mdw nṯr</strong>, que significa "palavras de deus".', en: 'The name <em>hieroglyph</em> comes from Greek: <em>hieros</em> (sacred) + <em>glyphe</em> (carving). The Egyptians themselves called their writing <strong>mdw nṯr</strong>, meaning "words of god".' } },
          { kind: 'p', html: { pt: 'Diferente do nosso alfabeto, onde cada letra representa um som, os hieróglifos funcionam em três camadas ao mesmo tempo. Um sinal pode representar um <strong>som</strong>, uma <strong>palavra inteira</strong> ou simplesmente <strong>categorizar</strong> o que veio antes, sem ter som próprio.', en: 'Unlike our alphabet, where each letter represents a sound, hieroglyphs work on three levels at once. A sign can represent a <strong>sound</strong>, an <strong>entire word</strong>, or simply <strong>categorize</strong> what came before, without having a sound of its own.' } },
          { kind: 'callout', variant: 'gold', html: { pt: 'Imagine que no português, a palavra "sol" pudesse ser escrita de três maneiras. Com o desenho de um sol ☀ (lógico), com as letras S-O-L (fonético), ou com um sol sem som para classificar algo luminoso (determinativo). Os egípcios misturavam tudo isso.', en: 'Imagine that in English, the word "sun" could be written three ways. With a drawing of a sun ☀ (logographic), with the letters S-U-N (phonetic), or with a silent sun to classify something luminous (determinative). The Egyptians mixed all of these.' } },
        ],
      },
      {
        title: { pt: 'Os três tipos de sinais', en: 'The three types of signs' },
        blocks: [
          { kind: 'signtypes', cards: [
            { badge: { pt: 'Fonéticos', en: 'Phonetic' }, variant: 'uni', glyph: '𓄿', title: { pt: 'Sinais fonéticos', en: 'Phonetic signs' }, desc: { pt: 'Representam sons de uma, duas ou três consoantes. São como as letras do nosso alfabeto.', en: 'Represent one, two, or three consonants. They function like the letters of our alphabet.' } },
            { badge: { pt: 'Logograma', en: 'Logogram' }, variant: 'bi', glyph: '𓇳', title: { pt: 'Logogramas', en: 'Logograms' }, desc: { pt: 'Representam a palavra inteira pelo próprio desenho. O sol 𓇳 pode simplesmente significar "sol" ou "dia".', en: 'Represent an entire word through the picture itself. The sun 𓇳 can simply mean "sun" or "day".' } },
            { badge: { pt: 'Determinativo', en: 'Determinative' }, variant: 'det', glyph: '𓀀', title: { pt: 'Determinativos', en: 'Determinatives' }, desc: { pt: 'Não têm som. Aparecem no final de palavras para indicar a categoria semântica (animal, pessoa, deus, ação).', en: 'Have no sound. They appear at the end of words to indicate the semantic category (animal, person, god, action).' } },
          ] },
          { kind: 'p', html: { pt: 'Na prática, a maioria das palavras egípcias combina sinais fonéticos (para soletrar) com um determinativo no final (para classificar). Isso ajudava a diferenciar palavras que soariam igual.', en: 'In practice, most Egyptian words combine phonetic signs (for spelling) with a determinative at the end (for classification). This helped distinguish words that would sound alike.' } },
        ],
      },
      {
        title: { pt: 'Veja na prática: a palavra <em>nfr</em>', en: 'See it in practice: the word <em>nfr</em>' },
        blocks: [
          { kind: 'p', html: { pt: 'A palavra <strong>nfr</strong> (pronunciada aproximadamente "nefer") significa "belo, bom, perfeito". É uma das mais comuns em textos egípcios. Veja como ela é escrita:', en: 'The word <strong>nfr</strong> (pronounced approximately "nefer") means "beautiful, good, perfect". It is one of the most common in Egyptian texts. See how it is written:' } },
          { kind: 'word', label: { pt: 'Passe o mouse sobre o sinal', en: 'Hover over the sign' },
            signs: [
              { glyph: '𓄤', id: 'F35', phon: 'nfr', type: 'bi', typeLabel: { pt: 'trilítero', en: 'triliteral' }, tip: { pt: '𓄤 nfr, coração com traqueia · representa as três consoantes N-F-R', en: '𓄤 nfr, heart with trachea · represents the three consonants N-F-R' } },
            ],
            note: { pt: 'Neste caso, um único sinal, o coração com traqueia, que representa as três consoantes <em>nfr</em> de uma vez. É um <strong>trilítero</strong>.', en: 'In this case, a single sign, the heart with trachea, represents the three consonants <em>nfr</em> at once. It is a <strong>triliteral</strong>.' } },
          { kind: 'p', html: { pt: 'Mas o egípcio frequentemente adiciona sinais complementares para reforçar a leitura:', en: 'But Egyptian frequently adds complementary signs to reinforce the reading:' } },
          { kind: 'word', label: { pt: 'Escrita completa de nfr', en: 'Full writing of nfr' },
            signs: [
              { glyph: '𓄤', id: 'F35', phon: 'nfr', type: 'bi', typeLabel: { pt: 'trilítero', en: 'triliteral' }, tip: { pt: '𓄤 nfr, o sinal principal (três consoantes de uma vez)', en: '𓄤 nfr, the main sign (three consonants at once)' } },
              { glyph: '𓆑', id: 'I9', phon: 'f', type: 'uni', typeLabel: { pt: 'unilítero', en: 'uniliteral' }, tip: { pt: '𓆑 f, cobra cornuda · confirma o som F de nfr', en: '𓆑 f, horned viper · confirms the F sound of nfr' } },
              { glyph: '𓂋', id: 'D21', phon: 'r', type: 'uni', typeLabel: { pt: 'unilítero', en: 'uniliteral' }, tip: { pt: '𓂋 r, boca · confirma o som R de nfr', en: '𓂋 r, mouth · confirms the R sound of nfr' } },
            ],
            result: '𓄤𓆑𓂋',
            note: { pt: 'Os sinais 𓆑 (f) e 𓂋 (r) são <strong>complementos fonéticos</strong> que não adicionam novos sons, apenas confirmam a leitura do sinal principal. É como se o egípcio "soletrasse" parte da palavra novamente para não deixar dúvida.', en: 'The signs 𓆑 (f) and 𓂋 (r) are <strong>phonetic complements</strong> that add no new sounds; they only confirm the reading of the main sign. It is as if Egyptian "spelled out" part of the word again to leave no doubt.' } },
          { kind: 'callout', variant: 'azul', html: { pt: 'A <strong>regra prática</strong> é simples. Quando você ver um sinal grande seguido de sinais menores com sons que já estão no sinal grande, esses menores são complementos fonéticos; leia o sinal grande uma vez e não repita os sons.', en: 'The <strong>practical rule</strong> is simple. When you see a large sign followed by smaller signs whose sounds are already contained in the large sign, those smaller ones are phonetic complements; read the large sign once and do not repeat the sounds.' } },
        ],
      },
      {
        title: { pt: 'Direção da leitura', en: 'Reading direction' },
        blocks: [
          { kind: 'p', html: { pt: 'Os hieróglifos podem ser escritos da direita para a esquerda, da esquerda para a direita, ou de cima para baixo. Como saber para onde ler?', en: 'Hieroglyphs can be written from right to left, from left to right, or from top to bottom. How do you know which way to read?' } },
          { kind: 'p', html: { pt: '<strong>Observe os animais e pessoas.</strong> Eles sempre olham para o início da linha. A direção que os rostos encaram é por onde você começa a ler.', en: '<strong>Observe the animals and people.</strong> They always face the beginning of the line. The direction the faces are looking is where you start reading.' } },
          { kind: 'direction', rows: [
            { label: { pt: '← direita p/ esquerda', en: '← right to left' }, glyphs: '𓀀𓂋𓈖', rtl: true, arrow: { pt: '← começar aqui', en: '← start here' } },
            { label: { pt: '→ esquerda p/ direita', en: '→ left to right' }, glyphs: '𓀁𓂋𓈖', rtl: false, arrow: { pt: 'começar aqui →', en: 'start here →' } },
          ] },
          { kind: 'p', html: { pt: 'Seja em textos religiosos e monumentais ou em papiros e textos cotidianos, a direção variava. O importante é seguir <strong>sempre os rostos.</strong>', en: 'Whether in religious and monumental texts or in papyri and everyday texts, the direction varied. The important thing is to always follow <strong>the faces.</strong>' } },
        ],
      },
      {
        title: { pt: 'Vogais: onde estão?', en: 'Vowels: where are they?' },
        blocks: [
          { kind: 'p', html: { pt: 'O egípcio antigo, como o árabe e o hebraico, escrevia apenas as <strong>consoantes</strong>. As vogais eram omitidas e o leitor nativo as deduzia pelo contexto.', en: 'Ancient Egyptian, like Arabic and Hebrew, wrote only the <strong>consonants</strong>. Vowels were omitted and the native reader deduced them from context.' } },
          { kind: 'p', html: { pt: 'Isso significa que quando você lê <em>nfr</em>, não sabe ao certo como soava. Linguistas adicionam vogais convencionais (como <em>nefer</em>) para facilitar a pronúncia, mas essa não é a pronúncia original.', en: 'This means that when you read <em>nfr</em>, you do not know exactly how it sounded. Linguists add conventional vowels (such as <em>nefer</em>) to facilitate pronunciation, but that is not the original pronunciation.' } },
          { kind: 'callout', variant: 'gold', html: { pt: 'Na prática, não precisa se preocupar em pronunciar "certo". A comunidade de estudo usa <em>e</em> entre consoantes como convenção (<em>nefer</em>, <em>remen</em>). O foco real é reconhecer os sinais e as consoantes.', en: 'In practice, you do not need to worry about pronouncing it "correctly". The scholarly community uses <em>e</em> between consonants as a convention (<em>nefer</em>, <em>remen</em>). The real focus is on recognizing the signs and the consonants.' } },
        ],
      },
    ],
    quiz: {
      glyph: '𓀀',
      question: { pt: 'Este sinal aparece ao final de uma palavra sem ter som próprio, apenas para indicar que a palavra é sobre uma pessoa. Que tipo de sinal é este?', en: 'This sign appears at the end of a word without having a sound of its own, only to indicate that the word is about a person. What type of sign is this?' },
      options: [
        { label: { pt: 'Unilítero (representa um único som)', en: 'Uniliteral (represents a single sound)' }, correct: false },
        { label: { pt: 'Logograma (representa a palavra "homem")', en: 'Logogram (represents the word "man")' }, correct: false },
        { label: { pt: 'Determinativo (classifica a palavra sem som)', en: 'Determinative (classifies the word without sound)' }, correct: true },
        { label: { pt: 'Complemento fonético (reforça a leitura)', en: 'Phonetic complement (reinforces the reading)' }, correct: false },
      ],
      feedbackOk: { pt: 'Exato! Determinativos não têm som; eles apenas classificam. O sinal de homem sentado 𓀀 é um dos determinativos mais comuns, aparecendo em qualquer palavra relacionada a seres masculinos.', en: 'Exactly! Determinatives have no sound; they only classify. The seated man sign 𓀀 is one of the most common determinatives, appearing in any word related to male beings.' },
      feedbackErr: { pt: 'Não desta vez. Quando um sinal aparece sem som ao final de uma palavra para categorizar, ele é um determinativo.', en: 'Not this time. When a sign appears without sound at the end of a word to categorize, it is a determinative.' },
    },
  },

  /* As lições abaixo ainda serão construídas no rebuild. Ficam listadas no índice
     como "em breve" até receberem ready:true + sections/quiz. */
  {
    id: 'unileteros', num: 2, glyph: '𓄿', ready: false,
    kicker: { pt: 'Lição 2 · Fonética', en: 'Lesson 2 · Phonetics' },
    title:  { pt: 'Os 24 unilíteros', en: 'The 24 uniliterals' },
    desc:   { pt: 'O "alfabeto" do egípcio: cada sinal representa uma única consoante. A base de tudo que vem depois.', en: 'The Egyptian "alphabet": each sign represents a single consonant. The foundation of everything that follows.' },
    dur:    { pt: '~20 min', en: '~20 min' }, type: { pt: '24 sinais', en: '24 signs' },
    badge:  { pt: 'Em breve', en: 'Soon' }, badgeClass: 'badge-soon',
  },
  {
    id: 'bi-tri', num: 3, glyph: '𓅱', ready: false,
    kicker: { pt: 'Lição 3 · Fonética', en: 'Lesson 3 · Phonetics' },
    title:  { pt: 'Bilíteros e trilíteros', en: 'Biliterals and triliterals' },
    desc:   { pt: 'Sinais de duas e três consoantes e os complementos fonéticos que confirmam a leitura.', en: 'Two- and three-consonant signs and the phonetic complements that confirm the reading.' },
    dur:    { pt: '~25 min', en: '~25 min' }, type: { pt: 'Fonética', en: 'Phonetics' },
    badge:  { pt: 'Em breve', en: 'Soon' }, badgeClass: 'badge-soon',
  },
  {
    id: 'palavras', num: 4, glyph: '𓂋', ready: false,
    kicker: { pt: 'Lição 4 · Vocabulário', en: 'Lesson 4 · Vocabulary' },
    title:  { pt: 'Montar palavras reais', en: 'Building real words' },
    desc:   { pt: 'Combine os sinais no construtor para ler palavras frequentes do egípcio clássico.', en: 'Combine signs in the builder to read frequent words of classical Egyptian.' },
    dur:    { pt: '~30 min', en: '~30 min' }, type: { pt: 'Construtor', en: 'Builder' },
    badge:  { pt: 'Em breve', en: 'Soon' }, badgeClass: 'badge-soon',
  },
  {
    id: 'cartuchos', num: 5, glyph: '𓇳', ready: false,
    kicker: { pt: 'Lição 5 · Cartuchos', en: 'Lesson 5 · Cartouches' },
    title:  { pt: 'Cartuchos e os nomes do rei', en: 'Cartouches and the king\'s names' },
    desc:   { pt: 'O cartucho, os nomes reais e como ler nomes de faraó.', en: 'The cartouche, the royal names, and how to read pharaoh names.' },
    dur:    { pt: '~20 min', en: '~20 min' }, type: { pt: 'Cartuchos', en: 'Cartouches' },
    badge:  { pt: 'Em breve', en: 'Soon' }, badgeClass: 'badge-soon',
  },
  {
    id: 'texto', num: 6, glyph: '𓏛', ready: false,
    kicker: { pt: 'Lição 6 · Leitura', en: 'Lesson 6 · Reading' },
    title:  { pt: 'Ler um texto curto', en: 'Reading a short text' },
    desc:   { pt: 'O capstone: juntar tudo e ler um texto curto, palavra a palavra.', en: 'The capstone: put it all together and read a short text, word by word.' },
    dur:    { pt: '~30 min', en: '~30 min' }, type: { pt: 'Capstone', en: 'Capstone' },
    badge:  { pt: 'Em breve', en: 'Soon' }, badgeClass: 'badge-soon',
  },
];
