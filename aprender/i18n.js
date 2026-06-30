function applyI18n(I18N, lang) {
  const t = I18N[lang] || I18N.pt;
  if (t._title) document.title = t._title;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const v = t[el.dataset.i18n];
    if (v == null) return;
    if (v.indexOf('<') !== -1) el.innerHTML = v; else el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
    const v = t[el.dataset.i18nAria];
    if (v != null) el.setAttribute('aria-label', v);
  });
}
