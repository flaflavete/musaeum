// ============================================================
// ENGINE.JS: Motor compartilhado de todas as histórias
// Carregado APÓS script.js e o arquivo data/<historia>.js
// ============================================================

// ===== ESTADO GLOBAL DA HISTÓRIA =====
let state;
let STORY_ID;
let resumeScreen = null;

const t = (k) => I18N[state.lang][k] || k;

let toastTimer = null;

// ============================================================
// IDIOMA E UI
// ============================================================

function setLang(lang) {
  state.lang = lang;
  // Persiste a preferência compartilhada: trocar o idioma dentro da
  // história vale também para a biblioteca e as outras páginas.
  try { localStorage.setItem('musaeum-lang', lang); } catch (e) {}
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  const btnPt = document.getElementById('btn-pt');
  const btnEn = document.getElementById('btn-en');
  btnPt.classList.toggle('active', lang === 'pt');
  btnEn.classList.toggle('active', lang === 'en');
  btnPt.setAttribute('aria-pressed', lang === 'pt');
  btnEn.setAttribute('aria-pressed', lang === 'en');
  document.getElementById('brandText').textContent = t('brand');
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
  for (let i = 0; i < ITEMS.length; i++) {
    const slot = document.getElementById(`slot-${i}`);
    if (slot) slot.classList.toggle('found', state.collected[i]);
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

// ============================================================
// TOAST DE DESCOBERTA
// ============================================================

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

function discoverGlyph(idx) {
  if (state.discoveredGlyphs.has(idx)) return;
  state.discoveredGlyphs.add(idx);
  updateCodexCount();
  if (state.screen !== 'splash') {
    showDiscoveryToast(idx);
  }
}

// ============================================================
// RENDER PRINCIPAL
// ============================================================

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
    else if (state.screen === 'minigame') {
      root.innerHTML = renderMinigame(ch);
      // Desafio já respondido e com resultado guardado (ex.: troca de idioma
      // ou recarga da página): restaura o feedback sem reiniciar. Senão,
      // arma os cliques de um desafio novo.
      if (state.answered && state.answerResult) restoreAnsweredMinigame();
      else attachMinigame(ch);
    }
  }

  activateGloss(root);
  saveState();
  if (moveFocus) root.focus();
  if (state.screen === 'story') maybeStoryTour();
}

// ===== TERMOS DO GLOSSÁRIO (.gloss) =====
// Os spans nos textos carregam só data-gloss="id" (ou data-artifact);
// foco e clique são resolvidos aqui, sem handlers inline repetidos.
function activateGloss(container) {
  if (!container || !container.querySelectorAll) return;
  container.querySelectorAll('.gloss').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
  });
  container.querySelectorAll('.achado-ref').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-expanded', 'false');
  });
}

function handleGloss(target) {
  const a = target && target.closest ? target.closest('.achado-ref') : null;
  if (a) { toggleAchado(a); return true; }
  const g = target && target.closest ? target.closest('.gloss') : null;
  if (!g) return false;
  if (g.dataset && g.dataset.gloss) openGlossaryAt(g.dataset.gloss);
  else if (g.hasAttribute && g.hasAttribute('data-artifact')) openArtifact();
  else return false;
  return true;
}

document.addEventListener('click', (e) => { handleGloss(e.target); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  if (handleGloss(e.target)) e.preventDefault();
});

