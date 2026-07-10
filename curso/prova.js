/* Prova do Módulo 1 — banco de questões (fonte única).
   Consumida pelo motor da prova (prova.html via curso.js). É o porteiro entre
   o Módulo 1 (as 6 lições de "Primeiros passos") e o que vier depois: sorteia
   DRAW questões do banco, aprova com PASS de acerto, retentativa livre. Cada
   questão traz o número da lição (`lesson`) para o motor sugerir "revise a
   Lição X" ao errar. Prova de CONSULTA ABERTA: o cabeçalho linka a Lista de
   Gardiner, por isso as questões podem ser um degrau acima do quiz da lição.

   RIGOR (regra da casa): só entra fato atestado (Gardiner/Faulkner/Allen) e só
   se cobra o que as lições 1 a 6 ensinam. Sinais são referenciados por ID do
   Gardiner e o glifo é puxado de gardiner/ no motor (grids, paletas, pares);
   o `glyph` solto de uma questão (o ícone do enunciado) segue o padrão do quiz
   das lições. Sem travessão em nenhum texto; datação AEC/BCE.

   Tipos de questão (kind):
   - 'mc'    múltipla escolha
             { glyph, q, options:[{label,correct}], fbOk, fbErr }
   - 'fill'  completar a leitura: uma cadeia de sinais com um vão na
             transliteração; escolha o que preenche
             { glyph, q, translit (com ___), options:[{label,correct}], fbOk, fbErr }
   - 'build' construtor: monte a palavra clicando os sinais na ordem
             { prompt, meaning, translit, palette:[ids], answer:[ids], cartouche?, note }
   - 'order' ordenar: coloque os sinais na ordem de escrita
             { prompt, translit, answer:[ids], cartouche?, note }
   - 'match' parear: case cada sinal com o seu valor
             { prompt, pairs:[{ id, label }] }
   Campos de texto são { pt, en }. */

