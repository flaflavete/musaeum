// Primeiro acesso: seletor de idioma, nome do jogador, consentimento da
// pesquisa e oferta de tour. Sequência: idioma → boas-vindas → tour.

  // ===== NOME DO JOGADOR =====
  function savePlayerName(name) {
    localStorage.setItem('musaeum-player', JSON.stringify({ name }));
  }

  function openNameModal() {
    const t = i18n[currentLang];
    document.getElementById('nameModalTitle').textContent = t.nameModalTitle;
    document.getElementById('nameModalSub').textContent   = t.nameModalSub;
    document.getElementById('nameModalBtn').textContent   = t.nameModalBtn;
    document.getElementById('nameModalSkip').textContent  = t.nameModalSkip;
    const input = document.getElementById('nameInput');
    input.placeholder = t.nameModalPlaceholder;
    input.value = getPlayerName() || '';
    document.getElementById('researchConsentText').textContent = t.consentLabel;
    document.getElementById('researchConsent').checked =
      localStorage.getItem('musaeum-research-consent') === 'sim';
    document.getElementById('nameModal').classList.add('show');
    setPageInert(true);
    setTimeout(() => input.focus(), 60);
  }

  // ===== SELETOR DE IDIOMA (primeira pop-up) =====
  function showLangModal() {
    document.getElementById('langModal').classList.add('show');
    setPageInert(true);
    setTimeout(() => {
      const first = document.querySelector('#langModal .lang-choice');
      if (first) first.focus();
    }, 60);
  }

  function chooseLang(lang) {
    setLang(lang); // persiste em musaeum-lang
    document.getElementById('langModal').classList.remove('show');
    setTimeout(openNameModal, 340); // boas-vindas já no idioma escolhido
  }

  function closeNameModal() {
    document.getElementById('nameModal').classList.remove('show');
    setPageInert(false);
  }

  function recordConsent() {
    const checked = document.getElementById('researchConsent').checked;
    localStorage.setItem('musaeum-research-consent', checked ? 'sim' : 'não');
  }

  function saveName() {
    const name = document.getElementById('nameInput').value.trim();
    if (name) savePlayerName(name);
    recordConsent();
    closeNameModal();
    renderCollection();
    maybeOfferTour();
  }

  function skipName() {
    recordConsent();
    closeNameModal();
    maybeOfferTour();
  }

  // ===== TOUR GUIADO =====
  let _welcomeFirstRun = false;

  function maybeOfferTour() {
    if (!_welcomeFirstRun) return;
    _welcomeFirstRun = false;
    setTimeout(showTourOffer, 360); // depois do fade do modal de boas-vindas
  }

  function showTourOffer() {
    const t = i18n[currentLang];
    document.getElementById('tourOfferTitle').textContent = t.tourOfferTitle;
    document.getElementById('tourOfferSub').textContent   = t.tourOfferSub;
    document.getElementById('tourOfferYes').textContent   = t.tourOfferYes;
    document.getElementById('tourOfferNo').textContent    = t.tourOfferNo;
    document.getElementById('tourOfferModal').classList.add('show');
    setPageInert(true);
    setTimeout(() => document.getElementById('tourOfferYes').focus(), 60);
  }

  function closeTourOffer() {
    document.getElementById('tourOfferModal').classList.remove('show');
    setPageInert(false);
  }

  function acceptTourOffer() {
    closeTourOffer();
    setTimeout(startHomeTour, 340);
  }

  function declineTourOffer() {
    closeTourOffer();
  }

  function startHomeTour() {
    if (window.Tour && Tour.isActive()) return;
    const t = i18n[currentLang];
    const s = t.tourSteps;
    const selectors = ['#tab-inicio', '#tab-mapa', '#tab-colecao', '#tab-aprender', '#btnAbout'];
    const steps = selectors.map((sel, i) => ({ selector: sel, title: s[i].title, body: s[i].body }));
    if (window.Tour) {
      Tour.start(steps, {
        labels: { skip: t.tourSkip, prev: t.tourPrev, next: t.tourNext, done: t.tourDone }
      });
    }
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeNameModal(); closeTourOffer(); }
    // Enter confirma só quando o foco está no campo de nome; nos botões
    // ("Entrar sem nome" etc.) o Enter aciona o próprio botão focado.
    if (e.key === 'Enter' &&
        document.getElementById('nameModal').classList.contains('show') &&
        document.activeElement === document.getElementById('nameInput')) {
      saveName();
    }
  });
