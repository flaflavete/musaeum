/* Baralho de sinais: ferramenta de prática de leitura (curso/baralho.html).
   Aparece um sinal; a pessoa soletra o fonema tocando o alfabeto de
   transliteração (as 24 letras uni-líteras bastam para escrever qualquer
   leitura, inclusive bi e trilíteros). Fonte única dos sinais: gardiner/.

   Baralho = FONOGRAMAS de valor único, soletráveis no teclado:
     func contém 'P'  E  fonema sem barra '|'  E  todo char está no alfabeto.
   Níveis: 'uni' (1 consoante), 'unibi' (até 2), 'tudo' (uni+bi+tri+quad).
   Sem persistência de placar (sessão só); guarda só o nível escolhido. */

(function () {
  'use strict';

  /* alfabeto de transliteração, na ordem convencional da egiptologia */
  var ALPHA = ['ꜣ', 'ỉ', 'y', 'ꜥ', 'w', 'b', 'p', 'f', 'm', 'n', 'r', 'h',
               'ḥ', 'ḫ', 'ẖ', 's', 'š', 'ḳ', 'k', 'g', 't', 'ṯ', 'd', 'ḏ'];
  var ALPHASET = {}; ALPHA.forEach(function (c) { ALPHASET[c] = 1; });

  var lang  = localStorage.getItem('musaeum-lang') || 'pt';
  var level = localStorage.getItem('musaeum-baralho-nivel') || 'unibi';

  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function el(id) { return document.getElementById(id); }

  /* ── dados ────────────────────────────────────────── */
  function rows() { return (lang === 'pt' ? window.GARDINER_DATA : window.GARDINER_DATA_EN) || []; }

  function spellable(phon) {
    for (var i = 0; i < phon.length; i++) { if (!ALPHASET[phon[i]]) return false; }
    return true;
  }
  function buildPool() {
    return rows().filter(function (r) {
      var phon = r[2];
      return r[4] && r[4].indexOf('P') >= 0 && phon && phon.indexOf('|') < 0 && spellable(phon);
    });
  }
  function levelPool() {
    var pool = buildPool();
    if (level === 'uni')   return pool.filter(function (r) { return r[2].length === 1; });
    if (level === 'unibi') return pool.filter(function (r) { return r[2].length <= 2; });
    return pool;
  }

  /* ── estado ───────────────────────────────────────── */
  var st = { queue: [], card: null, answer: [], done: false, hinted: false,
             flipping: false, hits: 0, seen: 0, streak: 0, best: 0 };

  var FLIP_MS = 550;
  var noMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function drawNext() {
    var prev = st.card;
    if (!st.queue.length) st.queue = shuffle(levelPool());
    var card = st.queue.pop();
    if (card && prev && card[0] === prev[0] && st.queue.length) {
      st.queue.unshift(card);
      card = st.queue.pop();
    }
    st.card = card || null;
    st.answer = []; st.done = false; st.hinted = false;
  }

  /* ── i18n miúdo ───────────────────────────────────── */
  var pt = lang === 'pt';
  function T(p, e) { return pt ? p : e; }

  /* ── chrome (cabeçalho igual ao do curso) ─────────── */
  function backArrow() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>';
  }
  function renderHeader() {
    var langLabel = pt ? 'EN' : 'PT';
    var langAria = pt ? 'Switch to English' : 'Mudar para português';
    el('deckHeader').innerHTML =
      '<a class="licao-back" href="index.html">' + backArrow() + ' ' + T('Índice', 'Index') + '</a>' +
      '<span class="licao-header-title">' + T('Baralho de sinais', 'Sign deck') + '</span>' +
      '<div class="header-actions">' +
        '<button class="icon-btn" id="langToggle" aria-label="' + esc(langAria) + '">' + langLabel + '</button>' +
        '<button class="icon-btn" id="themeToggle" aria-label="' + esc(T('Alternar tema', 'Toggle theme')) + '" title="' + esc(T('Tema', 'Theme')) + '">◐</button>' +
      '</div>';
  }

  /* ── página ───────────────────────────────────────── */
  function levelBtns() {
    var opts = [
      { id: 'uni',   label: T('Só unilíteros', 'Uniliterals only') },
      { id: 'unibi', label: T('Uni + bilíteros', 'Uni + biliterals') },
      { id: 'tudo',  label: T('Tudo', 'Everything') },
    ];
    return opts.map(function (o) {
      return '<button class="deck-level-btn' + (o.id === level ? ' active' : '') +
             '" data-level="' + o.id + '"' + (o.id === level ? ' aria-current="true"' : '') + '>' +
             esc(o.label) + '</button>';
    }).join('');
  }

  /* verso da carta: mesma linguagem visual do ícone do Musæum (fundo azul-noite,
     moldura dourada dupla, pontinhos de canto, halo e a ankh ao centro). Puro
     ornamento; cores fixas de propósito para o verso parecer carta nos dois temas. */
  function cardBack() {
    return '' +
      '<svg class="deck-back-svg" viewBox="0 0 260 364" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
        '<defs>' +
          '<radialGradient id="dbBg" cx="50%" cy="44%" r="80%">' +
            '<stop offset="0%" stop-color="#2a3d57"/><stop offset="55%" stop-color="#1b2a3d"/><stop offset="100%" stop-color="#0d1623"/>' +
          '</radialGradient>' +
          '<linearGradient id="dbGold" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0%" stop-color="#f4d97a"/><stop offset="45%" stop-color="#c9a646"/><stop offset="100%" stop-color="#8a6a1e"/>' +
          '</linearGradient>' +
          '<radialGradient id="dbHalo" cx="50%" cy="50%" r="46%">' +
            '<stop offset="0%" stop-color="#c9a646" stop-opacity="0.20"/><stop offset="70%" stop-color="#c9a646" stop-opacity="0.03"/><stop offset="100%" stop-color="#c9a646" stop-opacity="0"/>' +
          '</radialGradient>' +
        '</defs>' +
        '<rect width="260" height="364" fill="url(#dbBg)"/>' +
        '<rect x="8" y="8" width="244" height="348" rx="13" fill="none" stroke="#c9a646" stroke-opacity="0.32" stroke-width="1.3"/>' +
        '<rect x="15" y="15" width="230" height="334" rx="10" fill="none" stroke="#c9a646" stroke-opacity="0.14" stroke-width="0.7"/>' +
        '<circle cx="32" cy="32" r="1.8" fill="#c9a646" fill-opacity="0.55"/>' +
        '<circle cx="228" cy="32" r="1.8" fill="#c9a646" fill-opacity="0.55"/>' +
        '<circle cx="32" cy="332" r="1.8" fill="#c9a646" fill-opacity="0.55"/>' +
        '<circle cx="228" cy="332" r="1.8" fill="#c9a646" fill-opacity="0.55"/>' +
        '<circle cx="64" cy="70" r="1.1" fill="#c9a646" fill-opacity="0.35"/>' +
        '<circle cx="196" cy="70" r="1.1" fill="#c9a646" fill-opacity="0.35"/>' +
        '<circle cx="64" cy="294" r="1.1" fill="#c9a646" fill-opacity="0.35"/>' +
        '<circle cx="196" cy="294" r="1.1" fill="#c9a646" fill-opacity="0.35"/>' +
        '<circle cx="130" cy="182" r="96" fill="url(#dbHalo)"/>' +
        '<g transform="translate(130 182) scale(0.52) translate(-256 -272)">' +
          '<path d="M 256 80 C 318 80 360 128 360 186 C 360 236 328 276 282 288 L 380 288 C 392 288 400 296 400 306 C 400 316 392 324 380 324 L 274 324 L 274 444 C 274 456 266 464 256 464 C 246 464 238 456 238 444 L 238 324 L 132 324 C 120 324 112 316 112 306 C 112 296 120 288 132 288 L 230 288 C 184 276 152 236 152 186 C 152 128 194 80 256 80 Z M 256 120 C 218 120 192 150 192 186 C 192 222 218 252 256 252 C 294 252 320 222 320 186 C 320 150 294 120 256 120 Z" fill="url(#dbGold)" fill-rule="evenodd"/>' +
        '</g>' +
      '</svg>';
  }

  function keyboard() {
    return ALPHA.map(function (c) {
      return '<button class="deck-key" data-ch="' + esc(c) + '" aria-label="' + esc(T('letra ', 'letter ') + c) + '">' + c + '</button>';
    }).join('');
  }

  function renderPage() {
    document.title = T('Baralho de sinais', 'Sign deck') + ' · Musæum';
    document.documentElement.lang = pt ? 'pt-BR' : 'en';
    renderHeader();

    el('deckContent').innerHTML =
      '<div class="deck-wrap">' +
        '<div class="deck-intro">' +
          '<span class="deck-intro-glyph" aria-hidden="true">𓄿</span>' +
          '<h1>' + T('Baralho de sinais', 'Sign deck') + '</h1>' +
          '<p>' + T('Toque as letras para escrever o fonema que ele representa. As 24 letras bastam para soletrar qualquer leitura.',
                    'Tap the letters to write the phoneme it represents. The 24 letters are enough to spell any reading.') + '</p>' +
        '</div>' +

        '<div class="deck-levels" role="group" aria-label="' + esc(T('Dificuldade', 'Difficulty')) + '">' + levelBtns() + '</div>' +

        '<div class="deck-score" id="deckScore" aria-live="off"></div>' +

        '<div class="deck-card">' +
          '<div class="deck-flip" id="deckFlip">' +
            '<div class="deck-face deck-front">' +
              '<span class="deck-glyph" id="deckGlyph" aria-hidden="true"></span>' +
            '</div>' +
            '<div class="deck-face deck-back" aria-hidden="true">' + cardBack() + '</div>' +
          '</div>' +
        '</div>' +

        '<div class="deck-answer" id="deckAnswer" aria-live="polite"></div>' +

        '<div class="deck-feedback" id="deckFeedback" role="status" aria-live="polite"></div>' +

        '<div class="deck-keys" id="deckKeys">' + keyboard() + '</div>' +

        '<div class="deck-actions">' +
          '<button class="btn btn-primary" id="deckCheck">' + T('Conferir', 'Check') + '</button>' +
          '<button class="btn" id="deckBack" aria-label="' + esc(T('Apagar', 'Delete')) + '">⌫</button>' +
          '<button class="btn" id="deckClear">' + T('Limpar', 'Clear') + '</button>' +
        '</div>' +

        '<div class="deck-links">' +
          '<button class="deck-link" id="deckHint">' + T('Dica', 'Hint') + '</button>' +
          '<span aria-hidden="true">·</span>' +
          '<button class="deck-link" id="deckReveal">' + T('Não sei', "Don't know") + '</button>' +
        '</div>' +
      '</div>';

    wire();
    if (!st.card) drawNext();
    paint();
  }

  /* ── pintura do estado ────────────────────────────── */
  function paint() {
    var card = st.card;
    el('deckGlyph').textContent = card ? card[1] : '';

    var ans = el('deckAnswer');
    if (st.answer.length) {
      ans.innerHTML = st.answer.map(function (c) { return '<span>' + c + '</span>'; }).join('');
      ans.classList.remove('empty');
    } else {
      ans.innerHTML = '<span class="deck-answer-ph">' + T('toque as letras', 'tap the letters') + '</span>';
      ans.classList.add('empty');
    }

    el('deckScore').innerHTML =
      '<span>' + T('Sequência', 'Streak') + ' <strong>' + st.streak + '</strong></span>' +
      '<span>' + T('Acertos', 'Correct') + ' <strong>' + st.hits + '/' + st.seen + '</strong></span>' +
      '<span>' + T('Melhor', 'Best') + ' <strong>' + st.best + '</strong></span>';

    var keysDisabled = st.done;
    el('deckKeys').querySelectorAll('.deck-key').forEach(function (k) { k.disabled = keysDisabled; });
    el('deckBack').disabled = st.done;
    el('deckClear').disabled = st.done;

    var check = el('deckCheck');
    if (st.done) {
      check.textContent = T('Próxima carta →', 'Next card →');
      check.disabled = false;
    } else {
      check.textContent = T('Conferir', 'Check');
      check.disabled = st.answer.length === 0;
    }

    el('deckHint').hidden = st.done || st.hinted;
    el('deckReveal').hidden = st.done;
  }

  function feedback(kind) {
    var fb = el('deckFeedback');
    var card = st.card;
    if (!kind) { fb.className = 'deck-feedback'; fb.innerHTML = ''; return; }

    var head, cls;
    if (kind === 'ok')  { cls = 'ok';  head = T('Certo! ', 'Correct! '); }
    else                { cls = 'err'; head = T('A resposta é ', 'The answer is '); }

    fb.className = 'deck-feedback ' + cls;
    fb.innerHTML =
      '<div class="deck-reveal-line">' + esc(head) +
        '<span class="deck-reveal-tr">' + esc(card[2]) + '</span>' +
        ' · <span class="deck-reveal-code">' + esc(card[0]) + '</span>' +
        ' · ' + esc(card[3]) +
      '</div>' +
      (card[5] ? '<p class="deck-reveal-details">' + esc(card[5]) + '</p>' : '');
  }

  function finish(correct, revealed) {
    if (st.done) return;
    st.done = true;
    st.seen++;
    if (correct) {
      st.hits++; st.streak++;
      if (st.streak > st.best) st.best = st.streak;
    } else {
      st.streak = 0;
    }
    feedback(correct ? 'ok' : 'err');
    paint();
    var check = el('deckCheck');
    if (check) check.focus();
  }

  function check() {
    if (st.done) { next(); return; }
    if (!st.answer.length) return;
    var correct = st.answer.join('') === (st.card[2] || '').toLowerCase();
    finish(correct, false);
  }
  function swapCard() {
    drawNext();
    feedback(null);
    paint();
  }
  function next() {
    if (st.flipping) return;
    var flip = el('deckFlip');
    if (!flip || noMotion) { swapCard(); return; }
    st.flipping = true;
    flip.classList.add('flip');                 // vira mostrando o verso
    setTimeout(function () {
      swapCard();                               // troca a frente com o verso à mostra
      flip.classList.remove('flip');            // desvira, revelando a carta nova
      setTimeout(function () { st.flipping = false; }, FLIP_MS);
    }, FLIP_MS);
  }

  /* ── ligações ─────────────────────────────────────── */
  function wire() {
    el('langToggle').addEventListener('click', function () {
      lang = pt ? 'en' : 'pt'; pt = lang === 'pt';
      localStorage.setItem('musaeum-lang', lang);
      renderPage();               // mesma carta, traduzida
    });
    el('themeToggle').addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var nx = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nx);
      localStorage.setItem('musaeum-theme', nx);
    });

    el('deckContent').querySelectorAll('.deck-level-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.level === level) return;
        level = b.dataset.level;
        localStorage.setItem('musaeum-baralho-nivel', level);
        st.queue = []; st.card = null;
        renderPage();
      });
    });

    el('deckKeys').querySelectorAll('.deck-key').forEach(function (k) {
      k.addEventListener('click', function () {
        if (st.done) return;
        st.answer.push(k.dataset.ch);
        feedback(null);
        paint();
      });
    });
    el('deckBack').addEventListener('click', function () {
      if (st.done) return;
      st.answer.pop(); paint();
    });
    el('deckClear').addEventListener('click', function () {
      if (st.done) return;
      st.answer = []; paint();
    });
    el('deckCheck').addEventListener('click', check);
    el('deckHint').addEventListener('click', function () {
      if (st.done) return;
      st.hinted = true;
      var fb = el('deckFeedback');
      fb.className = 'deck-feedback hint';
      fb.innerHTML = '<div class="deck-reveal-line">' + esc(T('O desenho: ', 'The picture: ')) + esc(st.card[3]) + '</div>';
      paint();
    });
    el('deckReveal').addEventListener('click', function () {
      if (st.done) return;
      finish(false, true);
    });

    document.addEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (st.done) next(); else check();
    } else if (e.key === 'Backspace') {
      if (!st.done && st.answer.length) { e.preventDefault(); st.answer.pop(); paint(); }
    }
  }

  document.addEventListener('DOMContentLoaded', renderPage);
})();
