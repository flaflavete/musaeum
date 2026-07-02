/* Curso de Hieróglifos (rebuild) — motor único.
   Serve o índice (data-page="index") e as lições (data-page="lesson"),
   ambos dirigidos por CURSO_LICOES (licoes.js). Troca de idioma e tema ao vivo.

   Progresso unificado em localStorage 'musaeum-hieroglyphs':
   { done: { <id>: true } }. A contagem e a % derivam de CURSO_LICOES (sem
   número mágico). */

(function () {
  'use strict';

  var LESSONS = window.CURSO_LICOES || [];
  var lang = localStorage.getItem('musaeum-lang') || 'pt';

  /* ── utilidades ──────────────────────────────────── */
  function T(obj) { return obj ? (obj[lang] != null ? obj[lang] : obj.pt) : ''; }
  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function el(id) { return document.getElementById(id); }

  function progress() {
    try { return JSON.parse(localStorage.getItem('musaeum-hieroglyphs') || '{}'); }
    catch (e) { return {}; }
  }
  function isDone(id) { var p = progress(); return !!(p.done && p.done[id]); }
  function markDone(id) {
    var p = progress();
    if (!p.done) p.done = {};
    p.done[id] = true;
    localStorage.setItem('musaeum-hieroglyphs', JSON.stringify(p));
  }
  var readyLessons = LESSONS.filter(function (l) { return l.ready; });

  /* ── lookup do Gardiner (fonte única dos sinais) ──── */
  /* row = [id, glifo, fonema, nome, func, details]. Mapa por idioma, em cache. */
  var GD = { pt: null, en: null };
  function gardinerMap() {
    if (!GD[lang]) {
      var src = lang === 'pt' ? window.GARDINER_DATA : window.GARDINER_DATA_EN;
      var m = {};
      (src || []).forEach(function (row) { m[row[0]] = row; });
      GD[lang] = m;
    }
    return GD[lang];
  }

  /* ── chrome compartilhado: cabeçalho ─────────────── */
  function backArrow() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>';
  }

  function renderHeader(opts) {
    var langLabel = lang === 'pt' ? 'EN' : 'PT';
    var langAria = lang === 'pt' ? 'Switch to English' : 'Mudar para português';
    return '' +
      '<a class="licao-back" href="' + opts.backHref + '">' + backArrow() + ' ' + esc(opts.backLabel) + '</a>' +
      '<span class="licao-header-title">' + esc(opts.title) + '</span>' +
      '<div class="header-actions">' +
        '<button class="icon-btn" id="langToggle" aria-label="' + esc(langAria) + '">' + langLabel + '</button>' +
        '<button class="icon-btn" id="themeToggle" aria-label="Alternar tema" title="Tema">◐</button>' +
      '</div>';
  }

  function wireChrome() {
    var lt = el('langToggle');
    if (lt) lt.addEventListener('click', function () {
      lang = lang === 'pt' ? 'en' : 'pt';
      localStorage.setItem('musaeum-lang', lang);
      render();
    });
    var tt = el('themeToggle');
    if (tt) tt.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('musaeum-theme', next);
    });
  }

  /* ── blocos de uma lição ─────────────────────────── */
  function renderBlock(b) {
    switch (b.kind) {
      case 'p':
        return '<p>' + T(b.html) + '</p>';

      case 'callout':
        return '<div class="callout' + (b.variant === 'azul' ? ' azul' : '') + '">' + T(b.html) + '</div>';

      case 'signtypes':
        return '<div class="sign-types">' + b.cards.map(function (c) {
          return '<div class="sign-type-card">' +
            '<span class="badge type-' + c.variant + '">' + esc(T(c.badge)) + '</span>' +
            '<span class="icon">' + c.glyph + '</span>' +
            '<h3>' + esc(T(c.title)) + '</h3>' +
            '<p>' + T(c.desc) + '</p>' +
          '</div>';
        }).join('') + '</div>';

      case 'word': {
        var row = b.signs.map(function (s, i) {
          var sep = i > 0 ? '<span class="plus-sep" aria-hidden="true">+</span>' : '';
          return sep +
            '<div class="glyph-block" tabindex="0">' +
              '<span class="glyph-char">' + s.glyph + '</span>' +
              '<span class="glyph-label">' + esc(s.id) + '</span>' +
              '<span class="glyph-phon">' + esc(s.phon) + '</span>' +
              (s.typeLabel ? '<span class="glyph-type type-' + s.type + '">' + esc(T(s.typeLabel)) + '</span>' : '') +
              '<span class="tooltip" role="tooltip">' + esc(T(s.tip)) + '</span>' +
            '</div>';
        }).join('');
        var result = b.result
          ? '<span class="eq-sep" aria-hidden="true">=</span>' + (b.cartouche
              ? '<span class="cartouche">' + b.result + '</span>'
              : '<span class="word-result">' + b.result + '</span>')
          : '';
        return '<div class="example-box">' +
          '<div class="example-label">' + esc(T(b.label)) + '</div>' +
          '<div class="example-row">' + row + result + '</div>' +
          (b.note ? '<p class="example-note">' + T(b.note) + '</p>' : '') +
        '</div>';
      }

      case 'direction':
        return '<div class="direction-demo">' + b.rows.map(function (r) {
          return '<div class="dir-row">' +
            '<span class="dir-label">' + esc(T(r.label)) + '</span>' +
            '<span class="dir-glyphs"' + (r.rtl ? ' style="direction:rtl"' : '') + '>' + r.glyphs + '</span>' +
            '<span class="dir-arrow">' + esc(T(r.arrow)) + '</span>' +
          '</div>';
        }).join('') + '</div>';

      case 'siggrid': {
        /* Grid de sinais vindo do GARDINER_DATA por id. b.tr sobrescreve a
           transliteração só onde o dado está vazio ou fora do padrão da casa. */
        var map = gardinerMap();
        var ov = b.tr || {};
        var cards = b.ids.map(function (id) {
          var row = map[id] || [id, '', '', id, '', ''];
          var tr = ov[id] != null ? ov[id] : (row[2] || '');
          return '<button class="sig-card" data-id="' + esc(id) + '" data-tr="' + esc(tr) + '">' +
            '<span class="sig-glyph">' + (row[1] || '') + '</span>' +
            '<span class="sig-tr">' + esc(tr) + '</span>' +
            '<span class="sig-code">' + esc(id) + '</span>' +
            '<span class="sig-name">' + esc(row[3] || '') + '</span>' +
          '</button>';
        }).join('');
        var hint = b.hint
          ? esc(T(b.hint))
          : (lang === 'pt' ? 'Clique num sinal para ver a explicação do Gardiner.' : 'Click a sign to see Gardiner\'s explanation.');
        return '<div class="siggrid-block" data-siggrid-block>' +
          '<div class="sig-progress">' + (lang === 'pt' ? 'Vistos ' : 'Seen ') + '<span class="sig-seen">0</span> / ' + b.ids.length + '</div>' +
          '<div class="siggrid">' + cards + '</div>' +
          '<div class="sig-detail" role="status" aria-live="polite"><span class="sig-detail-hint">' + hint + '</span></div>' +
        '</div>';
      }

      case 'builder': {
        /* Construtor guiado: paleta de sinais do GARDINER_DATA; monta a palavra
           alvo clicando os sinais na ordem. Desafios ficam em wireBuilder. */
        var bmap = gardinerMap();
        var keys = b.palette.map(function (id) {
          var row = bmap[id] || [id, '', '', id];
          return '<button class="builder-key" type="button" data-id="' + esc(id) + '">' +
            '<span class="bk-glyph">' + (row[1] || '') + '</span>' +
            '<span class="bk-ph">' + esc(row[2] || '') + '</span>' +
          '</button>';
        }).join('');
        return '<div class="builder" data-builder>' +
          '<div class="builder-task" id="builderTask"></div>' +
          '<div class="builder-strip' + (b.cartouche ? ' as-cartouche' : '') + '" id="builderStrip" aria-live="polite"></div>' +
          '<div class="builder-controls">' +
            '<button class="btn" type="button" id="builderBack">' + (lang === 'pt' ? '⌫ Apagar' : '⌫ Delete') + '</button>' +
            '<button class="btn" type="button" id="builderClear">' + (lang === 'pt' ? 'Limpar' : 'Clear') + '</button>' +
          '</div>' +
          '<div class="builder-palette">' + keys + '</div>' +
          '<div class="builder-feedback" id="builderFeedback" role="status" aria-live="polite"></div>' +
          '<div class="builder-next" id="builderNext"></div>' +
        '</div>';
      }

      default:
        return '';
    }
  }

  /* ── página: lição ───────────────────────────────── */
  var quizLocked = false;

  function lessonNav(lesson) {
    var idx = readyLessons.indexOf(lesson);
    var next = readyLessons[idx + 1];
    var idxLabel = lang === 'pt' ? '← Índice' : '← Index';
    var info = lang === 'pt'
      ? 'Lição ' + lesson.num + ' de ' + LESSONS.length
      : 'Lesson ' + lesson.num + ' of ' + LESSONS.length;
    var nextHtml;
    if (next) {
      nextHtml = '<a class="btn btn-primary" href="licao.html?licao=' + next.id + '">' + (lang === 'pt' ? 'Próxima →' : 'Next →') + '</a>';
    } else {
      nextHtml = '<a class="btn" href="index.html">' + (lang === 'pt' ? 'Concluir →' : 'Finish →') + '</a>';
    }
    return '<div class="lesson-nav">' +
      '<a class="btn" href="index.html">' + idxLabel + '</a>' +
      '<div class="lesson-nav-info">' + info + '</div>' +
      nextHtml +
    '</div>';
  }

  function renderLesson(lesson) {
    document.title = T(lesson.title) + ' · Musæum';
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    el('cursoHeader').innerHTML = renderHeader({
      backHref: 'index.html',
      backLabel: lang === 'pt' ? 'Índice' : 'Index',
      title: T(lesson.kicker),
    });

    var sectionsHtml = lesson.sections.map(function (sec, i) {
      var blocks = sec.blocks.map(renderBlock).join('');
      return '<section class="licao-section">' +
        '<h2>' + (i + 1) + ' · ' + T(sec.title) + '</h2>' +
        blocks +
      '</section>';
    }).join('');

    var quizHtml = '';
    if (lesson.quiz && lesson.quiz.length) {
      quizHtml = '<section class="licao-section">' +
        '<div class="quiz-box" id="quizBox">' +
          '<h3>' + (lang === 'pt' ? 'Quiz rápido' : 'Quick quiz') + '</h3>' +
          '<div class="quiz-meta" id="quizMeta"></div>' +
          '<div id="quizStage"></div>' +
          '<div class="quiz-nav" id="quizNav"></div>' +
        '</div>' +
      '</section>';
    }

    el('cursoContent').innerHTML =
      '<div class="licao-hero">' +
        '<div class="licao-hero-num">' + esc(T(lesson.kicker)) + '</div>' +
        '<span class="licao-hero-glyph" aria-hidden="true">' + lesson.glyph + '</span>' +
        '<h1>' + T(lesson.title) + '</h1>' +
        '<p>' + T(lesson.intro) + '</p>' +
      '</div>' +
      sectionsHtml +
      quizHtml +
      lessonNav(lesson);

    wireChrome();
    wireSiggrid();
    wireBuilder(lesson);
    startQuiz(lesson);
    wireProgressBar();
  }

  function wireBuilder(lesson) {
    var block = null;
    (lesson.sections || []).forEach(function (s) {
      (s.blocks || []).forEach(function (b) { if (b.kind === 'builder') block = b; });
    });
    if (!block) return;
    var map = gardinerMap();
    var st = { ci: 0, built: [], solved: false };
    var strip = el('builderStrip'), task = el('builderTask'), fb = el('builderFeedback'), nextWrap = el('builderNext');

    function renderTask() {
      var c = block.challenges[st.ci];
      task.innerHTML = '<span class="builder-task-label">' + (lang === 'pt' ? 'Monte a palavra' : 'Build the word') + ' ' + (st.ci + 1) + '/' + block.challenges.length + '</span>' +
        '<span class="builder-task-word">' + esc(T(c.meaning)) + ' <em>(' + esc(c.translit) + ')</em></span>';
    }
    function renderStrip() {
      strip.innerHTML = st.built.length
        ? st.built.map(function (id) { return '<span class="bs-glyph">' + ((map[id] || [])[1] || '') + '</span>'; }).join('')
        : '<span class="builder-strip-empty">' + (lang === 'pt' ? 'clique nos sinais abaixo' : 'click the signs below') + '</span>';
      strip.classList.toggle('solved', st.solved);
    }
    function check() {
      var c = block.challenges[st.ci];
      if (st.built.join(',') === c.answer.join(',')) {
        st.solved = true;
        renderStrip();
        fb.style.color = 'var(--green)';
        fb.innerHTML = '✓ ' + esc(c.translit) + ' — ' + esc(T(c.meaning)) + (c.note ? '<span class="bf-note">' + T(c.note) + '</span>' : '');
        if (st.ci < block.challenges.length - 1) {
          nextWrap.innerHTML = '<button class="btn btn-primary" type="button" id="bNext">' + (lang === 'pt' ? 'Próxima palavra →' : 'Next word →') + '</button>';
          el('bNext').addEventListener('click', function () {
            st.ci++; st.built = []; st.solved = false; fb.innerHTML = ''; nextWrap.innerHTML = '';
            renderTask(); renderStrip();
          });
        } else {
          nextWrap.innerHTML = '<div class="quiz-result">' + (lang === 'pt' ? 'Você montou todas as palavras!' : 'You built all the words!') + '</div>';
          markDone(lesson.id);
          var bar = el('progressBar');
          if (bar) bar.style.width = '100%';
          quizLocked = true;
        }
      } else if (st.built.length >= c.answer.length) {
        fb.style.color = 'var(--terracotta-lt)';
        fb.textContent = lang === 'pt' ? 'Não é bem assim. Use ⌫ e confira a ordem dos sinais.' : 'Not quite. Use ⌫ and check the order of the signs.';
      } else {
        fb.textContent = '';
      }
    }

    document.querySelectorAll('[data-builder] .builder-key').forEach(function (k) {
      k.addEventListener('click', function () { if (st.solved) return; st.built.push(k.dataset.id); renderStrip(); check(); });
    });
    el('builderBack').addEventListener('click', function () { if (st.solved) return; st.built.pop(); renderStrip(); check(); });
    el('builderClear').addEventListener('click', function () { if (st.solved) return; st.built = []; fb.textContent = ''; renderStrip(); });

    renderTask();
    renderStrip();
  }

  function wireSiggrid() {
    var map = gardinerMap();
    document.querySelectorAll('[data-siggrid-block]').forEach(function (block) {
      var detail = block.querySelector('.sig-detail');
      var seenEl = block.querySelector('.sig-seen');
      function updateSeen() {
        if (seenEl) seenEl.textContent = block.querySelectorAll('.sig-card.learned').length;
      }
      block.querySelectorAll('.sig-card').forEach(function (btn) {
        btn.addEventListener('click', function () {
          btn.classList.add('learned');
          var row = map[btn.dataset.id];
          if (row && detail) {
            var tr = btn.dataset.tr || '';
            detail.innerHTML = '<span class="sig-detail-glyph">' + (row[1] || '') + '</span>' +
              '<span class="sig-detail-body">' +
                '<strong>' + esc(row[0]) + (tr ? ' · ' + esc(tr) : '') + ' · ' + esc(row[3] || '') + '</strong>' +
                (row[5] ? '<span>' + esc(row[5]) + '</span>' : '') +
              '</span>';
          }
          updateSeen();
        });
      });
      updateSeen();
    });
  }

  /* Quiz em sequência: uma pergunta de cada vez, com placar. */
  var quizState = { i: 0, score: 0 };

  function startQuiz(lesson) {
    if (!lesson.quiz || !lesson.quiz.length) return;
    quizState = { i: 0, score: 0 };
    renderQuizQuestion(lesson);
  }

  function renderQuizQuestion(lesson) {
    var qs = lesson.quiz;
    var q = qs[quizState.i];
    var total = qs.length;

    el('quizMeta').textContent = (lang === 'pt' ? 'Pergunta ' : 'Question ') + (quizState.i + 1) + (lang === 'pt' ? ' de ' : ' of ') + total;

    var opts = q.options.map(function (o) {
      return '<button class="quiz-opt" data-correct="' + (o.correct ? '1' : '0') + '">' + esc(T(o.label)) + '</button>';
    }).join('');

    el('quizStage').innerHTML =
      '<span class="quiz-glyph" aria-hidden="true">' + q.glyph + '</span>' +
      '<p class="quiz-question">' + esc(T(q.question)) + '</p>' +
      '<div class="quiz-options" id="quizOptions">' + opts + '</div>' +
      '<div class="quiz-feedback" id="quizFeedback" role="status" aria-live="polite"></div>';
    el('quizNav').innerHTML = '';

    var options = document.querySelectorAll('#quizOptions .quiz-opt');
    options.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        var correct = btn.dataset.correct === '1';
        options.forEach(function (o) {
          o.disabled = true;
          if (o.dataset.correct === '1') o.classList.add('correct');
        });
        var fb = el('quizFeedback');
        if (correct) {
          btn.classList.add('correct');
          fb.textContent = T(q.feedbackOk);
          fb.style.color = 'var(--green)';
          quizState.score++;
        } else {
          btn.classList.add('wrong');
          fb.textContent = T(q.feedbackErr);
          fb.style.color = 'var(--terracotta-lt)';
        }
        showQuizNext(lesson);
      });
    });
  }

  function showQuizNext(lesson) {
    var qs = lesson.quiz;
    var nav = el('quizNav');
    if (quizState.i < qs.length - 1) {
      nav.innerHTML = '<button class="btn btn-primary" id="quizNextBtn">' + (lang === 'pt' ? 'Próxima pergunta →' : 'Next question →') + '</button>';
      el('quizNextBtn').addEventListener('click', function () {
        quizState.i++;
        renderQuizQuestion(lesson);
        var box = el('quizBox');
        if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      markDone(lesson.id);
      var bar = el('progressBar');
      if (bar) bar.style.width = '100%';
      quizLocked = true;
      var msg = lang === 'pt'
        ? 'Quiz concluído: você acertou ' + quizState.score + ' de ' + qs.length + '.'
        : 'Quiz complete: you got ' + quizState.score + ' of ' + qs.length + ' right.';
      nav.innerHTML = '<div class="quiz-result">' + esc(msg) + '</div>';
    }
  }

  function wireProgressBar() {
    quizLocked = false;
    function onScroll() {
      if (quizLocked) return;
      var bar = el('progressBar');
      if (!bar) return;
      var pct = Math.min(95, Math.round(((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100));
      bar.style.width = pct + '%';
    }
    window.removeEventListener('scroll', window.__cursoScroll || function () {});
    window.__cursoScroll = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── página: índice ──────────────────────────────── */
  function renderIndex() {
    document.title = (lang === 'pt' ? 'Primeiros passos nos hieróglifos' : 'First steps in hieroglyphs') + ' · Musæum';
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    el('cursoHeader').innerHTML = renderHeader({
      backHref: '../index.html',
      backLabel: 'Musæum',
      title: lang === 'pt' ? 'Primeiros passos' : 'First steps',
    });

    var doneCount = readyLessons.filter(function (l) { return isDone(l.id); }).length;
    var total = LESSONS.length;
    var pct = total ? Math.round((doneCount / total) * 100) : 0;

    var list = LESSONS.map(function (l) {
      var locked = !l.ready;
      var href = locked ? '' : 'licao.html?licao=' + l.id;
      var tag = locked ? 'div' : 'a';
      var check = (!locked && isDone(l.id)) ? '<span class="licao-item-check" aria-hidden="true">✓</span>' : '';
      return '<li>' +
        '<' + tag + ' class="licao-item' + (locked ? ' locked' : '') + '"' + (locked ? '' : ' href="' + href + '"') + '>' +
          '<span class="licao-item-glyph" aria-hidden="true">' + l.glyph + '</span>' +
          '<div class="licao-item-body">' +
            '<div class="licao-item-num">' + esc(T(l.kicker)) + '</div>' +
            '<div class="licao-item-title">' + T(l.title) + check + '</div>' +
            '<p class="licao-item-desc">' + T(l.desc) + '</p>' +
          '</div>' +
          '<div class="licao-item-meta">' +
            '<span class="licao-item-dur">⏱ ' + esc(T(l.dur)) + '</span>' +
            '<span class="licao-item-badge ' + l.badgeClass + '">' + esc(T(l.badge)) + '</span>' +
          '</div>' +
        '</' + tag + '>' +
      '</li>';
    }).join('');

    var aboutTitle = lang === 'pt' ? 'Sobre' : 'About';
    var aboutIntro = lang === 'pt'
      ? 'Estes primeiros passos apresentam a escrita hieroglífica do egípcio médio, o registro literário clássico. O objetivo é ter uma noção de como o sistema funciona, com reconhecimento e leitura leve, seguindo a tradição acadêmica estabelecida por três obras fundamentais da egiptologia.'
      : 'These first steps introduce Middle Egyptian hieroglyphic writing, the classical literary register. The goal is to get a sense of how the system works, through recognition and light reading, following the academic tradition established by three foundational works in Egyptology.';
    var aboutSources = lang === 'pt'
      ? 'Baseado em <strong>Gardiner</strong> (lista de sinais e gramática), <strong>Faulkner</strong> (vocabulário) e <strong>Allen</strong> (estrutura e progressão).'
      : 'Based on <strong>Gardiner</strong> (sign list and grammar), <strong>Faulkner</strong> (vocabulary), and <strong>Allen</strong> (structure and progression).';
    var lessonsTitle = lang === 'pt' ? 'Lições' : 'Lessons';
    var toolsTitle = lang === 'pt' ? 'Ferramentas de prática' : 'Practice tools';
    var progLabel = lang === 'pt' ? 'Progresso' : 'Progress';

    var tools = '' +
      '<a class="ferr-card" href="baralho.html">' +
        '<span class="ferr-glyph" aria-hidden="true">𓄿</span>' +
        '<div class="ferr-info"><strong>' + (lang === 'pt' ? 'Baralho de sinais' : 'Sign deck') + '</strong>' +
        '<span>' + (lang === 'pt' ? 'Pratique a leitura: soletre o fonema de cada sinal' : 'Practice reading: spell out each sign\'s phoneme') + '</span></div>' +
      '</a>' +
      '<a class="ferr-card" href="../gardiner/gardiner.html">' +
        '<span class="ferr-glyph" aria-hidden="true">𓏟</span>' +
        '<div class="ferr-info"><strong>' + (lang === 'pt' ? 'Lista de Gardiner' : 'Gardiner Sign List') + '</strong>' +
        '<span>' + (lang === 'pt' ? 'Consulte os ~900 sinais e monte palavras no construtor' : 'Browse all ~900 signs and build words in the builder') + '</span></div>' +
      '</a>';

    el('cursoContent').innerHTML =
      '<div class="licao-hero">' +
        '<div class="licao-hero-num">' + (lang === 'pt' ? 'Uma introdução' : 'An introduction') + '</div>' +
        '<span class="licao-hero-glyph" aria-hidden="true">𓏛</span>' +
        '<h1>' + (lang === 'pt' ? 'Primeiros passos nos hieróglifos' : 'First steps in hieroglyphs') + '</h1>' +
        '<p>' + (lang === 'pt'
          ? 'Um primeiro contato com a escrita egípcia, sem pré-requisitos: você começa do zero e termina lendo nomes de faraós.'
          : 'A first encounter with Egyptian writing, with no prerequisites: you start from scratch and end up reading pharaoh names.') + '</p>' +
      '</div>' +
      '<div class="curso-progress">' +
        '<span class="curso-progress-label">' + progLabel + ' <span>' + doneCount + '/' + total + '</span></span>' +
        '<div class="curso-progress-track"><div class="curso-progress-fill" style="width:' + pct + '%"></div></div>' +
      '</div>' +
      '<section class="licao-section">' +
        '<h2>' + aboutTitle + '</h2>' +
        '<p class="curso-intro">' + aboutIntro + '</p>' +
        '<p class="curso-fontes">' + aboutSources + '</p>' +
      '</section>' +
      '<section class="licao-section">' +
        '<h2>' + lessonsTitle + '</h2>' +
        '<ul class="licoes-lista">' + list + '</ul>' +
      '</section>' +
      '<section class="licao-section">' +
        '<h2>' + toolsTitle + '</h2>' +
        '<div class="ferramentas-grid">' + tools + '</div>' +
      '</section>';

    wireChrome();
  }

  /* ── roteamento ──────────────────────────────────── */
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function render() {
    var page = document.body.dataset.page;
    if (page === 'lesson') {
      var id = getParam('licao');
      var lesson = LESSONS.filter(function (l) { return l.id === id && l.ready; })[0];
      if (!lesson) { window.location.replace('index.html'); return; }
      renderLesson(lesson);
    } else {
      renderIndex();
    }
  }

  document.addEventListener('DOMContentLoaded', render);
})();
