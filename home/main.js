// Orquestração da página inicial: estado de idioma, aplicação dos textos
// (setLang/render) e inicialização. Carregado por último, depois de i18n,
// dos renderizadores de seção e dos dados (catalogo.js, geografia.js).
  let currentLang = 'pt';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('musaeum-lang', lang);
    const t = i18n[lang];
    document.documentElement.lang = t.docLang;
    document.title = t.pageTitle;

    document.getElementById('btn-pt').classList.toggle('active', lang === 'pt');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-pt').setAttribute('aria-pressed', lang === 'pt');
    document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');

    render();
  }

  function render() {
    const t = i18n[currentLang];

    document.getElementById('btnAboutLabel').textContent = t.aboutBtn;
    document.getElementById('btnAbout').setAttribute('aria-label', t.aboutBtn);
    document.getElementById('btnCloseAbout').setAttribute('aria-label', t.aboutClose);


    document.getElementById('epigraphLabel').textContent = t.epigraphLabel;
    document.getElementById('epigraphQuote').textContent = t.epigraphQuote;
    document.getElementById('epigraphSource').textContent = t.epigraphSource;

    // Atualiza apenas os textos dos cards (preserva a animação em cascata)
    document.querySelectorAll('[data-t]').forEach(el => {
      const key = el.getAttribute('data-t');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    // Títulos, descrições e aria-labels dos cards vêm do catálogo
    for (const s of MUSAEUM_CATALOG) {
      const card = document.getElementById('card-' + s.storyId);
      if (!card) continue;
      const title = currentLang === 'pt' ? s.titlePt : s.titleEn;
      const desc  = currentLang === 'pt' ? s.descPt  : s.descEn;
      card.querySelector('.card-title').textContent = title;
      card.querySelector('.card-desc').textContent  = desc;
      card.setAttribute('aria-label', `${title}, ${s.available ? t.tagOpen : t.tagLocked}`);
    }

    document.getElementById('footerContent').innerText = t.footer;
    document.getElementById('footerPrivacy').innerText = t.footerPrivacy;
    document.getElementById('footerInstSupport').innerText = t.instSupport;
    renderCollection();
    renderGeoSection();
    renderCertificateSection();

    // Corpo do modal Sobre
    document.getElementById('aboutTitle').textContent = t.aboutTitle;
    document.getElementById('aboutBody').innerHTML = `
      <p>${t.aboutIntro}</p>
      <p>${t.aboutMiddle}</p>
      <p>${t.aboutGoal}</p>
      <p class="about-beta-note">${t.aboutBetaNote}</p>
      <div class="modal-subtitle">${t.aboutMethodTitle}</div>
      <p>${t.aboutMethod}</p>
      <div class="modal-subtitle">${t.aboutBiblioTitle}</div>
      <ul class="modal-biblio">
        ${t.aboutBiblio.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <div class="modal-credit">${t.aboutCredit.replace('\n', '<br>')}</div>
      <div class="modal-cite">
        <div class="modal-subtitle">${t.aboutCiteTitle}</div>
        <p class="cite-ref">${t.aboutCiteText}</p>
      </div>
      <div class="inst-logos modal-inst-logos">
        <span class="inst-logos-label">${t.instSupport}</span>
        <div class="inst-logos-plaque">
          <img class="logo-ppgarq" src="assets/images/ppgarq.png" alt="PPGArq · Museu Nacional / UFRJ">
          <span class="inst-logos-divider" aria-hidden="true"></span>
          <img class="logo-mn" src="assets/images/museu-nacional.png" alt="Museu Nacional / UFRJ">
        </div>
      </div>
      <div class="modal-license">
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt_BR" target="_blank" rel="noopener" aria-label="Licenciado sob Creative Commons BY-NC-SA 4.0">
          <img src="https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png" alt="CC BY-NC-SA 4.0" width="88" height="31">
        </a>
      </div>
    `;
  }

  // Inicialização
  migrateOldSaves();
  initTheme();
  buildLibrary();
  initTabKeys();
  const _savedLang = localStorage.getItem('musaeum-lang') || 'pt';
  setLang(_savedLang);
  if (window.Research) Research.init({ suppressModal: true });
  if (localStorage.getItem('musaeum-research-consent') === null) {
    _welcomeFirstRun = true;
    setTimeout(showLangModal, 500); // idioma → boas-vindas → tour
  }
