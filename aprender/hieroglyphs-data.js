/* Dados pedagógicos do curso de hieróglifos.
 * Glyph, phon e nome derivam de GARDINER_DATA / GARDINER_DATA_EN (planilha Gardiner).
 * Campos "tip" (PT) e "tip_en" (EN) são exclusivos deste arquivo.
 * Requer gardiner_data.js e gardiner_data_en.js carregados antes deste arquivo. */

(function () {
  /* Índice O(1); evita percorrer os ~900 sinais a cada lookup. */
  const _pt = Object.fromEntries(GARDINER_DATA.map(r => [r[0], r]));
  const _en = Object.fromEntries(GARDINER_DATA_EN.map(r => [r[0], r]));

  /* Cria um objeto de sinal buscando glifo, fonema e nome no Gardiner.
   * ov = campos opcionais de sobrescrita (phon, name_pt, name_en, glyph).
   * tip_en = dica mnemônica em inglês. */
  function sign(id, tip, ov, tip_en) {
    const pt = _pt[id] || [];
    const en = _en[id] || [];
    return Object.assign(
      {
        id,
        glyph:   pt[1] || '',
        phon:    (pt[2] || '').split('|')[0],
        name_pt: pt[3] || '',
        name_en: en[3] || '',
      },
      ov || {},
      { tip: tip || '', tip_en: tip_en || '' }
    );
  }

  /* ── 24 UNILÍTEROS (Lição 2) ────────────────────────── */
  window.UNILITERALS = [
    sign('G1',
      'O abutre egípcio. Som gutural, como um a aspirado. Aparece muito em palavras divinas.',
      null,
      'The Egyptian vulture. A guttural glottal sound with no English equivalent. Common in divine names.'
    ),
    sign('M17',
      'Um junco/cana. Equivale ao nosso Y ou I. Muito comum no início de palavras.',
      { phon: 'j' },
      'A single reed. Equivalent to Y or I. Very common at the start of words.'
    ),
    /* M17A (dois juncos) não está na lista Gardiner padrão; entrada explícita. */
    { id: 'M17A', glyph: '𓇌', phon: 'y',  name_pt: 'dois juncos', name_en: 'double reed',
      tip: 'Dois juncos, que reforçam o som Y. Aparece especialmente em sufixos e formas femininas.',
      tip_en: 'Two reeds reinforcing the Y sound. Found especially in suffixes and feminine forms.' },
    sign('D36',
      'O braço com mão aberta. Som faríngeo sem equivalente em português. Imagine um "a" profundo na garganta.',
      null,
      'Arm with open hand. A pharyngeal consonant with no English equivalent. Imagine a deep "a" from the throat.'
    ),
    sign('G43',
      'O pintinho de codorna. Som W, como em "uva". Um dos sinais mais frequentes do egípcio.',
      null,
      'The quail chick. W sound, as in "well". One of the most frequent signs in Egyptian.'
    ),
    sign('D58',
      'Um pé. O som B. Note que o sinal é um pé visto de lado.',
      null,
      'A foot viewed from the side. The B sound.'
    ),
    sign('Q3',
      'Um banco visto de cima. O som P.',
      null,
      'A stool viewed from above. The P sound.'
    ),
    sign('I9',
      'A víbora cornuda. O som F. Cuidado para não confundir com outras cobras.',
      null,
      'The horned viper. The F sound. Do not confuse with other snake signs.'
    ),
    sign('G17',
      'A coruja. O som M. Um dos sinais mais reconhecíveis, pois sempre olha para frente.',
      null,
      'The owl. The M sound. One of the most recognizable signs; it always faces forward.'
    ),
    sign('N35',
      'Ondas de água. O som N. A forma em ziguezague é inconfundível.',
      null,
      'Rippling water. The N sound. The zigzag shape is unmistakable.'
    ),
    sign('D21',
      'Uma boca vista de frente. O som R. Extremamente comum em gramática e sufixos.',
      null,
      'A mouth seen from the front. The R sound. Extremely common in grammar and word endings.'
    ),
    sign('O4',
      'Um abrigo de juncos. O H simples, como em "há".',
      null,
      'A reed shelter. Simple H, as in "house".'
    ),
    sign('V28',
      'Um pavio de linho torcido. H aspirado mais forte, pronuncie com mais ar.',
      null,
      'A twisted linen wick. An emphatic H; pronounce with more breath from the throat.'
    ),
    sign('Aa1',
      'A placenta (interpretação incerta). Som KH gutural, como o CH alemão em "Bach".',
      null,
      'The placenta (identification disputed). A KH sound, like the German CH in "Bach".'
    ),
    sign('F32',
      'Barriga de animal. Outro som KH, ligeiramente mais palatal.',
      null,
      'Animal belly. Another KH sound, slightly more palatal.'
    ),
    /* O34: Gardiner registra "s"; Faulkner usa "z" para este sinal. */
    sign('O34',
      'Uma tranca de porta. O som Z (ou S em alguns contextos).',
      { phon: 'z' },
      'A door bolt. The Z sound (or S in some contexts).'
    ),
    sign('S29',
      'Um tecido dobrado. O som S. Muito comum, aparece em centenas de palavras.',
      null,
      'Folded cloth. The S sound. Very common, appearing in hundreds of words.'
    ),
    sign('N37',
      'Um lago visto de cima. O som SH, como em "show".',
      null,
      'A pool viewed from above. The SH sound, as in "show".'
    ),
    sign('N29',
      'Uma encosta de colina. Som Q gutural, mais fundo que o K.',
      null,
      'A hillslope. A guttural Q sound, deeper than K.'
    ),
    /* V31: fonema ausente na planilha Gardiner; complementado aqui. */
    sign('V31',
      'Uma cesta com alça. O som K comum.',
      { phon: 'k' },
      'A basket with handle. The common K sound.'
    ),
    sign('W11',
      'Um suporte para jarro. O som G, como em "gato".',
      null,
      'A jar stand. The G sound, as in "go".'
    ),
    sign('X1',
      'Um pão achatado. O som T. Este sinal também marca o feminino em substantivos.',
      null,
      'A flat loaf of bread. The T sound. This sign also marks the feminine in nouns.'
    ),
    sign('V13',
      'Uma corda de amarrar. Som TJ palatal, como o CH italiano em "ciao".',
      null,
      'A hobble rope. A palatal TJ sound, like the CH in Italian "ciao".'
    ),
    sign('D46',
      'Uma mão. O som D.',
      null,
      'A hand. The D sound.'
    ),
    sign('I10',
      'Uma cobra em repouso. Som DJ, como em "djinn". Par palatal do D.',
      null,
      'A cobra at rest. The DJ sound, as in "djinn". The palatal counterpart of D.'
    ),
  ];

  /* ── 20 BILÍTEROS (Lição 3) ─────────────────────────── */
  window.BILITERALS_LESSON = [
    sign('O1',
      'pr = "casa". Raiz de per-aa (pr-ꜥꜣ), "grande casa" = Faraó. Frequente em topônimos como Per-Ramsés.',
      null,
      'pr = "house". Root of per-aa (pr-ꜥꜣ), "great house" = Pharaoh. Common in place names like Per-Ramesses.'
    ),
    sign('D2',
      'ḥr = "rosto" e preposição "sobre, em". Aparece também no nome do deus Hórus (ḥrw).',
      null,
      'ḥr = "face" and the preposition "upon, over". Also appears in the name of the god Horus (ḥrw).'
    ),
    sign('F4',
      'ḥꜣ = "atrás, além de". Preposição espacial frequente em textos funerários e geográficos.',
      { phon: 'ḥꜣ' },
      'ḥꜣ = "behind, beyond". A spatial preposition frequent in funerary and geographical texts.'
    ),
    sign('D28',
      'kꜣ = "ka", o duplo espiritual de cada pessoa. Central na teologia egípcia e nos ritos funerários.',
      null,
      'kꜣ = "ka", the spiritual double of each person. Central to Egyptian theology and funerary rites.'
    ),
    sign('G25',
      'ꜣḫ = "espírito luminoso". Os mortos bem-sucedidos tornavam-se ꜣḫ e habitavam o campo estelar.',
      null,
      'ꜣḫ = "luminous spirit". The blessed dead became ꜣḫ and dwelt in the stellar realm.'
    ),
    sign('F34',
      'ib = "coração, vontade". Para os egípcios, o coração era a sede da inteligência e da memória.',
      null,
      'ib = "heart, will". For Egyptians, the heart was the seat of intelligence and memory.'
    ),
    sign('W24',
      'nw = partícula plural do Reino Antigo. Aparece em Nun/Nunu (nwn), o oceano primordial da criação.',
      { phon: 'nw' },
      'nw = Old Kingdom plural particle. Appears in Nun/Nunu (nwn), the primordial ocean of creation.'
    ),
    sign('G19',
      'mi = "como, igual a" (partícula de comparação). Frequente em expressões poéticas e laudatórias.',
      { phon: 'mi' },
      'mi = "like, equal to" (comparative particle). Frequent in poetic and laudatory expressions.'
    ),
    sign('V30',
      'nb = "senhor, todo, cada". Extremamente frequente; nb-tꜣwy = "Senhor das Duas Terras" = Faraó.',
      null,
      'nb = "lord, all, every". Extremely common; nb-tꜣwy = "Lord of the Two Lands" = Pharaoh.'
    ),
    sign('G36',
      'wr = "grande". Aparece em epítetos divinos (wr-nṯr, "o grande deus") e títulos nobiliárquicos.',
      null,
      'wr = "great". Appears in divine epithets (wr-nṯr, "the great god") and noble titles.'
    ),
    sign('D4',
      'ir = "fazer, executar, praticar". Um dos verbos mais frequentes do egípcio. Aparece em fórmulas como ir ḥtp ("oferecer") e ir mdw ("pronunciar palavras"). O olho também é logograma da palavra jrt ("olho").',
      { phon: 'ir' },
      'ir = "to do, make, perform". One of the most frequent verbs in Egyptian. Appears in formulas like ir ḥtp ("to offer") and ir mdw ("to speak words"). The eye sign is also a logogram for jrt ("eye").'
    ),
    sign('R11',
      'ḏd = "dizer" (verbo) e "estabilidade" (logograma). A coluna djed é símbolo de Osíris.',
      null,
      'ḏd = "to say" (verb) and "stability" (logogram). The djed pillar is a symbol of Osiris.'
    ),
    sign('N41',
      'ḥm = "servo" e "Majestade" em contexto real. ḥm-nṯr = "servo do deus" = sacerdote.',
      null,
      'ḥm = "servant" and "Majesty" in royal contexts. ḥm-nṯr = "servant of the god" = priest.'
    ),
    sign('D1',
      'tp = "cabeça, topo, sobre". Funciona tanto como substantivo quanto como preposição.',
      null,
      'tp = "head, top, upon". Functions as both a noun and a preposition.'
    ),
    sign('N16',
      'tꜣ = "terra, país, solo". Aparece em nb-tꜣwy e expressões geográficas fundamentais.',
      null,
      'tꜣ = "land, country, ground". Appears in nb-tꜣwy and fundamental geographical expressions.'
    ),
    sign('G39',
      'sꜣ = "filho", "proteção" e "costas". Muito frequente em linhagens reais e títulos.',
      null,
      'sꜣ = "son", "protection", and "back". Very common in royal lineages and titles.'
    ),
    sign('M42',
      'wn = "abrir, existir, ser". Frequente em partículas narrativas (iw wn = "havia") e no epíteto litúrgico de Osíris, wn-nfr ("o que existe perfeito"). Aparece também em wnn ("existir" intensivo).',
      { phon: 'wn' },
      'wn = "to open, exist, be". Frequent in narrative particles (iw wn = "there was") and in the liturgical epithet of Osiris, wn-nfr ("he who exists perfectly"). Also in wnn ("to exist", intensive).'
    ),
    sign('N18',
      'iw = "ilha". Também funciona como conectivo verbal frequentíssimo no início de orações.',
      null,
      'iw = "island". Also functions as a very common verbal connector at the start of clauses.'
    ),
    sign('N36',
      'mr = "canal" e verbo "amar, querer". Muito frequente em textos do Reino Médio.',
      null,
      'mr = "canal" and the verb "to love, want". Very common in Middle Kingdom texts.'
    ),
    sign('G38',
      'gb = nome do deus Geb, senhor da terra. O ganso era o animal sagrado de Geb nos textos cosmológicos.',
      null,
      'gb = name of the god Geb, lord of the earth. The goose was his sacred animal in cosmological texts.'
    ),
  ];

  /* ── 9 TRILÍTEROS (Lição 4) ─────────────────────────── */
  window.TRILITERALS_LESSON = [
    sign('F35',
      'nfr = "bom, belo, perfeito". Um dos hieróglifos mais frequentes do egípcio. Aparece em nomes como Nefertiti (nfr-ṯjt) e Nefertari. Costuma vir acompanhado do complemento fonético 𓂋.',
      null,
      'nfr = "good, beautiful, perfect". One of the most frequent hieroglyphs in Egyptian. Appears in names like Nefertiti (nfr-ṯjt) and Nefertari. Often written with the phonetic complement 𓂋.'
    ),
    sign('S34',
      'ꜥnḫ = "vida". O símbolo mais reconhecível do Egito antigo. Deuses o seguram pelos braços ao oferecer vida eterna aos faraós. Aparece em centenas de títulos e fórmulas.',
      null,
      'ꜥnḫ = "life". The most recognizable symbol of ancient Egypt. Gods hold it by the arms to offer eternal life to pharaohs. Appears in hundreds of titles and formulas.'
    ),
    sign('R8',
      'nṯr = "deus". Presente em toda fórmula religiosa. ḥm-nṯr = "servo do deus" = sacerdote. O sinal representa um tecido hasteado em mastros nos templos.',
      null,
      'nṯr = "god". Present in every religious formula. ḥm-nṯr = "servant of the god" = priest. The sign represents a cloth raised on temple poles.'
    ),
    sign('L1',
      'ḫpr = "tornar-se, existir, acontecer". O escaravelho representa Khepri, o sol nascente que se recria a cada amanhecer. Frequente em cartuchos e amuletos.',
      null,
      'ḫpr = "to become, exist, happen". The scarab represents Khepri, the rising sun that recreates itself at each dawn. Frequent in cartouches and amulets.'
    ),
    sign('R4',
      'ḥtp = "paz, estar satisfeito, oferta". Abre a fórmula ḥtp-dj-nsw ("dádiva que o rei concede"), a frase mais repetida em lápides e estelas do Egito Antigo.',
      null,
      'ḥtp = "peace, to be content, offering". Opens the formula ḥtp-dj-nsw ("a gift the king gives"), the most repeated phrase on stelae and tombstones of ancient Egypt.'
    ),
    sign('Aa11',
      'mꜣꜥ = "verdadeiro, justo". Raiz de Maat e do título póstumo mꜣꜥ-ḫrw ("verdadeiro de voz"), conferido a quem passava pelo julgamento de Osíris. É o prêmio do Camponês Eloquente.',
      { name_pt: 'sinal abstrato', name_en: 'abstract sign' },
      'mꜣꜥ = "true, just". Root of Maat and the posthumous title mꜣꜥ-ḫrw ("true of voice"), granted to those who passed the judgment of Osiris. The reward earned by the Eloquent Peasant.'
    ),
    sign('D45',
      'ḏsr = "sagrado, nobre, exaltado". Raiz do nome do faraó Djeser (pirâmide de Saqqara). Aparece em epítetos como ḏsr-ḏsrw ("sagrado dos sagrados"), título de Amon.',
      null,
      'ḏsr = "sacred, noble, exalted". Root of the pharaoh Djoser\'s name (pyramid at Saqqara). Appears in epithets like ḏsr-ḏsrw ("holy of holies"), a title of Amun.'
    ),
    sign('F12',
      'wsr = "poderoso, forte". Raiz do nome Osíris (wsjr em egípcio). Frequente em epítetos reais e divinos. No Conto do Náufrago, a serpente usa termos de poder desta raiz.',
      null,
      'wsr = "powerful, strong". Root of the name Osiris (wsjr in Egyptian). Common in royal and divine epithets. In the Tale of the Shipwrecked Sailor, the serpent uses terms of power from this root.'
    ),
    sign('F36',
      'smꜣ = "unir". smꜣ-tꜣwy ("unificação das Duas Terras") é o rito central da coroação egípcia, representado pela junção das plantas do Alto e Baixo Egito.',
      null,
      'smꜣ = "to unite". smꜣ-tꜣwy ("unification of the Two Lands") is the central rite of Egyptian coronation, depicted as the joining of the plants of Upper and Lower Egypt.'
    ),
  ];

  /* ── FLASHCARDS, baralho de prática (15 sinais) ──────────
   * Sinais limpos do Gardiner; M42 = wn (flor), não M22 (nḫb/sedge). */
  window.BILITERALS_FLASH = [
    sign('D28', ''),
    sign('F35', ''),
    sign('N5',  ''),
    sign('S34', ''),
    sign('G25', ''),
    sign('M42', '', { phon: 'wn' }),
    sign('D4',  '', { phon: 'ir' }),
    sign('V4',  ''),
    sign('N36', ''),
    sign('G36', ''),
    sign('D54', ''),
    sign('F34', ''),
    sign('G39', ''),
    sign('O1',  ''),
    sign('V30', ''),
  ];
})();
