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

      case 'foto': {
        /* Foto de cultura material (pedra real). Botão .foto-frame abre a vista
           ampliada (toque/teclado); no desktop a lupa segue o cursor (wireFotos).
           A imagem em alta vive em ../assets/photos. */
        var ampliar = lang === 'pt' ? 'Ampliar foto' : 'Enlarge photo';
        return '<figure class="foto-figure" data-foto>' +
          '<button class="foto-frame" type="button" aria-label="' + esc(ampliar) + '">' +
            '<img class="foto-img" src="' + esc(b.src) + '" alt="' + esc(T(b.alt)) + '" loading="lazy" draggable="false">' +
            '<span class="foto-lupa" aria-hidden="true">🔍</span>' +
          '</button>' +
          '<figcaption class="foto-cap">' + T(b.caption) +
            '<span class="foto-credit">' + esc(T(b.credit)) + '</span>' +
          '</figcaption>' +
        '</figure>';
      }

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
            '<span class="dir-glyphs' + (r.rtl ? ' rtl' : '') + '">' + r.glyphs + '</span>' +
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

  /* Pesquisa: contexto da lição em curso. renderLesson preenche; o quiz, o
     construtor e o watcher de abandono leem e atualizam. reportComplete envia
     uma única vez, no fim do quiz ou do construtor. */
  var reportCtx = null;
  function reportComplete() {
    if (!reportCtx || reportCtx.done) return;
    reportCtx.done = true;
    if (window.Research) Research.trackLessonComplete({
      lessonId:      reportCtx.lessonId,
      lessonNum:     reportCtx.lessonNum,
      totalLessons:  reportCtx.totalLessons,
      quizScore:     reportCtx.quizScore,
      quizMax:       reportCtx.quizMax,
      builderSolved: reportCtx.builderSolved,
      builderTotal:  reportCtx.builderTotal,
      lang:          lang,
    });
  }

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

    reportCtx = {
      lessonId:      lesson.id,
      lessonNum:     lesson.num,
      totalLessons:  LESSONS.length,
      quizScore:     undefined,
      quizMax:       (lesson.quiz && lesson.quiz.length) || undefined,
      builderSolved: undefined,
      builderTotal:  undefined,
      done:          false,
    };
    if (window.Research) Research.watchLesson({
      lessonId:     lesson.id,
      lessonNum:    lesson.num,
      totalLessons: LESSONS.length,
      getState: function () {
        return {
          done:          reportCtx.done,
          lang:          lang,
          quizScore:     reportCtx.quizScore,
          quizMax:       reportCtx.quizMax,
          builderSolved: reportCtx.builderSolved,
          builderTotal:  reportCtx.builderTotal,
        };
      },
    });

    wireChrome();
    wireSiggrid();
    wireBuilder(lesson);
    wireFotos();
    startQuiz(lesson);
    wireProgressBar();
  }

  /* ── fotos de cultura material: lupa (desktop) + lightbox (todos) ── */
  var _lbPrevFocus = null;

  function wireFotos() {
    var figs = document.querySelectorAll('[data-foto]');
    if (!figs.length) return;
    var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    figs.forEach(function (fig) {
      var frame = fig.querySelector('.foto-frame');
      var img = fig.querySelector('.foto-img');
      if (!frame || !img) return;
      // Vista ampliada: universal e acessível (clique, Enter, Espaço).
      frame.addEventListener('click', function () { openLightbox(img.src, img.alt); });
      // Lupa que segue o cursor: só onde há mouse de verdade (enhancement).
      if (fine) attachLoupe(frame, img);
    });
  }

  function attachLoupe(frame, img) {
    var ZOOM = 2.6, lens = null;
    frame.addEventListener('mouseenter', function () {
      lens = document.createElement('div');
      lens.className = 'foto-lens';
      lens.style.backgroundImage = 'url("' + img.src + '")';
      frame.appendChild(lens);
    });
    frame.addEventListener('mousemove', function (e) {
      if (!lens) return;
      var r = frame.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      var lw = lens.offsetWidth, lh = lens.offsetHeight;
      lens.style.left = (x - lw / 2) + 'px';
      lens.style.top = (y - lh / 2) + 'px';
      lens.style.backgroundSize = (r.width * ZOOM) + 'px ' + (r.height * ZOOM) + 'px';
      lens.style.backgroundPosition = '-' + (x * ZOOM - lw / 2) + 'px -' + (y * ZOOM - lh / 2) + 'px';
    });
    frame.addEventListener('mouseleave', function () {
      if (lens) { lens.remove(); lens = null; }
    });
  }

  function openLightbox(src, alt) {
    var lb = el('fotoLightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'fotoLightbox';
      lb.className = 'foto-lightbox';
      lb.innerHTML =
        '<div class="foto-lightbox-inner" role="dialog" aria-modal="true">' +
          '<button class="foto-lightbox-close" type="button">✕</button>' +
          '<img class="foto-lightbox-img" alt="">' +
        '</div>';
      document.body.appendChild(lb);
      lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
      lb.querySelector('.foto-lightbox-close').addEventListener('click', closeLightbox);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lb.classList.contains('show')) closeLightbox();
      });
    }
    var closeBtn = lb.querySelector('.foto-lightbox-close');
    closeBtn.setAttribute('aria-label', lang === 'pt' ? 'Fechar' : 'Close');
    lb.querySelector('.foto-lightbox-inner').setAttribute('aria-label', lang === 'pt' ? 'Foto ampliada' : 'Enlarged photo');
    var im = lb.querySelector('.foto-lightbox-img');
    im.src = src; im.alt = alt || '';
    lb.classList.add('show');
    _lbPrevFocus = document.activeElement;
    closeBtn.focus();
  }

  function closeLightbox() {
    var lb = el('fotoLightbox');
    if (!lb) return;
    lb.classList.remove('show');
    if (_lbPrevFocus && _lbPrevFocus.focus) _lbPrevFocus.focus();
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
    if (reportCtx) { reportCtx.builderTotal = block.challenges.length; reportCtx.builderSolved = 0; }

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
        if (reportCtx) reportCtx.builderSolved = st.ci + 1;
        renderStrip();
        fb.style.color = 'var(--green)';
        fb.innerHTML = '✓ ' + esc(c.translit) + ' · ' + esc(T(c.meaning)) + (c.note ? '<span class="bf-note">' + T(c.note) + '</span>' : '');
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
          reportComplete();
        }
      } else if (st.built.length >= c.answer.length) {
        if (window.Research) Research.trackAttempt('builder', c.translit);
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
          if (window.Research) Research.trackAttempt('quiz', 'q' + (quizState.i + 1));
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
      if (reportCtx) reportCtx.quizScore = quizState.score;
      reportComplete();
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

  /* ── página: prova (porteiro do Módulo 1) ─────────── */
  var PROVA = window.CURSO_PROVA || null;
  var provaState = null;

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function provaUnlocked() {
    return readyLessons.length > 0 && readyLessons.every(function (l) { return isDone(l.id); });
  }

  function lessonByNum(n) {
    return LESSONS.filter(function (x) { return x.num === n; })[0];
  }

  function reviseLink(n, cls) {
    var l = lessonByNum(n);
    if (!l) return '';
    return '<a class="' + (cls || 'prova-revise') + '" href="licao.html?licao=' + l.id + '" target="_blank" rel="noopener">' +
      (lang === 'pt' ? 'Revise a Lição ' : 'Review Lesson ') + n + ' ↗</a>';
  }

  function provaOpenBook() {
    var label = lang === 'pt' ? 'Consulta aberta: abra a Lista de Gardiner numa nova aba' : 'Open book: open the Gardiner Sign List in a new tab';
    return '<a class="prova-openbook" href="../gardiner/gardiner.html" target="_blank" rel="noopener">' +
      '<span class="prova-openbook-glyph" aria-hidden="true">𓏟</span>' +
      '<span class="prova-openbook-label">' + esc(label) + '</span>' +
      '<span class="prova-openbook-ext" aria-hidden="true">↗</span>' +
    '</a>';
  }

  function renderProva() {
    if (!PROVA) { window.location.replace('index.html'); return; }
    document.title = T(PROVA.title) + ' · Musæum';
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    el('cursoHeader').innerHTML = renderHeader({
      backHref: 'index.html',
      backLabel: lang === 'pt' ? 'Índice' : 'Index',
      title: T(PROVA.kicker),
    });

    // Porteiro: a prova vem depois das lições. Sem elas concluídas, mostra um
    // aviso gentil em vez do teste (o cartão do índice já vem trancado, isto
    // cobre quem chega pela URL direta).
    if (!provaUnlocked()) {
      el('cursoContent').innerHTML =
        '<div class="licao-hero">' +
          '<span class="licao-hero-glyph" aria-hidden="true">' + PROVA.glyph + '</span>' +
          '<h1>' + T(PROVA.title) + '</h1>' +
          '<p>' + esc(lang === 'pt'
            ? 'O teste abre depois que você conclui as seis lições dos Primeiros passos. Volte ao índice e finalize as lições que faltam.'
            : 'The test opens after you finish the six First steps lessons. Go back to the index and complete the remaining lessons.') + '</p>' +
        '</div>' +
        '<div class="prova-result-actions"><a class="btn btn-primary" href="index.html">' + (lang === 'pt' ? '← Voltar ao índice' : '← Back to index') + '</a></div>';
      wireChrome();
      return;
    }

    var draw = Math.min(PROVA.draw || PROVA.questions.length, PROVA.questions.length);
    provaState = { queue: shuffle(PROVA.questions).slice(0, draw), i: 0, score: 0, wrong: [] };

    el('cursoContent').innerHTML =
      '<div class="licao-hero">' +
        '<div class="licao-hero-num">' + esc(T(PROVA.kicker)) + '</div>' +
        '<span class="licao-hero-glyph" aria-hidden="true">' + PROVA.glyph + '</span>' +
        '<h1>' + T(PROVA.title) + '</h1>' +
        (PROVA.intro ? '<p>' + T(PROVA.intro) + '</p>' : '') +
      '</div>' +
      provaOpenBook() +
      '<section class="licao-section"><div class="prova-box" id="provaBox"></div></section>';

    wireChrome();
    renderProvaQuestion();
  }

  function renderProvaQuestion() {
    var st = provaState;
    var total = st.queue.length;
    if (st.i >= total) { renderProvaResult(); return; }
    var q = st.queue[st.i];

    el('provaBox').innerHTML =
      '<div class="prova-meta">' +
        '<span>' + (lang === 'pt' ? 'Questão ' : 'Question ') + (st.i + 1) + (lang === 'pt' ? ' de ' : ' of ') + total + '</span>' +
        '<span class="prova-score">' + (lang === 'pt' ? 'Acertos: ' : 'Correct: ') + st.score + '</span>' +
      '</div>' +
      '<div class="prova-stage" id="provaStage"></div>' +
      '<div class="prova-feedback" id="provaFeedback" role="status" aria-live="polite"></div>' +
      '<div class="prova-nav" id="provaNav"></div>';

    var stage = el('provaStage');
    if (q.kind === 'mc' || q.kind === 'fill') renderProvaChoice(q, stage);
    else if (q.kind === 'build') renderProvaBuild(q, stage);
    else if (q.kind === 'order') renderProvaOrder(q, stage);
    else if (q.kind === 'match') renderProvaMatch(q, stage);
  }

  function okBody(q) {
    if (q.kind === 'mc' || q.kind === 'fill') return esc(T(q.fbOk));
    if (q.translit) return '✓ ' + esc(q.translit) + (q.note ? ' · ' + T(q.note) : '');
    return '✓ ' + (lang === 'pt' ? 'Correto.' : 'Correct.');
  }
  function errBody(q) {
    if (q.kind === 'mc' || q.kind === 'fill') return esc(T(q.fbErr));
    if (q.note) return (lang === 'pt' ? 'Não é bem assim. ' : 'Not quite. ') + T(q.note);
    return lang === 'pt' ? 'Não é bem assim.' : 'Not quite.';
  }

  function provaGraded(q, correct) {
    var st = provaState, fb = el('provaFeedback');
    if (correct) { st.score++; }
    else { st.wrong.push(q.lesson); if (window.Research) Research.trackAttempt('quiz', 'prova'); }
    fb.style.color = correct ? 'var(--green)' : 'var(--terracotta-lt)';
    fb.innerHTML = (correct ? okBody(q) : errBody(q)) + (correct ? '' : ' ' + reviseLink(q.lesson));
    showProvaNext();
  }

  function showProvaNext() {
    var st = provaState, nav = el('provaNav');
    var last = st.i >= st.queue.length - 1;
    nav.innerHTML = '<button class="btn btn-primary" id="provaNextBtn">' +
      (last ? (lang === 'pt' ? 'Ver resultado →' : 'See result →') : (lang === 'pt' ? 'Próxima →' : 'Next →')) + '</button>';
    el('provaNextBtn').addEventListener('click', function () {
      st.i++;
      if (st.i >= st.queue.length) { renderProvaResult(); }
      else { renderProvaQuestion(); var box = el('provaBox'); if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  }

  /* mc / fill: escolha única (mesma mecânica do quiz da lição). */
  function renderProvaChoice(q, stage) {
    var head = q.kind === 'fill' ? '<div class="prova-fill-translit">' + esc(q.translit) + '</div>' : '';
    var opts = shuffle(q.options).map(function (o) {
      return '<button class="quiz-opt" data-correct="' + (o.correct ? '1' : '0') + '">' + esc(T(o.label)) + '</button>';
    }).join('');
    stage.innerHTML =
      '<span class="quiz-glyph" aria-hidden="true">' + (q.glyph || '') + '</span>' +
      '<p class="quiz-question">' + esc(T(q.q)) + '</p>' + head +
      '<div class="quiz-options" id="provaOptions">' + opts + '</div>';
    var options = stage.querySelectorAll('#provaOptions .quiz-opt');
    options.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        var correct = btn.dataset.correct === '1';
        options.forEach(function (o) { o.disabled = true; if (o.dataset.correct === '1') o.classList.add('correct'); });
        btn.classList.add(correct ? 'correct' : 'wrong');
        provaGraded(q, correct);
      });
    });
  }

  /* build: construtor de palavra (uma tentativa, confirmada). */
  function renderProvaBuild(q, stage) {
    var map = gardinerMap();
    var keys = shuffle(q.palette).map(function (id) {
      var row = map[id] || [id, '', '', id];
      return '<button class="builder-key" type="button" data-id="' + esc(id) + '">' +
        '<span class="bk-glyph">' + (row[1] || '') + '</span>' +
        '<span class="bk-ph">' + esc(row[2] || '') + '</span>' +
      '</button>';
    }).join('');
    stage.innerHTML =
      '<p class="prova-prompt">' + T(q.prompt) + '</p>' +
      '<div class="builder-task"><span class="builder-task-word">' + esc(T(q.meaning)) + ' <em>(' + esc(q.translit) + ')</em></span></div>' +
      '<div class="builder-strip' + (q.cartouche ? ' as-cartouche' : '') + '" id="provaStrip" aria-live="polite"></div>' +
      '<div class="builder-controls">' +
        '<button class="btn" type="button" id="provaBack">' + (lang === 'pt' ? '⌫ Apagar' : '⌫ Delete') + '</button>' +
        '<button class="btn" type="button" id="provaClear">' + (lang === 'pt' ? 'Limpar' : 'Clear') + '</button>' +
      '</div>' +
      '<div class="builder-palette">' + keys + '</div>' +
      '<div class="prova-confirm-wrap"><button class="btn btn-primary" type="button" id="provaConfirm" disabled>' + (lang === 'pt' ? 'Conferir' : 'Check') + '</button></div>';
    var built = [], strip = el('provaStrip'), confirm = el('provaConfirm');
    function renderStrip() {
      strip.innerHTML = built.length
        ? built.map(function (id) { return '<span class="bs-glyph">' + ((map[id] || [])[1] || '') + '</span>'; }).join('')
        : '<span class="builder-strip-empty">' + (lang === 'pt' ? 'clique nos sinais abaixo' : 'click the signs below') + '</span>';
      confirm.disabled = built.length === 0;
    }
    stage.querySelectorAll('.builder-key').forEach(function (k) {
      k.addEventListener('click', function () { built.push(k.dataset.id); renderStrip(); });
    });
    el('provaBack').addEventListener('click', function () { built.pop(); renderStrip(); });
    el('provaClear').addEventListener('click', function () { built = []; renderStrip(); });
    confirm.addEventListener('click', function () {
      var correct = built.join(',') === q.answer.join(',');
      stage.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
      strip.classList.toggle('solved', correct);
      provaGraded(q, correct);
    });
    renderStrip();
  }

  /* order: colocar os sinais dados na ordem de escrita. */
  function renderProvaOrder(q, stage) {
    var map = gardinerMap();
    var tiles = shuffle(q.answer.map(function (id, idx) { return { id: id, key: idx }; }));
    var tilesHtml = tiles.map(function (t) {
      var row = map[t.id] || [t.id, '', '', t.id];
      return '<button class="order-tile" type="button" data-key="' + t.key + '" data-id="' + esc(t.id) + '">' +
        '<span class="bk-glyph">' + (row[1] || '') + '</span>' +
        '<span class="bk-ph">' + esc(row[2] || '') + '</span>' +
      '</button>';
    }).join('');
    stage.innerHTML =
      '<p class="prova-prompt">' + T(q.prompt) + '</p>' +
      '<div class="builder-task"><span class="builder-task-word"><em>' + esc(q.translit) + '</em></span></div>' +
      '<div class="builder-strip' + (q.cartouche ? ' as-cartouche' : '') + '" id="provaStrip" aria-live="polite"></div>' +
      '<div class="builder-controls"><button class="btn" type="button" id="provaBack">' + (lang === 'pt' ? '⌫ Apagar' : '⌫ Delete') + '</button></div>' +
      '<div class="order-pool" id="orderPool">' + tilesHtml + '</div>' +
      '<div class="prova-confirm-wrap"><button class="btn btn-primary" type="button" id="provaConfirm" disabled>' + (lang === 'pt' ? 'Conferir' : 'Check') + '</button></div>';
    var placed = [], strip = el('provaStrip'), confirm = el('provaConfirm'), pool = el('orderPool');
    function renderStrip() {
      strip.innerHTML = placed.length
        ? placed.map(function (p) { return '<span class="bs-glyph">' + ((map[p.id] || [])[1] || '') + '</span>'; }).join('')
        : '<span class="builder-strip-empty">' + (lang === 'pt' ? 'clique nos sinais na ordem' : 'click the signs in order') + '</span>';
      confirm.disabled = placed.length !== q.answer.length;
    }
    pool.querySelectorAll('.order-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        if (tile.classList.contains('used')) return;
        tile.classList.add('used'); tile.disabled = true;
        placed.push({ key: tile.dataset.key, id: tile.dataset.id });
        renderStrip();
      });
    });
    el('provaBack').addEventListener('click', function () {
      var last = placed.pop();
      if (last) { var t = pool.querySelector('.order-tile[data-key="' + last.key + '"]'); if (t) { t.classList.remove('used'); t.disabled = false; } }
      renderStrip();
    });
    confirm.addEventListener('click', function () {
      var correct = placed.map(function (p) { return p.id; }).join(',') === q.answer.join(',');
      stage.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
      strip.classList.toggle('solved', correct);
      provaGraded(q, correct);
    });
    renderStrip();
  }

  /* match: parear cada sinal com o seu valor. */
  function renderProvaMatch(q, stage) {
    var map = gardinerMap();
    var COLORS = ['a', 'b', 'c', 'd', 'e', 'f'];
    function build() {
      var lefts = shuffle(q.pairs.map(function (p, i) { return { i: i, id: p.id }; }));
      var rights = shuffle(q.pairs.map(function (p, i) { return { i: i, label: p.label }; }));
      var leftHtml = lefts.map(function (l) {
        var row = map[l.id] || [l.id, '', '', l.id];
        return '<button class="match-item match-left" type="button" data-i="' + l.i + '">' +
          '<span class="match-glyph">' + (row[1] || '') + '</span></button>';
      }).join('');
      var rightHtml = rights.map(function (r) {
        return '<button class="match-item match-right" type="button" data-i="' + r.i + '">' + esc(T(r.label)) + '</button>';
      }).join('');
      stage.innerHTML =
        '<p class="prova-prompt">' + T(q.prompt) + '</p>' +
        '<div class="match-grid">' +
          '<div class="match-col" id="matchLeft">' + leftHtml + '</div>' +
          '<div class="match-col" id="matchRight">' + rightHtml + '</div>' +
        '</div>' +
        '<div class="builder-controls"><button class="btn" type="button" id="matchReset">' + (lang === 'pt' ? 'Recomeçar' : 'Reset') + '</button></div>' +
        '<div class="prova-confirm-wrap"><button class="btn btn-primary" type="button" id="provaConfirm" disabled>' + (lang === 'pt' ? 'Conferir' : 'Check') + '</button></div>';

      var selLeft = null, pairs = {}, confirm = el('provaConfirm');
      function updateConfirm() { confirm.disabled = Object.keys(pairs).length !== q.pairs.length; }
      stage.querySelectorAll('.match-left').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.classList.contains('done')) return;
          stage.querySelectorAll('.match-item.sel').forEach(function (x) { x.classList.remove('sel'); });
          selLeft = btn; btn.classList.add('sel');
        });
      });
      stage.querySelectorAll('.match-right').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (!selLeft || btn.classList.contains('done')) return;
          var li = selLeft.dataset.i;
          pairs[li] = btn.dataset.i;
          var c = COLORS[Object.keys(pairs).length - 1] || 'a';
          selLeft.classList.add('done', 'pair-' + c);
          btn.classList.add('done', 'pair-' + c);
          selLeft.classList.remove('sel'); selLeft = null;
          updateConfirm();
        });
      });
      el('matchReset').addEventListener('click', build);
      confirm.addEventListener('click', function () {
        var correct = true;
        Object.keys(pairs).forEach(function (li) { if (pairs[li] !== li) correct = false; });
        stage.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
        provaGraded(q, correct);
      });
    }
    build();
  }

  function renderProvaResult() {
    var st = provaState, total = st.queue.length;
    var need = Math.ceil((PROVA.pass || 0.7) * total);
    var passed = st.score >= need;
    var pct = Math.round((st.score / total) * 100);
    if (passed) markDone(PROVA.id);

    var wrongLessons = st.wrong.filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
    var scoreLine = (lang === 'pt' ? 'Você acertou ' : 'You got ') + st.score + (lang === 'pt' ? ' de ' : ' of ') + total + ' (' + pct + '%).';

    var body;
    if (passed) {
      body = '<p>' + esc(lang === 'pt'
        ? 'Você concluiu o Módulo 1, os Primeiros passos nos hieróglifos. Seu Certificado de Leitura foi liberado na página inicial, na aba Hieróglifos.'
        : 'You have completed Module 1, the First steps in hieroglyphs. Your Reading Certificate has been unlocked on the home page, in the Hieroglyphs tab.') + '</p>' +
        '<div class="prova-result-actions">' +
          '<a class="btn btn-primary" href="../index.html">' + (lang === 'pt' ? 'Ir ao certificado →' : 'Go to the certificate →') + '</a>' +
          '<a class="btn" href="index.html">' + (lang === 'pt' ? 'Voltar ao índice' : 'Back to index') + '</a>' +
        '</div>';
    } else {
      var revise = wrongLessons.length
        ? '<div class="prova-revise-list"><span>' + (lang === 'pt' ? 'Vale revisar:' : 'Worth reviewing:') + '</span>' +
          wrongLessons.map(function (n) {
            var l = lessonByNum(n);
            return l ? '<a class="prova-revise" href="licao.html?licao=' + l.id + '">' + (lang === 'pt' ? 'Lição ' : 'Lesson ') + n + '</a>' : '';
          }).join('') + '</div>'
        : '';
      body = '<p>' + esc(lang === 'pt'
        ? ('Faltou pouco: são necessários ' + need + ' acertos em ' + total + '. Reveja os pontos abaixo e refaça o teste, que sorteia novas questões.')
        : ('Almost there: you need ' + need + ' correct out of ' + total + '. Review the points below and retake the test, which draws fresh questions.')) + '</p>' +
        revise +
        '<div class="prova-result-actions">' +
          '<button class="btn btn-primary" id="provaRetry">' + (lang === 'pt' ? 'Refazer o teste →' : 'Retake the test →') + '</button>' +
          '<a class="btn" href="index.html">' + (lang === 'pt' ? 'Voltar ao índice' : 'Back to index') + '</a>' +
        '</div>';
    }

    el('provaBox').innerHTML =
      '<div class="prova-result ' + (passed ? 'is-pass' : 'is-fail') + '">' +
        '<span class="prova-result-glyph" aria-hidden="true">' + (passed ? '𓋹' : '𓂻') + '</span>' +
        '<h2>' + (passed ? (lang === 'pt' ? 'Aprovado!' : 'Passed!') : (lang === 'pt' ? 'Ainda não' : 'Not yet')) + '</h2>' +
        '<p class="prova-result-score">' + esc(scoreLine) + '</p>' +
        body +
      '</div>';
    if (!passed) { var r = el('provaRetry'); if (r) r.addEventListener('click', function () { renderProva(); window.scrollTo(0, 0); }); }

    if (window.Research) Research.trackLessonComplete({
      lessonId: PROVA.id, lessonNum: LESSONS.length + 1, totalLessons: LESSONS.length,
      quizScore: st.score, quizMax: total, lang: lang,
    });
    var box = el('provaBox'); if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderProvaCard() {
    if (!PROVA) return '';
    var unlocked = provaUnlocked();
    var done = isDone(PROVA.id);
    var tag = unlocked ? 'a' : 'div';
    var check = done ? '<span class="licao-item-check" aria-hidden="true">✓</span>' : '';
    var badgeTxt = done ? (lang === 'pt' ? 'Aprovado' : 'Passed')
      : (unlocked ? (lang === 'pt' ? 'Disponível' : 'Available') : (lang === 'pt' ? 'Conclua as lições' : 'Finish the lessons'));
    var desc = lang === 'pt'
      ? 'O teste dos primeiros passos: dez questões sorteadas, com consulta aberta. Ao passar, o Certificado de Leitura é liberado.'
      : 'The first steps test: ten drawn questions, open book. Passing unlocks the Reading Certificate.';
    return '<li>' +
      '<' + tag + ' class="licao-item prova-item' + (unlocked ? '' : ' locked') + (done ? ' is-done' : '') + '"' + (unlocked ? ' href="prova.html"' : '') + '>' +
        '<span class="licao-item-glyph" aria-hidden="true">' + PROVA.glyph + '</span>' +
        '<div class="licao-item-body">' +
          '<div class="licao-item-num">' + esc(T(PROVA.kicker)) + '</div>' +
          '<div class="licao-item-title">' + T(PROVA.title) + check + '</div>' +
          '<p class="licao-item-desc">' + esc(desc) + '</p>' +
        '</div>' +
        '<div class="licao-item-meta">' +
          '<span class="licao-item-badge ' + (done ? 'badge-final' : 'badge-start') + '">' + esc(badgeTxt) + '</span>' +
        '</div>' +
      '</' + tag + '>' +
    '</li>';
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
        '<ul class="licoes-lista">' + list + renderProvaCard() + '</ul>' +
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
    } else if (page === 'prova') {
      renderProva();
    } else {
      renderIndex();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (window.Research) Research.init(); // consentimento na 1ª visita ao curso
    render();
  });
})();
