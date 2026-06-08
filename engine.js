// ============================================================
// ENGINE.JS — Motor compartilhado de todas as histórias
// Carregado APÓS script.js e o arquivo data/<historia>.js
// ============================================================

// ===== ESTADO GLOBAL DA HISTÓRIA =====
let state;
let STORY_ID;
let resumeScreen = null;

const t = (k) => I18N[state.lang][k] || k;

// ===== TTS =====
const TTS_PROXY = 'http://localhost:3001/api/tts';
const ttsCache = {};
let ttsAudio   = null;
let ttsStatus  = 'idle';
let toastTimer = null;

// ============================================================
// IDIOMA E UI
// ============================================================

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
    else if (state.screen === 'minigame') { root.innerHTML = renderMinigame(ch); attachMinigame(ch); }
  }

  saveState();
  if (moveFocus) root.focus();
  if (state.screen === 'story') maybeStoryTour();
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
      <p style="font-family:'Cinzel', serif; color:var(--terracotta-lt); letter-spacing:0.3em; font-size:13px; margin-bottom: 16px;">${t('splash-subtitle')}</p>
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
      <img src="${a.image}" alt="${escapeHtml(alt)}" loading="lazy" />
      <figcaption>${escapeHtml(caption)}</figcaption>
    </figure>
    <button class="btn ghost artifact-btn" onclick="openArtifact()">${t('artifact-btn')}</button>`;
}

function openArtifact() {
  state.modalView = 'artifact';
  renderModal();
  document.getElementById('modalOverlay').classList.add('open');
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
      <img src="${a.image}" alt="${escapeHtml(alt)}" />
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
        const msg = state.chapter === SERPENT_CHAPTER ? t('wrong-serpent') : t('wrong-default');
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

  if (firstTry) {
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

function startGame() { state.chapter = 0; state.screen = 'story'; state.score = 0; state.collected = new Array(ITEMS.length).fill(false); render(); scrollTop(); }
function restartGame() { state.chapter = 0; state.screen = 'splash'; state.score = 0; state.answered = false; state.attempts = 0; state.collected = new Array(ITEMS.length).fill(false); state.discoveredGlyphs = new Set(); state.codexHasNew = false; saveState(); render(); scrollTop(); }
function goMinigame() { ttsStop(); state.screen = 'minigame'; render(); scrollTop(); }
function nextChapter() { ttsStop(); state.chapter++; state.screen = 'story'; render(); scrollTop(); }

function goFinal() {
  ttsStop();
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

// ============================================================
// TTS (ElevenLabs via proxy)
// ============================================================

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
  document.getElementById('modalOverlay').classList.add('open');
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
  document.getElementById('modalOverlay').classList.add('open');
}

function openGlossary() {
  state.modalView = 'glossary';
  state.glossaryHighlight = null;
  state.glossarySearch = '';
  renderModal();
  document.getElementById('modalOverlay').classList.add('open');
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
  document.getElementById('modalOverlay').classList.add('open');
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

function closeModal() {
  state.modalView = null;
  state.glossaryHighlight = null;
  state.glossarySearch = '';
  document.getElementById('modalOverlay').classList.remove('open');
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
    discoveredGlyphs: new Set(),
    modalView: null,
    tutorialStep: 0,
    sheetIndex: 0,
    glossaryHighlight: null,
    glossarySearch: '',
    codexHasNew: false,
    shuffledOptions: []
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
