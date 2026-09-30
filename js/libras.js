(function () {
  const abrir = document.getElementById('abrir-libras');
  if (!abrir) return;

  if (!window.VLibrasWidget) {
    abrir.hidden = true;
    return;
  }

  abrir.addEventListener('click', () => {
    const painel = document.getElementById('painel-acessibilidade');
    if (painel && window.bootstrap) bootstrap.Offcanvas.getOrCreateInstance(painel).hide();
    window.VLibrasWidget.open();
  });
})();
