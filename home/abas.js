// Abas (Biblioteca · Mapa · Coleção · Certificado). Troca a seção visível sem
// recarregar. Sem persistência: sempre abre na Biblioteca, que é o convite
// (epígrafe + biblioteca).
  function showTab(name) {
    const tabs = document.querySelectorAll('#tabbar .tab');
    tabs.forEach(tab => {
      const active = tab.dataset.tab === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active);
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) {
        panel.classList.toggle('active', active);
        panel.hidden = !active;
      }
    });
  }

  // Setas/Home/End navegam entre as abas (padrão WAI-ARIA tablist).
  function initTabKeys() {
    const bar = document.getElementById('tabbar');
    if (!bar) return;
    const tabs = Array.from(bar.querySelectorAll('.tab'));
    bar.addEventListener('keydown', e => {
      const i = tabs.indexOf(document.activeElement);
      if (i === -1) return;
      let j = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') j = 0;
      else if (e.key === 'End') j = tabs.length - 1;
      if (j === null) return;
      e.preventDefault();
      tabs[j].focus();
      showTab(tabs[j].dataset.tab);
    });
  }
