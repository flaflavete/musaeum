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
        var result = b.result ? '<span class="eq-sep" aria-hidden="true">=</span><span class="word-result">' + b.result + '</span>' : '';
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
      backLabel: lang === 'pt' ? 'Curso' : 'Course',
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
    if (lesson.quiz) {
      var q = lesson.quiz;
      var opts = q.options.map(function (o, i) {
        return '<button class="quiz-opt" data-correct="' + (o.correct ? '1' : '0') + '" data-i="' + i + '">' + esc(T(o.label)) + '</button>';
      }).join('');
      quizHtml = '<section class="licao-section">' +
        '<div class="quiz-box" id="quizBox">' +
          '<h3>' + (lang === 'pt' ? 'Quiz rápido' : 'Quick quiz') + '</h3>' +
          '<span class="quiz-glyph" aria-hidden="true">' + q.glyph + '</span>' +
          '<p style="color:var(--papyrus-soft);font-size:16px;margin-bottom:14px;text-align:center">' + esc(T(q.question)) + '</p>' +
          '<div class="quiz-options" id="quizOptions">' + opts + '</div>' +
          '<div class="quiz-feedback" id="quizFeedback" role="status" aria-live="polite"></div>' +
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
    wireQuiz(lesson);
    wireProgressBar();
  }

  function wireQuiz(lesson) {
    if (!lesson.quiz) return;
    var q = lesson.quiz;
    if (isDone(lesson.id)) quizLocked = false; // permite refazer, mas já conta como concluída
    var opts = document.querySelectorAll('#quizOptions .quiz-opt');
    opts.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        var correct = btn.dataset.correct === '1';
        opts.forEach(function (o) {
          o.disabled = true;
          if (o.dataset.correct === '1') o.classList.add('correct');
        });
        var fb = el('quizFeedback');
        if (correct) {
          btn.classList.add('correct');
          fb.textContent = T(q.feedbackOk);
          fb.style.color = 'var(--green)';
          markDone(lesson.id);
        } else {
          btn.classList.add('wrong');
          fb.textContent = T(q.feedbackErr);
          fb.style.color = 'var(--terracotta-lt)';
        }
        var bar = el('progressBar');
        if (bar) bar.style.width = '100%';
        quizLocked = true;
      });
    });
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
    document.title = (lang === 'pt' ? 'Aprender Hieróglifos · Curso de Leitura' : 'Learn Hieroglyphs · Reading Course') + ' · Musæum';
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    el('cursoHeader').innerHTML = renderHeader({
      backHref: '../index.html',
      backLabel: 'Musæum',
      title: lang === 'pt' ? 'Aprender Hieróglifos' : 'Learn Hieroglyphs',
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

    var aboutTitle = lang === 'pt' ? 'Sobre este curso' : 'About this course';
    var aboutIntro = lang === 'pt'
      ? 'O curso apresenta a escrita hieroglífica do egípcio médio, o registro literário clássico. É introdutório, voltado ao reconhecimento e à leitura leve, e segue a tradição acadêmica estabelecida por três obras fundamentais da egiptologia.'
      : 'The course introduces Middle Egyptian hieroglyphic writing, the classical literary register. It is introductory, aimed at recognition and light reading, and follows the academic tradition established by three foundational works in Egyptology.';
    var aboutSources = lang === 'pt'
      ? 'Baseado em <strong>Gardiner</strong> (lista de sinais e gramática), <strong>Faulkner</strong> (vocabulário) e <strong>Allen</strong> (estrutura do curso).'
      : 'Based on <strong>Gardiner</strong> (sign list and grammar), <strong>Faulkner</strong> (vocabulary), and <strong>Allen</strong> (course structure).';
    var lessonsTitle = lang === 'pt' ? 'Lições' : 'Lessons';
    var toolsTitle = lang === 'pt' ? 'Ferramentas de prática' : 'Practice tools';
    var progLabel = lang === 'pt' ? 'Progresso' : 'Progress';

    var tools = '' +
      '<a class="ferr-card" href="../gardiner/gardiner.html">' +
        '<span class="ferr-glyph" aria-hidden="true">𓏟</span>' +
        '<div class="ferr-info"><strong>' + (lang === 'pt' ? 'Lista de Gardiner' : 'Gardiner Sign List') + '</strong>' +
        '<span>' + (lang === 'pt' ? 'Consulte os ~900 sinais e monte palavras no construtor' : 'Browse all ~900 signs and build words in the builder') + '</span></div>' +
      '</a>';

    el('cursoContent').innerHTML =
      '<div class="licao-hero">' +
        '<div class="licao-hero-num">' + (lang === 'pt' ? 'Curso de Leitura' : 'Reading Course') + '</div>' +
        '<span class="licao-hero-glyph" aria-hidden="true">𓏛</span>' +
        '<h1>' + (lang === 'pt' ? 'Aprender hieróglifos' : 'Learn hieroglyphs') + '</h1>' +
        '<p>' + (lang === 'pt'
          ? 'Do sistema ao cartucho, em mordidas curtas. Sem pré-requisitos: você começa do zero e termina lendo nomes de faraós.'
          : 'From the writing system to the cartouche, in short bites. No prerequisites: start from scratch and finish reading pharaoh names.') + '</p>' +
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
