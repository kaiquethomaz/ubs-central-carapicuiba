(function () {
  const CHAVE = 'ubs:acessibilidade';
  const NIVEIS_FONTE = [100, 115, 130, 150];
  const CLASSES = {
    altoContraste: 'alto-contraste',
    fonteLegivel: 'fonte-legivel',
    destacarLinks: 'destacar-links',
    cursorGrande: 'cursor-grande',
    espacamento: 'espacamento-texto',
    pausarAnimacoes: 'sem-animacoes',
  };
  const PADRAO = {
    altoContraste: false,
    nivelFonte: 0,
    fonteLegivel: false,
    destacarLinks: false,
    cursorGrande: false,
    espacamento: false,
    pausarAnimacoes: false,
  };

  let prefs = { ...PADRAO };

  function carregar() {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) || 'null');
      if (salvo) return { ...PADRAO, ...salvo };
      const antigo = { ...PADRAO };
      if (localStorage.getItem('ubs:alto-contraste') === '1') antigo.altoContraste = true;
      if (localStorage.getItem('ubs:fonte-grande') === '1') antigo.nivelFonte = 2;
      localStorage.removeItem('ubs:alto-contraste');
      localStorage.removeItem('ubs:fonte-grande');
      return antigo;
    } catch {
      return { ...PADRAO };
    }
  }

  function salvar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(prefs));
    } catch {
      // sem localStorage (ex.: navegação privada): vale só nesta visita
    }
  }

  function aplicar() {
    Object.entries(CLASSES).forEach(([pref, classe]) => {
      document.body.classList.toggle(classe, Boolean(prefs[pref]));
      const chave = document.querySelector(`[data-pref="${pref}"]`);
      if (chave) chave.checked = Boolean(prefs[pref]);
    });

    document.body.dataset.fonte = String(prefs.nivelFonte);
    const valor = document.getElementById('valor-fonte');
    if (valor) valor.textContent = `${NIVEIS_FONTE[prefs.nivelFonte]}%`;

    const contraste = document.getElementById('btn-contraste');
    if (contraste) contraste.setAttribute('aria-pressed', String(prefs.altoContraste));

    const noMinimo = prefs.nivelFonte === 0;
    const noMaximo = prefs.nivelFonte === NIVEIS_FONTE.length - 1;
    document.querySelectorAll('#btn-fonte-menos, [data-fonte="menos"]').forEach((b) => { b.disabled = noMinimo; });
    document.querySelectorAll('#btn-fonte-mais, [data-fonte="mais"]').forEach((b) => { b.disabled = noMaximo; });
  }

  function definir(pref, valor) {
    prefs[pref] = valor;
    aplicar();
    salvar();
  }

  function alternarAltoContraste() {
    definir('altoContraste', !prefs.altoContraste);
  }

  function aumentarFonte() {
    definir('nivelFonte', Math.min(prefs.nivelFonte + 1, NIVEIS_FONTE.length - 1));
  }

  function diminuirFonte() {
    definir('nivelFonte', Math.max(prefs.nivelFonte - 1, 0));
  }

  function restaurarPadrao() {
    prefs = { ...PADRAO };
    aplicar();
    salvar();
  }

  window.Acessibilidade = { alternarAltoContraste, aumentarFonte, diminuirFonte, restaurarPadrao };

  const ALVOS = { 1: '#conteudo', 2: '#navegacao', 3: '#avisos', 4: '#rodape' };

  function irPara(seletor) {
    const alvo = document.querySelector(seletor);
    if (!alvo) return;
    if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
    alvo.scrollIntoView({ block: 'start' });
    const primeiroVisivel = seletor === '#navegacao'
      ? [...alvo.querySelectorAll('.navbar-toggler, .nav-link')].find((el) => el.offsetParent !== null)
      : null;
    (primeiroVisivel || alvo).focus({ preventScroll: true });
  }

  function configurarAtalhos() {
    document.addEventListener('keydown', (evento) => {
      if (!evento.altKey || evento.ctrlKey || evento.metaKey || evento.shiftKey) return;
      const numero = (evento.code || '').replace(/^(Digit|Numpad)/, '');
      if (!ALVOS[numero]) return;
      evento.preventDefault();
      irPara(ALVOS[numero]);
    });

    document.querySelectorAll('.skip-links a').forEach((link) => {
      link.addEventListener('click', (evento) => {
        evento.preventDefault();
        irPara(link.getAttribute('href'));
      });
    });

    const painel = document.getElementById('painel-acessibilidade');
    document.querySelectorAll('.fecha-painel').forEach((link) => {
      link.addEventListener('click', (evento) => {
        if (!painel || !window.bootstrap) return;
        evento.preventDefault();
        painel.addEventListener('hidden.bs.offcanvas', () => irPara(link.getAttribute('href')), { once: true });
        bootstrap.Offcanvas.getOrCreateInstance(painel).hide();
      });
    });
  }

  function configurarControles() {
    document.getElementById('btn-contraste')?.addEventListener('click', alternarAltoContraste);
    document.getElementById('btn-fonte-mais')?.addEventListener('click', aumentarFonte);
    document.getElementById('btn-fonte-menos')?.addEventListener('click', diminuirFonte);
    document.getElementById('pref-restaurar')?.addEventListener('click', restaurarPadrao);

    document.querySelectorAll('[data-pref]').forEach((chave) => {
      chave.addEventListener('change', () => definir(chave.dataset.pref, chave.checked));
    });

    const acoesFonte = { mais: aumentarFonte, menos: diminuirFonte, padrao: () => definir('nivelFonte', 0) };
    document.querySelectorAll('[data-fonte]').forEach((botao) => {
      botao.addEventListener('click', acoesFonte[botao.dataset.fonte]);
    });
  }

  prefs = carregar();
  // aplica antes do DOMContentLoaded para o tema padrão não piscar
  aplicar();
  document.addEventListener('DOMContentLoaded', () => {
    configurarControles();
    configurarAtalhos();
  });
})();
