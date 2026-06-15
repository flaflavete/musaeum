// Seção Mapa: aplica os textos i18n e delega o desenho para data/geografia.js
// (cores por história derivadas do catálogo; histórias novas entram sem CSS).
  function renderGeoSection() {
    const t = i18n[currentLang];
    document.getElementById('geoHeading').textContent = t.geoTitle;
    document.getElementById('geoSummary').textContent = geoVisiblePlaces().length;
    document.getElementById('geoIntro').textContent = t.geoIntro;
    document.getElementById('geoCredit').textContent = t.geoCredit;
    document.getElementById('geoBasemap').alt = t.geoTitle;
    // Cores por história, marcadores, painel e legenda (data/geografia.js).
    // As cores derivam do catálogo: histórias novas entram sem tocar no CSS.
    injectGeoStoryStyles();
    renderGeoMap(currentLang);
    renderGeoLegend(currentLang, { multi: t.geoLegendMulti, uncertain: t.geoLegendUncertain });
  }
