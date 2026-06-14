// Plumbing dos modais: bloqueio de fundo (inert), modal Sobre e card do
// glifo (Códex). setPageInert é compartilhado com onboarding.js.

  // Enquanto um modal está aberto, o resto da página fica inert:
  // Tab e leitores de tela não escapam para o conteúdo de fundo.
  function setPageInert(on) {
    const main = document.querySelector('main.container');
    if (main) main.inert = on;
  }

  // ===== MODAL SOBRE =====
  let aboutOpen = false;

  function openAbout() {
    const m = document.getElementById('aboutModal');
    m.classList.add('show');
    aboutOpen = true;
    document.body.style.overflow = 'hidden';
    setPageInert(true);
    setTimeout(() => document.getElementById('btnCloseAbout').focus(), 60);
  }
  function closeAbout() {
    document.getElementById('aboutModal').classList.remove('show');
    aboutOpen = false;
    document.body.style.overflow = '';
    setPageInert(false);
    document.getElementById('btnAbout').focus();
  }
  function closeAboutOnBackdrop(e) {
    if (e.target.id === 'aboutModal') closeAbout();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.getElementById('glyphModal').classList.contains('show')) closeGlyphCard();
      else if (aboutOpen) closeAbout();
    }
  });

  // ===== CARD DO GLIFO (CÓDEX) =====
  function openGlyphCard(storyId, idx) {
    const story = catalogGet(storyId);
    if (!story || !story.codex) return;
    const g    = story.codex[idx];
    const lang = currentLang;
    const name    = lang === 'pt' ? g.namePt    : g.nameEn;
    const meaning = lang === 'pt' ? g.meaningPt : g.meaningEn;
    const note    = lang === 'pt' ? g.notePt    : g.noteEn;
    const chapterLabel = g.chapter === -1
      ? (lang === 'pt' ? 'Introdução' : 'Introduction')
      : `${lang === 'pt' ? 'Capítulo' : 'Chapter'} ${g.chapter + 1}`;
    const lMeaning  = lang === 'pt' ? 'Significado'   : 'Meaning';
    const lAppears  = lang === 'pt' ? 'Descoberto em' : 'Discovered in';
    const lNote     = lang === 'pt' ? 'Nota'          : 'Note';

    document.getElementById('glyphModalBody').innerHTML = `
      <div class="glyph-sheet">
        <div class="sheet-big" aria-hidden="true">${g.glyph}</div>
        <div class="sheet-translit">${g.translit}</div>
        <div class="sheet-name" id="glyphModalTitle">${name}</div>
        <div class="sheet-rows">
          <div class="sheet-row">
            <div class="row-label">${lMeaning}</div>
            <div class="row-value">${meaning}</div>
          </div>
          <div class="sheet-row">
            <div class="row-label">${lAppears}</div>
            <div class="row-value">${chapterLabel}</div>
          </div>
          <div class="sheet-row">
            <div class="row-label">${lNote}</div>
            <div class="row-value">${note}</div>
          </div>
        </div>
      </div>`;

    const modal = document.getElementById('glyphModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    setPageInert(true);
    setTimeout(() => document.getElementById('glyphModalClose').focus(), 60);
  }

  function closeGlyphCard() {
    document.getElementById('glyphModal').classList.remove('show');
    document.body.style.overflow = '';
    setPageInert(false);
  }

  function closeGlyphCardOnBackdrop(e) {
    if (e.target.id === 'glyphModal') closeGlyphCard();
  }