window.CURSO_PROVA = {
  id: 'prova-1',
  glyph: '𓏞',
  pass: 0.7,   // aprova com 70% (7 de 10)
  draw: 10,    // sorteia 10 do banco a cada tentativa
  kicker: { pt: 'Teste · Módulo 1', en: 'Test · Module 1' },
  title:  { pt: 'Teste dos primeiros passos', en: 'First steps test' },

  questions: [
    /* ── Lição 1: como o sistema funciona ─────────────── */
    {
      kind: 'mc', lesson: 1, glyph: '𓀀',
      q: { pt: 'Um sinal aparece no fim de uma palavra, sem som próprio, só para indicar que ela trata de uma pessoa. Que tipo de sinal é esse?', en: 'A sign appears at the end of a word, with no sound of its own, only to show the word is about a person. What type of sign is it?' },
      options: [
        { label: { pt: 'Determinativo (classifica, sem som)', en: 'Determinative (classifies, no sound)' }, correct: true },
        { label: { pt: 'Unilítero (uma consoante)', en: 'Uniliteral (one consonant)' }, correct: false },
        { label: { pt: 'Logograma (a palavra inteira)', en: 'Logogram (the whole word)' }, correct: false },
        { label: { pt: 'Complemento fonético', en: 'Phonetic complement' }, correct: false },
      ],
      fbOk: { pt: 'Isso. Sem som e no fim da palavra, classificando a categoria: é um determinativo.', en: 'Right. Soundless and at the end of the word, classifying its category: a determinative.' },
      fbErr: { pt: 'É um determinativo: não tem som e só marca a categoria da palavra (aqui, uma pessoa).', en: 'It is a determinative: no sound, it only marks the word\'s category (here, a person).' },
    },
    {
      kind: 'mc', lesson: 1, glyph: '𓁹',
      q: { pt: 'Você abre um texto e não sabe por onde começar a ler. Qual é a pista mais confiável para achar a direção?', en: 'You open a text and do not know where to start reading. What is the most reliable clue to find the direction?' },
      options: [
        { label: { pt: 'Para onde as pessoas e os animais olham', en: 'Which way the people and animals face' }, correct: true },
        { label: { pt: 'Começar sempre pela esquerda', en: 'Always start from the left' }, correct: false },
        { label: { pt: 'Começar sempre de cima', en: 'Always start from the top' }, correct: false },
        { label: { pt: 'Procurar o maior sinal da linha', en: 'Find the largest sign in the line' }, correct: false },
      ],
      fbOk: { pt: 'Exato. As figuras encaram o início da linha; siga os rostos.', en: 'Exactly. The figures face the start of the line; follow the faces.' },
      fbErr: { pt: 'A direção variava. A pista são os rostos: pessoas e animais olham para o início da linha.', en: 'The direction varied. The clue is the faces: people and animals look toward the start of the line.' },
    },
    {
      kind: 'mc', lesson: 1, glyph: '𓄤',
      q: { pt: 'O egípcio escrevia só as consoantes. Quando lemos "nefer" para 𓄤 (nfr), o "e" é...', en: 'Egyptian wrote only consonants. When we read "nefer" for 𓄤 (nfr), the "e" is...' },
      options: [
        { label: { pt: 'Uma convenção moderna para conseguirmos pronunciar', en: 'A modern convention so we can pronounce it' }, correct: true },
        { label: { pt: 'A pronúncia exata reconstruída dos egípcios', en: 'The exact reconstructed pronunciation of the Egyptians' }, correct: false },
        { label: { pt: 'Um hieróglifo de vogal que não foi escrito', en: 'A vowel hieroglyph that was left out' }, correct: false },
        { label: { pt: 'Um determinativo', en: 'A determinative' }, correct: false },
      ],
      fbOk: { pt: 'Isso. As vogais não eram escritas; o "e" é só convenção de estudo, não a pronúncia original.', en: 'Right. Vowels were not written; the "e" is only a scholarly convention, not the original pronunciation.' },
      fbErr: { pt: 'As vogais não eram escritas. O "e" de "nefer" é convenção moderna, não como soava.', en: 'Vowels were not written. The "e" in "nefer" is a modern convention, not how it sounded.' },
    },

    /* ── Lição 2: os 24 unilíteros ────────────────────── */
    {
      kind: 'match', lesson: 2,
      prompt: { pt: 'Case cada unilítero com o seu som.', en: 'Match each uniliteral with its sound.' },
      pairs: [
        { id: 'G17', label: { pt: 'm', en: 'm' } },
        { id: 'N35', label: { pt: 'n', en: 'n' } },
        { id: 'D21', label: { pt: 'r', en: 'r' } },
        { id: 'S29', label: { pt: 's', en: 's' } },
      ],
    },
    {
      kind: 'match', lesson: 2,
      prompt: { pt: 'Estes quatro parecem vogais, mas não são. Case cada sinal com a transliteração certa.', en: 'These four look like vowels, but they are not. Match each sign with its correct transliteration.' },
      pairs: [
        { id: 'G1',  label: { pt: 'ꜣ', en: 'ꜣ' } },
        { id: 'D36', label: { pt: 'ꜥ', en: 'ꜥ' } },
        { id: 'M17', label: { pt: 'ỉ', en: 'ỉ' } },
        { id: 'G43', label: { pt: 'w', en: 'w' } },
      ],
    },
    {
      kind: 'mc', lesson: 2, glyph: '𓄿',
      q: { pt: 'Os sinais ꜣ (𓄿, o abutre) e ꜥ (𓂝, o antebraço) representam...', en: 'The signs ꜣ (𓄿, the vulture) and ꜥ (𓂝, the forearm) represent...' },
      options: [
        { label: { pt: 'Consoantes que o português não tem', en: 'Consonants that English does not have' }, correct: true },
        { label: { pt: 'As vogais "a" e "o"', en: 'The vowels "a" and "o"' }, correct: false },
        { label: { pt: 'Números', en: 'Numbers' }, correct: false },
        { label: { pt: 'Determinativos', en: 'Determinatives' }, correct: false },
      ],
      fbOk: { pt: 'Isso. Apesar da aparência, ꜣ e ꜥ são consoantes (oclusão glotal e som de garganta).', en: 'Right. Despite appearances, ꜣ and ꜥ are consonants (a glottal stop and a throat sound).' },
      fbErr: { pt: 'ꜣ e ꜥ parecem "a", mas são consoantes que o português não tem; as vogais não eram escritas.', en: 'ꜣ and ꜥ look like "a", but they are consonants English lacks; vowels were not written.' },
    },

    /* ── Lição 3: bilíteros, trilíteros e complementos ── */
    {
      kind: 'mc', lesson: 3, glyph: '𓆣',
      q: { pt: 'O que é um sinal bilítero?', en: 'What is a biliteral sign?' },
      options: [
        { label: { pt: 'Um sinal que vale duas consoantes', en: 'A sign worth two consonants' }, correct: true },
        { label: { pt: 'Um sinal que vale uma consoante', en: 'A sign worth one consonant' }, correct: false },
        { label: { pt: 'Um sinal sem som, que classifica', en: 'A soundless sign that classifies' }, correct: false },
        { label: { pt: 'Duas palavras escritas juntas', en: 'Two words written together' }, correct: false },
      ],
      fbOk: { pt: 'Isso. Bilítero = duas consoantes; trilítero = três. Uma consoante só é o unilítero.', en: 'Right. Biliteral = two consonants; triliteral = three. One consonant is the uniliteral.' },
      fbErr: { pt: 'Bilítero vale duas consoantes de uma vez. Uma consoante só é o unilítero; três, o trilítero.', en: 'A biliteral is worth two consonants at once. One is the uniliteral; three, the triliteral.' },
    },
    {
      kind: 'match', lesson: 3,
      prompt: { pt: 'Case cada palavra com o seu significado.', en: 'Match each word with its meaning.' },
      pairs: [
        { id: 'S34', label: { pt: 'ꜥnḫ · vida', en: 'ꜥnḫ · life' } },
        { id: 'O1',  label: { pt: 'pr · casa', en: 'pr · house' } },
        { id: 'F35', label: { pt: 'nfr · belo', en: 'nfr · beautiful' } },
        { id: 'R8',  label: { pt: 'nṯr · deus', en: 'nṯr · god' } },
      ],
    },
    {
      kind: 'fill', lesson: 3, glyph: '𓋹𓈖𓐍',
      q: { pt: 'A palavra 𓋹𓈖𓐍 se lê ꜥnḫ. Os sinais 𓈖 (n) e 𓐍 (ḫ) depois do ânkh são...', en: 'The word 𓋹𓈖𓐍 reads ꜥnḫ. The signs 𓈖 (n) and 𓐍 (ḫ) after the ankh are...' },
      translit: 'ꜥnḫ',
      options: [
        { label: { pt: 'Complementos fonéticos (confirmam sons que 𓋹 já tem)', en: 'Phonetic complements (they confirm sounds 𓋹 already has)' }, correct: true },
        { label: { pt: 'Sons novos, virando "ꜥnḫnḫ"', en: 'New sounds, making it "ꜥnḫnḫ"' }, correct: false },
        { label: { pt: 'Um determinativo de vida', en: 'A determinative of life' }, correct: false },
        { label: { pt: 'A marca de plural', en: 'The plural marker' }, correct: false },
      ],
      fbOk: { pt: 'Isso. São complementos: repetem o n e o ḫ que 𓋹 já carrega. Lê-se ꜥnḫ uma vez.', en: 'Right. They are complements: they repeat the n and ḫ that 𓋹 already carries. You read ꜥnḫ once.' },
      fbErr: { pt: 'São complementos fonéticos: só confirmam a leitura de 𓋹 (ꜥnḫ), não somam sons.', en: 'They are phonetic complements: they only confirm the reading of 𓋹 (ꜥnḫ); they add no sounds.' },
    },
    {
      kind: 'mc', lesson: 3, glyph: '𓊹',
      q: { pt: 'O trilítero nṯr (𓊹) significa...', en: 'The triliteral nṯr (𓊹) means...' },
      options: [
        { label: { pt: 'Deus', en: 'God' }, correct: true },
        { label: { pt: 'Casa', en: 'House' }, correct: false },
        { label: { pt: 'Vida', en: 'Life' }, correct: false },
        { label: { pt: 'Belo', en: 'Beautiful' }, correct: false },
      ],
      fbOk: { pt: 'Isso. nṯr (𓊹) é "deus". Casa = pr, vida = ꜥnḫ, belo = nfr.', en: 'Right. nṯr (𓊹) is "god". House = pr, life = ꜥnḫ, beautiful = nfr.' },
      fbErr: { pt: 'nṯr (𓊹) é "deus". Casa = pr, vida = ꜥnḫ, belo = nfr.', en: 'nṯr (𓊹) is "god". House = pr, life = ꜥnḫ, beautiful = nfr.' },
    },

    /* ── Lição 4: montando palavras ───────────────────── */
    {
      kind: 'build', lesson: 4,
      prompt: { pt: 'Monte a palavra "belo, bom, perfeito".', en: 'Build the word "beautiful, good, perfect".' },
      meaning: { pt: 'belo, bom, perfeito', en: 'beautiful, good, perfect' }, translit: 'nfr',
      palette: ['F35', 'I9', 'D21', 'N35', 'G17', 'S29'],
      answer: ['F35', 'I9', 'D21'],
      note: { pt: '𓄤 já é nfr; 𓆑 (f) e 𓂋 (r) são complementos. Lê-se nfr, não nfr-f-r.', en: '𓄤 is already nfr; 𓆑 (f) and 𓂋 (r) are complements. You read nfr, not nfr-f-r.' },
    },
    {
      kind: 'build', lesson: 4,
      prompt: { pt: 'Monte a palavra "vida".', en: 'Build the word "life".' },
      meaning: { pt: 'vida', en: 'life' }, translit: 'ꜥnḫ',
      palette: ['S34', 'N35', 'Aa1', 'D21', 'G17', 'I9'],
      answer: ['S34', 'N35', 'Aa1'],
      note: { pt: '𓋹 é ꜥnḫ; 𓈖 (n) e 𓐍 (ḫ) repetem sons que ele já carrega.', en: '𓋹 is ꜥnḫ; 𓈖 (n) and 𓐍 (ḫ) repeat sounds it already carries.' },
    },
    {
      kind: 'order', lesson: 4,
      prompt: { pt: 'Coloque os sinais na ordem de escrita da palavra "casa" (pr, com o complemento r).', en: 'Put the signs in the writing order of the word "house" (pr, with the r complement).' },
      translit: 'pr',
      answer: ['O1', 'D21'],
      note: { pt: '𓉐 (pr) vem primeiro; o 𓂋 (r) é o complemento que confirma o som. Lê-se pr.', en: '𓉐 (pr) comes first; the 𓂋 (r) is the complement confirming the sound. You read pr.' },
    },

    /* ── Lição 5: cartuchos e nomes do rei ────────────── */
    {
      kind: 'mc', lesson: 5, glyph: '𓍶',
      q: { pt: 'O que é um cartucho?', en: 'What is a cartouche?' },
      options: [
        { label: { pt: 'Uma alça de corda que envolve um nome real', en: 'A loop of rope that encircles a royal name' }, correct: true },
        { label: { pt: 'Um determinativo de escrita', en: 'A determinative for writing' }, correct: false },
        { label: { pt: 'Um sinal que vale três consoantes', en: 'A sign worth three consonants' }, correct: false },
        { label: { pt: 'A assinatura do escriba', en: 'The scribe\'s signature' }, correct: false },
      ],
      fbOk: { pt: 'Isso. A corda que circunda (do anel shen) protege e sinaliza: aqui dentro, um nome real.', en: 'Right. The encircling rope (from the shen ring) protects and signals: a royal name is inside.' },
      fbErr: { pt: 'O cartucho é a alça de corda em torno de um nome real; vem do anel shen, de proteção.', en: 'The cartouche is the loop of rope around a royal name; it comes from the protective shen ring.' },
    },
    {
      kind: 'mc', lesson: 5, glyph: '𓇳',
      q: { pt: 'No nome de trono de Ramsés II, Wsr-Mꜣꜥt-Rꜥ, o disco solar 𓇳 (Rꜥ) é escrito primeiro, mas lido depois. Como se chama isso?', en: 'In the throne name of Ramesses II, Wsr-Mꜣꜥt-Rꜥ, the sun disk 𓇳 (Rꜥ) is written first but read later. What is this called?' },
      options: [
        { label: { pt: 'Transposição honorífica', en: 'Honorific transposition' }, correct: true },
        { label: { pt: 'Complemento fonético', en: 'Phonetic complement' }, correct: false },
        { label: { pt: 'Determinativo', en: 'Determinative' }, correct: false },
        { label: { pt: 'Transliteração', en: 'Transliteration' }, correct: false },
      ],
      fbOk: { pt: 'Isso. O sinal do deus vai para a frente por respeito, mesmo sendo lido depois.', en: 'Right. The god\'s sign moves to the front out of respect, even though it is read later.' },
      fbErr: { pt: 'É a transposição honorífica: o sinal do deus é escrito na frente por respeito, e lido depois.', en: 'It is honorific transposition: the god\'s sign is written in front out of respect, and read later.' },
    },
    {
      kind: 'order', lesson: 5,
      prompt: { pt: 'Coloque os sinais na ordem de escrita do nome Ramessu (Rꜥ-ms-sw). Lembre que o deus vem primeiro.', en: 'Put the signs in the writing order of the name Ramessu (Rꜥ-ms-sw), remembering that the god comes first.' },
      translit: 'rꜥ-ms-sw', cartouche: true,
      answer: ['N5', 'F31', 'S29', 'M23', 'G43'],
      note: { pt: '𓇳 (Rꜥ) abre o nome, por respeito; depois 𓄟 (ms) + 𓋴 (s) + 𓇓 (sw) + 𓅱 (w).', en: '𓇳 (Rꜥ) opens the name, out of respect; then 𓄟 (ms) + 𓋴 (s) + 𓇓 (sw) + 𓅱 (w).' },
    },
    {
      kind: 'mc', lesson: 5, glyph: '𓆃',
      q: { pt: 'Dos cinco nomes do rei, quais dois eram escritos dentro de cartuchos?', en: 'Of the king\'s five names, which two were written inside cartouches?' },
      options: [
        { label: { pt: 'O nome de trono e o nome de nascimento', en: 'The throne name and the birth name' }, correct: true },
        { label: { pt: 'O nome de Hórus e o de Hórus de Ouro', en: 'The Horus name and the Golden Horus name' }, correct: false },
        { label: { pt: 'O nome das Duas Senhoras e o de Hórus', en: 'The Two Ladies name and the Horus name' }, correct: false },
        { label: { pt: 'Todos os cinco', en: 'All five' }, correct: false },
      ],
      fbOk: { pt: 'Isso. Trono e nascimento vão no cartucho; este último precedido de "Filho de Rá".', en: 'Right. Throne and birth names go in the cartouche; the latter preceded by "Son of Ra".' },
      fbErr: { pt: 'São o nome de trono e o de nascimento. Os outros três ficavam fora do cartucho.', en: 'They are the throne name and the birth name. The other three sat outside the cartouche.' },
    },

    /* ── Lição 6: ler a fórmula de oferenda ───────────── */
    {
      kind: 'fill', lesson: 6, glyph: '𓊵𓏙',
      q: { pt: 'A fórmula de oferenda começa sempre igual: 𓇓𓏏𓊵𓏙. Complete a leitura.', en: 'The offering formula always begins the same way: 𓇓𓏏𓊵𓏙. Complete the reading.' },
      translit: 'ḥtp-dỉ-___',
      options: [
        { label: { pt: 'nsw ("rei")', en: 'nsw ("king")' }, correct: true },
        { label: { pt: 'nfr ("belo")', en: 'nfr ("beautiful")' }, correct: false },
        { label: { pt: 'nṯr ("deus")', en: 'nṯr ("god")' }, correct: false },
        { label: { pt: 'ꜥnḫ ("vida")', en: 'ꜥnḫ ("life")' }, correct: false },
      ],
      fbOk: { pt: 'Isso: ḥtp-dỉ-nsw, "uma oferenda que o rei dá". O 𓇓 (rei) é escrito primeiro, lido por último.', en: 'Right: ḥtp-dỉ-nsw, "an offering which the king gives". The 𓇓 (king) is written first, read last.' },
      fbErr: { pt: 'É ḥtp-dỉ-nsw: "uma oferenda que o rei dá". O sinal do rei 𓇓 abre a frase, mas se lê no fim.', en: 'It is ḥtp-dỉ-nsw: "an offering which the king gives". The king sign 𓇓 opens the phrase but is read last.' },
    },
    {
      kind: 'mc', lesson: 6, glyph: '𓇓',
      q: { pt: 'A fórmula ḥtp-dỉ-nsw diz "uma oferenda que o rei dá". Em estelas de gente comum, como a de Tjenu, quem é esse "rei"?', en: 'The formula ḥtp-dỉ-nsw says "an offering which the king gives". On stelae of ordinary people, like Tjenu\'s, who is this "king"?' },
      options: [
        { label: { pt: 'O rei como provedor; a fórmula é justamente a das pessoas comuns', en: 'The king as provider; the formula is precisely the one for ordinary people' }, correct: true },
        { label: { pt: 'O dono da estela, que era um faraó', en: 'The stela owner, who was a pharaoh' }, correct: false },
        { label: { pt: 'Ninguém: "rei" aqui é só um determinativo', en: 'No one: "king" here is just a determinative' }, correct: false },
        { label: { pt: 'O escriba que gravou o texto', en: 'The scribe who carved the text' }, correct: false },
      ],
      fbOk: { pt: 'Isso. O "rei" é o provedor da oferenda; a fórmula "que o rei dá" é a das pessoas comuns, não dos reis.', en: 'Right. The "king" is the provider of the offering; the "which the king gives" formula is for ordinary people, not kings.' },
      fbErr: { pt: 'O "rei" é o provedor divino/real da oferenda. A fórmula é a de pessoas comuns, como Tjenu, não de faraós.', en: 'The "king" is the royal/divine provider of the offering. The formula is for ordinary people like Tjenu, not pharaohs.' },
    },
    {
      kind: 'build', lesson: 6,
      prompt: { pt: 'Monte "Osíris", o deus a quem a oferenda costuma ser dedicada.', en: 'Build "Osiris", the god the offering is usually dedicated to.' },
      meaning: { pt: 'Osíris', en: 'Osiris' }, translit: 'wsỉr',
      palette: ['Q1', 'D4', 'A40', 'M23', 'R4', 'X8'],
      answer: ['Q1', 'D4', 'A40'],
      note: { pt: '𓊨 (ws, trono) + 𓁹 (ỉr, olho) + 𓀭 (determinativo de deus, sem som).', en: '𓊨 (ws, throne) + 𓁹 (ỉr, eye) + 𓀭 (determinative of a god, no sound).' },
    },
    {
      kind: 'mc', lesson: 6, glyph: '𓀭',
      q: { pt: 'No fim de Wsỉr (Osíris, 𓊨𓁹𓀭), o sinal 𓀭 (uma figura divina sentada) não tem som. O que ele faz?', en: 'At the end of Wsỉr (Osiris, 𓊨𓁹𓀭), the sign 𓀭 (a seated divine figure) has no sound. What does it do?' },
      options: [
        { label: { pt: 'Marca que a palavra é uma divindade (determinativo)', en: 'Marks the word as a deity (determinative)' }, correct: true },
        { label: { pt: 'Acrescenta o som "r" ao nome', en: 'Adds the sound "r" to the name' }, correct: false },
        { label: { pt: 'É a transposição honorífica', en: 'It is honorific transposition' }, correct: false },
        { label: { pt: 'É um cartucho', en: 'It is a cartouche' }, correct: false },
      ],
      fbOk: { pt: 'Isso. É o determinativo de deus: sem som, só classifica Wsỉr como uma divindade.', en: 'Right. It is the god determinative: no sound, it only classifies Wsỉr as a deity.' },
      fbErr: { pt: 'É o determinativo de deus: não tem som, apenas marca que Wsỉr é uma divindade.', en: 'It is the god determinative: no sound, it only marks Wsỉr as a deity.' },
    },
  ],
};
