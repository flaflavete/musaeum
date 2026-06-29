// Dados e renderização do hub "Aprender hieróglifos" (panel-aprender em index.html).
// Carregado antes de home/main.js; usa currentLang definido por main.js.

const APRENDER_LESSONS = [
  {
    num:        { pt: 'Lição 1', en: 'Lesson 1' },
    glyph:      '𓁹',
    title:      { pt: 'Como funciona a escrita egípcia', en: 'How Egyptian writing works' },
    desc:       { pt: 'Entenda os sinais fonéticos e determinativos: a lógica do sistema antes de qualquer sinal.', en: 'Understand phonetic signs and determinatives: the system logic before any individual sign.' },
    dur:        { pt: '~10 min', en: '~10 min' },
    type:       { pt: 'Teoria', en: 'Theory' },
    href:       'aprender/01-sistema.html',
    badge:      { pt: 'Começar aqui', en: 'Start here' },
    badgeClass: 'badge-new',
  },
  {
    num:        { pt: 'Lição 2', en: 'Lesson 2' },
    glyph:      '𓄿',
    title:      { pt: 'Os 24 sinais unileteral', en: 'The 24 uniliteral signs' },
    desc:       { pt: 'O "alfabeto" do egípcio: cada sinal representa um único som, a base de tudo que vem depois.', en: 'Egyptian writing\'s "alphabet": each sign represents a single sound, the foundation for everything else.' },
    dur:        { pt: '~20 min', en: '~20 min' },
    type:       { pt: '24 sinais', en: '24 signs' },
    href:       'aprender/02-unileteral.html',
    badge:      { pt: 'Novo', en: 'New' },
    badgeClass: 'badge-new',
  },
  {
    num:        { pt: 'Lição 3', en: 'Lesson 3' },
    glyph:      '𓅱',
    title:      { pt: 'Sinais biliterais essenciais', en: 'Essential biliteral signs' },
    desc:       { pt: 'Os 20 sinais mais comuns que representam duas consoantes. A base para ler palavras reais.', en: 'The 20 most common signs representing two consonants. The foundation for reading real words.' },
    dur:        { pt: '~25 min', en: '~25 min' },
    type:       { pt: '20 sinais', en: '20 signs' },
    href:       'aprender/03-biliteral.html',
    badge:      { pt: 'Novo', en: 'New' },
    badgeClass: 'badge-new',
  },
  {
    num:        { pt: 'Lição 4', en: 'Lesson 4' },
    glyph:      '𓄤',
    title:      { pt: 'Sinais triliterais', en: 'Triliteral signs' },
    desc:       { pt: 'Nove sinais que valem três consoantes: vida, deus, belo, tornar-se. Pequenos em número, imensos em frequência.', en: 'Nine signs worth three consonants each: life, god, beautiful, to become. Few in number, enormous in frequency.' },
    dur:        { pt: '~20 min', en: '~20 min' },
    type:       { pt: '9 sinais', en: '9 signs' },
    href:       'aprender/04-triliteral.html',
    badge:      { pt: 'Novo', en: 'New' },
    badgeClass: 'badge-new',
  },
  {
    num:        { pt: 'Lição 5', en: 'Lesson 5' },
    glyph:      '𓂋',
    title:      { pt: 'Lendo palavras simples', en: 'Reading simple words' },
    desc:       { pt: 'Combine os sinais para ler 20 palavras reais: corpo humano, cosmos e vida cotidiana.', en: 'Combine signs to read 20 real words: the human body, cosmos, and daily life.' },
    dur:        { pt: '~30 min', en: '~30 min' },
    type:       { pt: '20 palavras reais', en: '20 real words' },
    href:       'aprender/05-palavras.html',
    badge:      { pt: 'Novo', en: 'New' },
    badgeClass: 'badge-new',
  },
  {
    num:        { pt: 'Lição 6', en: 'Lesson 6' },
    glyph:      '𓇳',
    title:      { pt: 'Cartuchos reais', en: 'Royal cartouches' },
    desc:       { pt: 'Leia os nomes de Ramsés, Cleópatra, Tutancâmon e mais, do jeito que os antigos escreviam.', en: 'Read the names of Ramesses, Cleopatra, Tutankhamun and more, the way the ancients wrote them.' },
    dur:        { pt: '~20 min', en: '~20 min' },
    type:       { pt: '6 faraós', en: '6 pharaohs' },
    href:       'aprender/06-cartuchos.html',
    badge:      { pt: 'Final', en: 'Final' },
    badgeClass: 'badge-final',
  },
];

const APRENDER_TOOLS = [
  {
    glyph: '𓄿',
    emoji: false,
    title: { pt: 'Flashcards', en: 'Flashcards' },
    desc:  { pt: 'Revise os sinais com repetição espaçada', en: 'Review signs with spaced repetition' },
    href:  'aprender/flashcards.html',
  },
  {
    glyph: '❓',
    emoji: true,
    title: { pt: 'Quiz', en: 'Quiz' },
    desc:  { pt: 'Teste seus conhecimentos com múltipla escolha', en: 'Test your knowledge with multiple choice' },
    href:  'aprender/flashcards.html?mode=quiz',
  },
];

function renderAprenderHub() {
  const L = currentLang;

  const p = JSON.parse(localStorage.getItem('musaeum-hieroglyphs') || '{}');
  const done  = p.lessonsCompleted || 0;
  const cards = p.cardsReviewed    || 0;
  const pct   = Math.round((done / 5) * 100);

  const elDone  = document.getElementById('aprenderStatDone');
  const elCards = document.getElementById('aprenderStatCards');
  const elPct   = document.getElementById('aprenderPct');
  const elFill  = document.getElementById('aprenderFill');
  if (elDone)  elDone.textContent  = done;
  if (elCards) elCards.textContent = cards;
  if (elPct)   elPct.textContent   = pct + '%';
  if (elFill)  elFill.style.width  = pct + '%';

  const grid = document.getElementById('aprenderGrid');
  if (grid) {
    grid.innerHTML = APRENDER_LESSONS.map(l => `
      <a class="aprender-card" href="${l.href}" aria-label="${l.title[L]}">
        <div class="aprender-card-top">
          <span class="aprender-card-glyph">${l.glyph}</span>
          <span class="aprender-card-badge ${l.badgeClass}">${l.badge[L]}</span>
        </div>
        <div class="aprender-card-num">${l.num[L]}</div>
        <div class="aprender-card-title">${l.title[L]}</div>
        <div class="aprender-card-desc">${l.desc[L]}</div>
        <div class="aprender-card-meta">
          <span>⏱ ${l.dur[L]}</span>
          <span>${l.type[L]}</span>
        </div>
      </a>`).join('');
  }

  const tools = document.getElementById('aprenderTools');
  if (tools) {
    tools.innerHTML = APRENDER_TOOLS.map(t => `
      <a class="aprender-tool" href="${t.href}">
        <span class="aprender-tool-glyph${t.emoji ? ' emoji' : ''}">${t.glyph}</span>
        <span class="aprender-tool-info">
          <strong>${t.title[L]}</strong>
          <span>${t.desc[L]}</span>
        </span>
      </a>`).join('');
  }
}
