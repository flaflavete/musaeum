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
             hits: 0, seen: 0, streak: 0, best: 0 };

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
          '<p>' + T('Aparece um sinal: toque as letras para escrever o fonema que ele representa. As 24 letras bastam para soletrar qualquer leitura.',
                    'A sign appears: tap the letters to write the phoneme it represents. The 24 letters are enough to spell any reading.') + '</p>' +
        '</div>' +

        '<div class="deck-levels" role="group" aria-label="' + esc(T('Dificuldade', 'Difficulty')) + '">' + levelBtns() + '</div>' +

        '<div class="deck-score" id="deckScore" aria-live="off"></div>' +

        '<div class="deck-card">' +
          '<span class="deck-glyph" id="deckGlyph" aria-hidden="true"></span>' +
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
  function next() {
    drawNext();
    feedback(null);
    paint();
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
