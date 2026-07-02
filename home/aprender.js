// Hub "Hieróglifos" (panel-aprender em index.html): porta de entrada para o
// curso de hieróglifos. NÃO duplica os dados das lições: renderiza a partir de
// window.CURSO_LICOES (curso/licoes.js, carregado antes deste arquivo), que é a
// fonte única. Assim, renomear/reordenar uma lição no curso reflete aqui sozinho.
// Progresso lê o mesmo save do curso: musaeum-hieroglyphs { done: { <id>: true } }.
// Carregado antes de home/main.js; usa currentLang definido por main.js.

// Ferramentas de prática do hub. As lições vêm de CURSO_LICOES; isto são só os
// destinos extras (a ferramenta Gardiner). O construtor de palavras e os quizzes
// já vivem dentro do curso e da própria lista de Gardiner.
const APRENDER_TOOLS = [
  {
    glyph: '𓏟',
    emoji: false,
    title: { pt: 'Lista de Gardiner', en: 'Gardiner List' },
    desc:  { pt: 'Consulte os ~900 sinais e monte palavras no construtor', en: 'Browse ~900 signs and build words in the builder' },
    href:  'gardiner/gardiner.html',
  },
];

function renderAprenderHub() {
  const L = currentLang;
  const T = (obj) => (obj && obj[L] != null ? obj[L] : (obj ? obj.pt : ''));

  const lessons = (window.CURSO_LICOES || []).filter(l => l.ready);

  // Progresso: mesmo save do curso (done por id). Total deriva das lições.
  let done = 0;
  try {
    const p = JSON.parse(localStorage.getItem('musaeum-hieroglyphs') || '{}');
    if (p.done) done = lessons.filter(l => p.done[l.id]).length;
  } catch (e) { /* save ausente ou corrompido: progresso zero */ }
  const total = lessons.length;
  const pct   = total ? Math.round((done / total) * 100) : 0;

  const elDone = document.getElementById('aprenderStatDone');
  const elPct  = document.getElementById('aprenderPct');
  const elFill = document.getElementById('aprenderFill');
  if (elDone) elDone.textContent = done;
  if (elPct)  elPct.textContent  = pct + '%';
  if (elFill) elFill.style.width = pct + '%';

  // Só as classes de selo que a home conhece (paleta dourada); o resto vira badge-new.
  const homeBadge = (cls) => (cls === 'badge-new' || cls === 'badge-final') ? cls : 'badge-new';

  const grid = document.getElementById('aprenderGrid');
  if (grid) {
    grid.innerHTML = lessons.map(l => `
      <a class="aprender-card" href="curso/licao.html?licao=${l.id}" aria-label="${T(l.title)}">
        <div class="aprender-card-top">
          <span class="aprender-card-glyph">${l.glyph}</span>
          <span class="aprender-card-badge ${homeBadge(l.badgeClass)}">${T(l.badge)}</span>
        </div>
        <div class="aprender-card-num">${T(l.kicker)}</div>
        <div class="aprender-card-title">${T(l.title)}</div>
        <div class="aprender-card-desc">${T(l.desc)}</div>
        <div class="aprender-card-meta">
          <span>⏱ ${T(l.dur)}</span>
          <span>${T(l.type)}</span>
        </div>
      </a>`).join('');
  }

  const tools = document.getElementById('aprenderTools');
  if (tools) {
    tools.innerHTML = APRENDER_TOOLS.map(t => `
      <a class="aprender-tool" href="${t.href}">
        <span class="aprender-tool-glyph${t.emoji ? ' emoji' : ''}">${t.glyph}</span>
        <span class="aprender-tool-info">
          <strong>${T(t.title)}</strong>
          <span>${T(t.desc)}</span>
        </span>
      </a>`).join('');
  }
}