// ===== ACHADOS NAS NOTAS (.achado-ref) =====
// Algumas notas citam um objeto real registrado em ACHADOS
// (data/cultura-material.js). O clique no span revela um cartão
// com a foto e a referência de acervo. De propósito não há contador
// nem coleção: o achado é só o momento da descoberta.
function toggleAchado(el) {
  const reg = (typeof ACHADOS !== 'undefined' && ACHADOS[STORY_ID]) ? ACHADOS[STORY_ID] : null;
  const id = el.dataset ? el.dataset.achado : null;
  const a = reg && id ? reg[id] : null;
  const note = el.closest ? el.closest('.archaeo-note') : null;
  if (!a || !note) return;

  const open = note.querySelector('.achado-card');
  if (open) {
    const sameId = open.dataset.achado === id;
    open.remove();
    note.querySelectorAll('.achado-ref').forEach(s => s.setAttribute('aria-expanded', 'false'));
    if (sameId) return;
  }

  const pt = state.lang === 'pt';
  const card = document.createElement('div');
  card.className = 'achado-card';
  card.dataset.achado = id;
  card.innerHTML = `
    <div class="achado-corpo">
      <img src="${a.image}" alt="${pt ? a.altPt : a.altEn}" loading="lazy" />
      <div>
        <div class="achado-kicker">${t('achado-kicker')}</div>
        <div class="achado-nome">${pt ? a.namePt : a.nameEn}</div>
        <div class="achado-info">${pt ? a.refPt : a.refEn}</div>
        <div class="achado-credito">${pt ? a.creditPt : a.creditEn}</div>
      </div>
    </div>
    ${a.url ? `<div class="achado-rodape"><a href="${a.url}" target="_blank" rel="noopener">${t('achado-link')}</a></div>` : ''}`;
  note.appendChild(card);
  el.setAttribute('aria-expanded', 'true');
}

// ===== TOUR GUIADO DA HISTÓRIA =====
// Aponta os recursos da leitura: glossário, códex, nota arqueológica e trilha.
function startStoryTour() {
  if (!window.Tour || Tour.isActive()) return;
  const allSteps = [
    { selector: '#btnGlossary',  title: t('tour-s1-title'), body: t('tour-s1-body') },
    { selector: '#btnCodex',     title: t('tour-s2-title'), body: t('tour-s2-body') },
    { selector: '#btnSound',     title: t('tour-s3-title'), body: t('tour-s3-body') },
    { selector: '#inventoryHud', title: t('tour-s4-title'), body: t('tour-s4-body') },
    { selector: '#btnNote',      title: t('tour-s5-title'), body: t('tour-s5-body') },
    { selector: '#btnChallenge', title: t('tour-s6-title'), body: t('tour-s6-body') },
  ];
  // Só aponta o que estiver realmente visível na tela atual
  const steps = allSteps.filter(s => {
    const el = document.querySelector(s.selector);
    return el && el.offsetParent !== null;
  });
  if (!steps.length) return;
  Tour.start(steps, {
    labels: { skip: t('tour-skip'), prev: t('tour-prev'), next: t('tour-next'), done: t('tour-done') }
  });
}

// Dispara o tour automaticamente na primeira vez que o leitor chega à história.
function maybeStoryTour() {
  const key = 'musaeum-tour-' + STORY_ID;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, 'seen');
  setTimeout(startStoryTour, 700); // deixa a cena e o scroll assentarem
}

function renderSplash() {
  const name = getPlayerName();
  const greeting = name
    ? `<p style="font-family:'EB Garamond','Noto Serif',serif; font-style:italic; color:var(--papyrus-soft); font-size:16px; margin-bottom:44px;">${t('splash-welcome')}<strong>${escapeHtml(name)}</strong></p>`
    : '';
  return `
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:70vh; text-align:center;">
      <p style="font-family:'Cinzel', serif; font-weight:700; color:var(--terracotta-lt); letter-spacing:0.2em; font-size:clamp(20px, 3.2vw, 28px); margin-bottom: 22px; text-transform:uppercase;">${t('splash-subtitle')}</p>
      <p style="font-family:'EB Garamond','Noto Serif',serif; font-style:italic; color:var(--papyrus-dim); font-size:15px; max-width:480px; line-height:1.6; margin-bottom: 28px;">${t('splash-desc')}</p>
      ${renderArtifactStrip()}
      ${greeting}
      <button class="btn gold" onclick="enterGame()">${t('enter')} →</button>
    </div>`;
}

