let isMuted = false;

function toggleSound() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;
  isMuted = !isMuted;
  audio.muted = isMuted;
  document.getElementById('btnSound').textContent = isMuted ? '🔇' : '🔊';
}

function playFeedback(type) {
  if (isMuted) return;
  const sound = document.getElementById(type === 'correct' ? 'soundCorrect' : 'soundWrong');
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
}

function toggleNote() {
  const note = document.getElementById('archaeoNote');
  const btn = document.getElementById('btnNote');
  if (note.style.display === 'block') {
    note.style.display = 'none';
    btn.textContent = t('note-open');
  } else {
    note.style.display = 'block';
    btn.textContent = t('note-close');
    if (window.Research) Research.trackEvent('notes');
  }
}

function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('musaeum-theme', next);
  const btn = document.getElementById('btnTheme');
  if (btn) btn.textContent = next === 'light' ? '🌙' : '☀';
}

function initTheme() {
  const saved = localStorage.getItem('musaeum-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('btnTheme');
  if (btn) btn.textContent = saved === 'light' ? '🌙' : '☀';
}

function getPlayerName() {
  try {
    const raw = localStorage.getItem('musaeum-player');
    return raw ? JSON.parse(raw).name : null;
  } catch(e) { return null; }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ===== ARMAZENAMENTO UNIFICADO =====
const STORE_KEY = 'musaeum-stories';

function storeGet(storyId) {
  try {
    const store = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    return store[storyId] || null;
  } catch(e) { return null; }
}

function storeSave(storyId, data) {
  try {
    const store = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    store[storyId] = data;
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch(e) {}
}

function migrateOldSaves() {
  const LEGACY = { 'musaeum-naufrago': 'naufrago', 'musaeum-sinuhe': 'sinuhe' };
  for (const [oldKey, storyId] of Object.entries(LEGACY)) {
    const raw = localStorage.getItem(oldKey);
    if (raw && !storeGet(storyId)) {
      try {
        storeSave(storyId, JSON.parse(raw));
        localStorage.removeItem(oldKey);
      } catch(e) {}
    }
  }
}

function initStoryApp(config) {
  const slots = config.inventory
    .map((icon, i) => `    <div class="inv-slot" id="slot-${i}" aria-hidden="true">${icon}</div>`)
    .join('\n');

  document.body.innerHTML = `
<audio id="bgMusic" loop>
  <source src="assets/audio/trilha_naufrago.mp3" type="audio/mpeg">
</audio>
<audio id="soundCorrect">
  <source src="assets/audio/acerto.wav" type="audio/wav">
</audio>
<audio id="soundWrong">
  <source src="assets/audio/erro.wav" type="audio/wav">
</audio>

<div class="score-hud" id="scoreHud" style="display:none;">
  <span data-i18n="score-label">PONTOS</span>: <span class="num" id="scoreDisplay">0</span>
</div>

<div class="discovery-toast" id="discoveryToast" onclick="onToastClick()" role="status" aria-live="polite">
  <div class="toast-glyph" id="toastGlyph" aria-hidden="true">𓋹</div>
  <div class="toast-text">
    <div class="toast-title" id="toastTitle"></div>
    <div class="toast-sub" id="toastSub"></div>
  </div>
</div>

<div class="app">
  <div class="topbar">
    <div class="topbar-left">
      <a href="index.html" class="btn-back" id="btnBack" aria-label="Voltar para a Biblioteca" title="Voltar para a Biblioteca">⟵</a>
      <div class="brand"><span id="brandText"></span></div>
    </div>
    <div class="topbar-right">
      <div class="lang-toggle" role="group" aria-label="Language / Idioma">
        <button class="active" id="btn-pt" onclick="setLang('pt')" aria-pressed="true">PT</button>
        <button id="btn-en" onclick="setLang('en')" aria-pressed="false">EN</button>
      </div>
      <button id="btnCodex" class="ref-btn" onclick="openCodex()" aria-label="Codex dos Hieróglifos" style="display:none;">
        <span class="ref-icon" aria-hidden="true">📜</span>
        <span class="ref-label" id="codexBtnLabel"></span>
        <span class="ref-count" id="codexCount">0/9</span>
      </button>
      <button id="btnGlossary" class="ref-btn" onclick="openGlossary()" aria-label="Glossário" style="display:none;">
        <span class="ref-icon" aria-hidden="true">📖</span>
        <span class="ref-label" id="glossaryBtnLabel"></span>
      </button>
      <button id="btnTheme" class="btn-theme" onclick="toggleTheme()" aria-label="Alternar tema claro/escuro" title="Tema claro/escuro">☀</button>
      <button id="btnSound" class="btn-sound" onclick="toggleSound()" aria-label="Ativar ou desativar som">🔊</button>
    </div>
  </div>

  <div class="inventory-hud" id="inventoryHud" style="display:none;" aria-label="Tesouros coletados">
${slots}
  </div>

  <div class="progress" id="progressBar" style="display:none;"></div>
  <div id="sceneContainer" tabindex="-1"></div>
</div>

<div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onclick="onOverlayClick(event)">
  <div class="modal-content" id="modalContent" role="document">
    <button class="modal-close" id="modalClose" onclick="closeModal()" aria-label="Fechar">✕</button>
    <div id="modalBody"></div>
  </div>
</div>`;

  initTheme();
}