// Ficha de cultura material da história atual (foto do papiro + dados de catálogo).
function artifact() {
  return (typeof CULTURA_MATERIAL !== 'undefined') ? CULTURA_MATERIAL[STORY_ID] : null;
}

// Faixa elegante na tela de entrada: a foto real do manuscrito, legenda e
// um botão que abre a ficha completa de proveniência.
function renderArtifactStrip() {
  const a = artifact();
  if (!a) return '';
  const alt = state.lang === 'pt' ? a.imageAltPt : a.imageAltEn;
  const caption = state.lang === 'pt' ? a.captionPt : a.captionEn;
  return `
    <figure class="artifact-strip">
      <img src="${a.image}" alt="${escapeHtml(alt)}" loading="lazy" onerror="this.parentElement.style.display='none'" />
      <figcaption>${escapeHtml(caption)}</figcaption>
    </figure>
    <button class="btn ghost artifact-btn" onclick="openArtifact()">${t('artifact-btn')}</button>`;
}

function openArtifact() {
  state.modalView = 'artifact';
  renderModal();
  showOverlay();
  document.getElementById('modalClose').focus();
  if (window.Research) Research.trackEvent('artifact');
}

function renderArtifactView() {
  const a = artifact();
  if (!a) return '';
  const alt     = state.lang === 'pt' ? a.imageAltPt : a.imageAltEn;
  const subtitle= state.lang === 'pt' ? a.titlePt    : a.titleEn;
  const intro   = state.lang === 'pt' ? a.introPt    : a.introEn;
  const credit  = state.lang === 'pt' ? a.creditPt   : a.creditEn;

  const rows = a.fields.map(f => {
    const label = state.lang === 'pt' ? f.labelPt : f.labelEn;
    const value = state.lang === 'pt' ? f.valuePt : f.valueEn;
    return `
      <div class="sheet-row">
        <div class="row-label">${label}</div>
        <div class="row-value">${value}</div>
      </div>`;
  }).join('');

  const museumLink = a.museumUrl
    ? `<a class="btn ghost" href="${a.museumUrl}" target="_blank" rel="noopener">${t('artifact-museum')}</a>`
    : '';

  return `
    <h2 class="modal-title" id="modalTitle">${t('artifact-title')}</h2>
    <p class="modal-subtitle">${subtitle}</p>
    <figure class="artifact-photo">
      <img src="${a.image}" alt="${escapeHtml(alt)}" onerror="this.parentElement.style.display='none'" />
      <figcaption>${credit}</figcaption>
    </figure>
    <p class="artifact-intro">${intro}</p>
    <div class="sheet-rows">${rows}</div>
    <div class="codex-actions">
      ${museumLink}
      <button class="btn ghost" onclick="closeModal()">${t('codex-close')}</button>
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

      <div class="actions"><button class="btn" id="btnChallenge" onclick="goMinigame()">${t('challenge')} →</button></div>
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
  // Só embaralha ao entrar no desafio (goMinigame zera shuffledOptions).
  // Em re-renders (trocar idioma, restaurar resposta) reaproveita a ordem
  // já sorteada, para não reiniciar o desafio nem as opções pularem de lugar.
  if (!state.shuffledOptions || !state.shuffledOptions.length) {
    state.shuffledOptions = shuffleArray(q.options);
  }
  return `
    <div class="scene">
      <div class="chapter-label">${t('challenge-count')} ${state.chapter + 1}/${CHAPTERS.length}</div>
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
  // answered/attempts são zerados em goMinigame ao entrar no desafio.
  // Aqui só armamos os cliques, para que re-renders (troca de idioma no
  // meio de tentativas) preservem a contagem de tentativas.
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
        const msg = state.chapter === SERPENT_CHAPTER ? t('wrong-serpent') : t('wrong-default');
        document.getElementById('feedbackSlot').innerHTML = `<div class="feedback danger"><strong class="label">${t('warning')}</strong>${msg}</div>`;
        setTimeout(() => el.classList.remove('wrong'), 700);
      }
    };
  });
}

function onAnswer(isCorrect, q, firstTry) {
  state.answered = true;
  // Capítulo já respondido antes (ex.: a página foi recarregada no meio
  // do desafio): mostra o conteúdo de novo, mas não soma pontos nem
  // coleta tesouro outra vez.
  const repeat = state.answeredChapters[state.chapter] === true;
  state.answeredChapters[state.chapter] = true;
  const earned = repeat ? 0 : (firstTry ? 20 : (state.attempts === 1 ? 10 : (state.attempts === 2 ? 5 : 2)));
  state.score += earned;

  const collects = firstTry && !repeat;
  if (collects) {
    state.collected[state.chapter] = true;
  }

  // Guarda o resultado para reconstruir o feedback em re-renders (troca de
  // idioma, recarga da página) sem somar pontos nem coletar o tesouro de novo.
  state.answerResult = { earned, repeat, collects };

  updateInventoryUI();
  renderAnswerFeedback();
  saveState();
}

// Monta o feedback de acerto (pontos, tesouro, curiosidade e botão de avançar)
// a partir de state.answerResult. Reexecutável: lê o idioma atual, então
// trocar de idioma reescreve o texto sem reiniciar o desafio.
function renderAnswerFeedback() {
  const r = state.answerResult;
  const slot = document.getElementById('feedbackSlot');
  const action = document.getElementById('actionSlot');
  if (!r || !slot || !action) return;

  const ch = CHAPTERS[state.chapter];
  const q = ch && ch.question ? ch.question : null;
  const fact = q ? (state.lang === 'pt' ? q.factPt : q.factEn) : '';
  const itemName = state.lang === 'pt' ? ITEMS[state.chapter].pt : ITEMS[state.chapter].en;
  const collectionMsg = r.collects ? `<br><b>${t('treasure-got')}: ${itemName}!</b>` : '';
  const pointsMsg = r.repeat ? '' : `+${r.earned} ${t('points')}. `;

  slot.innerHTML = `<div class="feedback good"><strong class="label">${t('correct')}</strong>${pointsMsg}${collectionMsg} <div style="margin-top:8px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px; font-style:italic;">${fact}</div></div>`;
  const isLast = state.chapter >= CHAPTERS.length - 1;
  const nextLabel = isLast ? t('see-final') : t('next-chapter');
  action.innerHTML = `<button class="btn gold" onclick="${isLast ? 'goFinal()' : 'nextChapter()'}">${nextLabel} →</button>`;
}

// Re-render de um desafio já respondido: destaca a opção correta e remonta
// o feedback. Os botões ficam sem handler (não foram rearmados), então não
// há como responder de novo.
function restoreAnsweredMinigame() {
  document.querySelectorAll('.choice').forEach(el => {
    const opt = state.shuffledOptions[+el.dataset.idx];
    if (opt && opt.correct) el.classList.add('correct');
  });
  renderAnswerFeedback();
}

function startGame() { state.chapter = 0; state.screen = 'story'; state.score = 0; state.answered = false; state.attempts = 0; state.answerResult = null; state.shuffledOptions = []; state.collected = new Array(ITEMS.length).fill(false); state.answeredChapters = new Array(CHAPTERS.length).fill(false); render(); scrollTop(); }
function restartGame() { state.chapter = 0; state.screen = 'splash'; state.score = 0; state.answered = false; state.attempts = 0; state.answerResult = null; state.shuffledOptions = []; state.collected = new Array(ITEMS.length).fill(false); state.answeredChapters = new Array(CHAPTERS.length).fill(false); state.discoveredGlyphs = new Set(); state.codexHasNew = false; saveState(); render(); scrollTop(); }
function goMinigame() {
  state.screen = 'minigame';
  // Entrada limpa: zera resposta/tentativas e sorteia uma nova ordem para
  // as opções deste capítulo (shuffledOptions vazio força novo sorteio).
  state.answered = false;
  state.attempts = 0;
  state.answerResult = null;
  state.shuffledOptions = shuffleArray(CHAPTERS[state.chapter].question.options);
  render();
  scrollTop();
}
function nextChapter() { state.chapter++; state.screen = 'story'; render(); scrollTop(); }

function goFinal() {
  state.screen = 'final';
  if (window.Research) Research.trackComplete({
    storyId:  STORY_ID,
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

function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ============================================================
// CÓDICE, FICHA, TUTORIAL E GLOSSÁRIO
// ============================================================

function updateCodexCount() {
  const el = document.getElementById('codexCount');
  if (el) el.textContent = `${state.discoveredGlyphs.size}/${GLYPHS_CODEX.length}`;
  const btn = document.getElementById('btnCodex');
  if (btn) btn.setAttribute('aria-label', t('codex-label') + ': ' + state.discoveredGlyphs.size + '/' + GLYPHS_CODEX.length);
}

function openCodex() {
  state.modalView = 'codex';
  state.codexHasNew = false;
  updateCodexButton();
  renderModal();
  showOverlay();
  setTimeout(() => document.getElementById('modalClose').focus(), 50);
  if (window.Research) Research.trackEvent('codex');
}

function openGlyphSheet(idx) {
  if (!state.discoveredGlyphs.has(idx)) return;
  state.modalView = 'sheet';
  state.sheetIndex = idx;
  renderModal();
}

function openTutorial() {
  state.modalView = 'tutorial';
  state.tutorialStep = 0;
  renderModal();
  showOverlay();
}

function openGlossary() {
  state.modalView = 'glossary';
  state.glossaryHighlight = null;
  state.glossarySearch = '';
  renderModal();
  showOverlay();
  setTimeout(() => {
    const searchInput = document.getElementById('glossarySearchInput');
    if (searchInput) searchInput.focus();
  }, 80);
  if (window.Research) Research.trackEvent('glossary');
}

function openGlossaryAt(termId) {
  state.modalView = 'glossary';
  state.glossaryHighlight = termId;
  state.glossarySearch = '';
  renderModal();
  showOverlay();
  if (window.Research) Research.trackEvent('glossary');
  setTimeout(() => {
    const target = document.getElementById('gloss-' + termId);
    if (target) {
      target.classList.add('highlighted');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}

function filterGlossary() {
  const input = document.getElementById('glossarySearchInput');
  if (!input) return;
  state.glossarySearch = input.value.toLowerCase().trim();
  const listEl = document.getElementById('glossaryListContainer');
  if (listEl) listEl.innerHTML = renderGlossaryList();
}

// Abre o overlay do modal e isola o resto da página (inert): Tab e
// leitores de tela ficam restritos ao conteúdo do modal.
function showOverlay() {
  document.getElementById('modalOverlay').classList.add('open');
  const app = document.querySelector('.app');
  if (app) app.inert = true;
}

function closeModal() {
  state.modalView = null;
  state.glossaryHighlight = null;
  state.glossarySearch = '';
  document.getElementById('modalOverlay').classList.remove('open');
  const app = document.querySelector('.app');
  if (app) app.inert = false;
  const btnCodex = document.getElementById('btnCodex');
  if (btnCodex && btnCodex.style.display !== 'none') btnCodex.focus();
}

function onOverlayClick(event) {
  if (event.target.id === 'modalOverlay') closeModal();
}

function tutorialNext() {
  if (state.tutorialStep < 2) {
    state.tutorialStep++;
    renderModal();
  } else {
    state.modalView = 'codex';
    renderModal();
  }
}

function tutorialPrev() {
  if (state.tutorialStep > 0) {
    state.tutorialStep--;
    renderModal();
  }
}

function renderModal() {
  const body = document.getElementById('modalBody');
  if (!body) return;
  if (state.modalView === 'codex')         body.innerHTML = renderCodexView();
  else if (state.modalView === 'sheet')    body.innerHTML = renderSheetView();
  else if (state.modalView === 'tutorial') body.innerHTML = renderTutorialView();
  else if (state.modalView === 'glossary') body.innerHTML = renderGlossaryView();
  else if (state.modalView === 'artifact') body.innerHTML = renderArtifactView();
  activateGloss(body);
}

function renderCodexView() {
  const tiles = GLYPHS_CODEX.map((g, idx) => {
    const discovered = state.discoveredGlyphs.has(idx);
    if (discovered) {
      const name = state.lang === 'pt' ? g.namePt : g.nameEn;
      return `<button class="codex-tile" onclick="openGlyphSheet(${idx})" aria-label="${name}">
        <div class="tile-glyph" aria-hidden="true">${g.glyph}</div>
        <div class="tile-translit">${g.translit}</div>
      </button>`;
    }
    return `<button class="codex-tile locked" disabled aria-label="${t('codex-locked')}">
      <div class="tile-glyph" aria-hidden="true">${g.glyph}</div>
      <div class="tile-translit">? ? ?</div>
    </button>`;
  }).join('');

  return `
    <h2 class="modal-title" id="modalTitle">${t('codex-title')}</h2>
    <p class="modal-subtitle">${t('codex-subtitle')}</p>
    <div class="codex-progress">${state.discoveredGlyphs.size} / ${GLYPHS_CODEX.length} ${t('codex-progress')}</div>
    <div class="codex-grid">${tiles}</div>
    <div class="codex-actions">
      <button class="btn" onclick="openTutorial()">${t('codex-tutorial')}</button>
      <button class="btn ghost" onclick="closeModal()">${t('codex-close')}</button>
    </div>`;
}

function renderSheetView() {
  const idx = state.sheetIndex;
  const g = GLYPHS_CODEX[idx];
  const name = state.lang === 'pt' ? g.namePt : g.nameEn;
  const meaning = state.lang === 'pt' ? g.meaningPt : g.meaningEn;
  const note = state.lang === 'pt' ? g.notePt : g.noteEn;
  const type = t(g.typeKey);
  const chapterLabel = g.chapter === -1
    ? (state.lang === 'pt' ? 'Introdução' : 'Introduction')
    : `${t('chapter')} ${g.chapter + 1}`;

  return `
    <h2 class="modal-title" id="modalTitle">${name}</h2>
    <div class="glyph-sheet">
      <div class="sheet-big" aria-hidden="true">${g.glyph}</div>
      <div class="sheet-translit">${g.translit}</div>
      <div class="sheet-name">${name}</div>
      <div class="sheet-rows">
        <div class="sheet-row">
          <div class="row-label">${t('sheet-type')}</div>
          <div class="row-value">${type}</div>
        </div>
        <div class="sheet-row">
          <div class="row-label">${t('sheet-meaning')}</div>
          <div class="row-value">${meaning}</div>
        </div>
        <div class="sheet-row">
          <div class="row-label">${t('sheet-appears')}</div>
          <div class="row-value">${chapterLabel}</div>
        </div>
        <div class="sheet-row">
          <div class="row-label">${t('sheet-note')}</div>
          <div class="row-value">${note}</div>
        </div>
      </div>
    </div>
    <div class="codex-actions">
      <button class="btn ghost" onclick="state.modalView='codex'; renderModal();">${t('sheet-back')}</button>
    </div>`;
}

function renderTutorialView() {
  const step = state.tutorialStep;
  let content = '';
  if (step === 0) {
    content = `
      <div class="tutorial-step">
        <h3>${t('tut-s1-title')}</h3>
        <p>${t('tut-s1-body')}</p>
        <div class="tutorial-examples">
          <div class="tutorial-chip">
            <div class="chip-glyph" aria-hidden="true">𓇳</div>
            <div class="chip-label">${t('tut-s1-c1-label')}</div>
            <div class="chip-desc">${t('tut-s1-c1-desc')}</div>
          </div>
          <div class="tutorial-chip">
            <div class="chip-glyph" aria-hidden="true">𓉐</div>
            <div class="chip-label">${t('tut-s1-c2-label')}</div>
            <div class="chip-desc">${t('tut-s1-c2-desc')}<br/><i>pr</i></div>
          </div>
          <div class="tutorial-chip">
            <div class="chip-glyph" aria-hidden="true">𓈗</div>
            <div class="chip-label">${t('tut-s1-c3-label')}</div>
            <div class="chip-desc">${t('tut-s1-c3-desc')}</div>
          </div>
        </div>
      </div>`;
  } else if (step === 1) {
    content = `
      <div class="tutorial-step">
        <h3>${t('tut-s2-title')}</h3>
        <p>${t('tut-s2-body')}</p>
        <div class="tutorial-examples">
          <div class="tutorial-chip">
            <div class="chip-glyph" aria-hidden="true">𓂀 →</div>
            <div class="chip-desc">${state.lang === 'pt' ? 'olha para a esquerda: lê-se da esquerda' : 'faces left: read from the left'}</div>
          </div>
          <div class="tutorial-chip">
            <div class="chip-glyph" aria-hidden="true">← 𓃾</div>
            <div class="chip-desc">${state.lang === 'pt' ? 'olha para a direita: lê-se da direita' : 'faces right: read from the right'}</div>
          </div>
        </div>
        <p>${t('tut-s2-body2')}</p>
      </div>`;
  } else {
    content = `
      <div class="tutorial-step">
        <h3>${t('tut-s3-title')}</h3>
        <p>${t('tut-s3-body')}</p>
        <div class="tutorial-examples">
          <div class="tutorial-chip" style="min-width: 200px;">
            <div class="chip-glyph" aria-hidden="true" style="font-size: 34px;">𓍹𓊪𓏏𓅱𓃭𓅓𓇌𓋴𓍺</div>
            <div class="chip-desc">${state.lang === 'pt' ? 'Cartucho de Ptolomeu' : 'Cartouche of Ptolemy'}</div>
          </div>
        </div>
        <p>${t('tut-s3-body2')}</p>
      </div>`;
  }

  const dots = [0,1,2].map(i => `<div class="tutorial-dot ${i === step ? 'active' : ''}"></div>`).join('');
  const nextLabel = step === 2 ? t('tut-done') : t('tut-next');
  const prevBtn = step > 0 ? `<button class="btn ghost" onclick="tutorialPrev()">${t('tut-prev')}</button>` : '<div></div>';

  return `
    <h2 class="modal-title" id="modalTitle">${t('tutorial-title')}</h2>
    <p class="modal-subtitle">${t('tutorial-sub')}</p>
    ${content}
    <div class="tutorial-nav">
      ${prevBtn}
      <div class="tutorial-dots" aria-hidden="true">${dots}</div>
      <button class="btn" onclick="tutorialNext()">${nextLabel}</button>
    </div>`;
}

function renderGlossaryView() {
  return `
    <h2 class="modal-title" id="modalTitle">${t('glossary-title')}</h2>
    <p class="modal-subtitle">${t('glossary-subtitle')}</p>
    <div class="glossary-search-wrap">
      <input type="text" id="glossarySearchInput" class="glossary-search"
             placeholder="${t('glossary-search')}"
             value="${escapeHtml(state.glossarySearch)}"
             oninput="filterGlossary()"
             aria-label="${t('glossary-search')}" />
    </div>
    <div id="glossaryListContainer">${renderGlossaryList()}</div>
    <div class="codex-actions">
      <button class="btn ghost" onclick="closeModal()">${t('codex-close')}</button>
    </div>`;
}

function renderGlossaryList() {
  const search = state.glossarySearch || '';
  const filtered = GLOSSARY
    .map(g => ({
      ...g,
      _term: state.lang === 'pt' ? g.termPt : g.termEn,
      _def:  state.lang === 'pt' ? g.defPt  : g.defEn,
      _tag:  state.lang === 'pt' ? g.tagPt  : g.tagEn
    }))
    .filter(g => {
      if (!search) return true;
      const haystack = (g._term + ' ' + g._def + ' ' + g._tag).toLowerCase();
      return haystack.includes(search);
    })
    .sort((a, b) => a._term.localeCompare(b._term, state.lang === 'pt' ? 'pt-BR' : 'en'));

  if (filtered.length === 0) {
    return `<div class="glossary-empty">${t('glossary-empty')}</div>`;
  }

  let html = '<div class="glossary-list">';
  let currentLetter = '';
  filtered.forEach(g => {
    const firstLetter = g._term.charAt(0).toUpperCase();
    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      html += `<div class="glossary-letter">${currentLetter}</div>`;
    }
    const highlightCls = state.glossaryHighlight === g.id ? 'highlighted' : '';
    html += `
      <div class="glossary-entry ${highlightCls}" id="gloss-${g.id}">
        <div class="gloss-term-name">${g._term} <span class="gloss-tag">${g._tag}</span></div>
        <div class="gloss-def">${g._def}</div>
      </div>`;
  });
  html += '</div>';
  return html;
}

// ============================================================
// PERSISTÊNCIA
// ============================================================

function saveState() {
  try {
    storeSave(STORY_ID, {
      lang:             state.lang,
      screen:           state.screen,
      chapter:          state.chapter,
      score:            state.score,
      answered:         state.answered,
      attempts:         state.attempts,
      collected:        state.collected,
      answeredChapters: state.answeredChapters,
      answerResult:     state.answerResult,
      discoveredGlyphs: [...state.discoveredGlyphs],
      codexHasNew:      state.codexHasNew
    });
  } catch(e) {}
}

function loadState() {
  try {
    const d = storeGet(STORY_ID);
    if (!d) return false;
    state.lang             = d.lang             ?? state.lang;
    resumeScreen           = (d.screen && d.screen !== 'splash') ? d.screen : null;
    state.screen           = 'splash';
    state.chapter          = d.chapter          ?? state.chapter;
    state.score            = d.score            ?? state.score;
    state.answered         = d.answered         ?? state.answered;
    state.attempts         = d.attempts         ?? state.attempts;
    state.collected        = d.collected        ?? state.collected;
    state.answeredChapters = d.answeredChapters ?? state.answeredChapters;
    state.answerResult     = d.answerResult     ?? null;
    // Save antigo, sem answerResult: se o desafio estava respondido, deixa
    // respondê-lo de novo (a proteção de repeat impede pontuar duas vezes),
    // assim nunca fica preso num desafio sem botão de avançar.
    if (state.answered && !state.answerResult) state.answered = false;
    state.discoveredGlyphs = new Set(d.discoveredGlyphs ?? []);
    state.codexHasNew      = d.codexHasNew      ?? state.codexHasNew;
    return true;
  } catch(e) {
    return false;
  }
}

// ============================================================
// TECLADO
// ============================================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state && state.modalView) closeModal();
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================

function initStory(config) {
  STORY_ID = config.storyId;

  state = {
    lang: 'pt',
    screen: 'splash',
    chapter: 0,
    score: 0,
    answered: false,
    attempts: 0,
    collected: new Array(ITEMS.length).fill(false),
    answeredChapters: new Array(CHAPTERS.length).fill(false),
    discoveredGlyphs: new Set(),
    modalView: null,
    tutorialStep: 0,
    sheetIndex: 0,
    glossaryHighlight: null,
    glossarySearch: '',
    codexHasNew: false,
    shuffledOptions: [],
    answerResult: null
  };

  initStoryApp({ inventory: ITEMS.map(i => i.icon) });
  migrateOldSaves();
  loadState();
  const _sharedLang = localStorage.getItem('musaeum-lang');
  if (_sharedLang) state.lang = _sharedLang;
  setLang(state.lang);

  if (window.Research) {
    Research.init();
    Research.watchAbandonment({
      storyId:  STORY_ID,
      maxScore: CHAPTERS.length * 20,
      getState: () => state,
    });
  }
}
