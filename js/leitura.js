// Lê em blocos curtos: o Chrome corta falas longas, e assim dá para destacar o trecho atual.
(function () {
  const suportado = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const SELETOR_BLOCOS = 'h1, h2, h3, h4, p, li, tr, .atalho, .status-pill, .accordion-button, .accordion-body';
  const CHAVE_LENTA = 'ubs:leitura-lenta';

  let fila = [];
  let indice = 0;
  let estado = 'parado'; // parado | lendo | pausado
  let blocoAtual = null;

  function vozPortugues() {
    const vozes = window.speechSynthesis.getVoices();
    return vozes.find((v) => v.lang === 'pt-BR') || vozes.find((v) => v.lang && v.lang.startsWith('pt')) || null;
  }

  function leituraLenta() {
    try {
      return localStorage.getItem(CHAVE_LENTA) === '1';
    } catch {
      return false;
    }
  }

  function textoDe(el) {
    return (el.innerText || el.textContent || '').replace(/\s*\n+\s*/g, ', ').replace(/\s+/g, ' ').trim();
  }

  function montarFila() {
    const main = document.getElementById('conteudo');
    const todos = [...main.querySelectorAll(SELETOR_BLOCOS)];
    return todos
      .filter((el) => !todos.some((outro) => outro !== el && outro.contains(el)))
      .filter((el) => !el.closest('.visually-hidden, [aria-hidden="true"], [hidden]'))
      .map((el) => ({ el, texto: textoDe(el) }))
      .filter((b) => b.texto);
  }

  function destacar(el) {
    if (blocoAtual) blocoAtual.classList.remove('lendo');
    blocoAtual = el;
    if (!el) return;
    el.classList.add('lendo');
    el.scrollIntoView({ block: 'center' });
  }

  function falarTexto(texto, aoTerminar) {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    const voz = vozPortugues();
    if (voz) fala.voice = voz;
    fala.rate = leituraLenta() ? 0.75 : 1;
    fala.onend = aoTerminar || null;
    fala.onerror = (evento) => {
      // "interrupted"/"canceled" vêm do próprio parar(), não são falhas
      if (evento.error !== 'interrupted' && evento.error !== 'canceled') parar();
    };
    window.speechSynthesis.speak(fala);
  }

  function lerProximo() {
    if (estado !== 'lendo') return;
    if (indice >= fila.length) {
      parar();
      anunciar('Leitura concluída.');
      return;
    }
    const bloco = fila[indice];
    destacar(bloco.el);
    anunciar(`Lendo: ${bloco.texto.slice(0, 80)}${bloco.texto.length > 80 ? '…' : ''}`);
    falarTexto(bloco.texto, () => {
      indice += 1;
      lerProximo();
    });
  }

  function iniciar() {
    window.speechSynthesis.cancel();
    fila = montarFila();
    indice = 0;
    estado = 'lendo';
    atualizarControles();
    lerProximo();
  }

  function pausarOuContinuar() {
    if (estado === 'lendo') {
      window.speechSynthesis.pause();
      estado = 'pausado';
      anunciar('Leitura pausada.');
    } else if (estado === 'pausado') {
      window.speechSynthesis.resume();
      estado = 'lendo';
      anunciar('Leitura retomada.');
    }
    atualizarControles();
  }

  function parar() {
    estado = 'parado';
    window.speechSynthesis.cancel();
    destacar(null);
    atualizarControles();
    anunciar('');
  }

  function falar(texto) {
    if (!suportado || !texto) return;
    parar();
    falarTexto(texto);
  }

  function anunciar(mensagem) {
    const status = document.getElementById('leitura-status');
    if (status) status.textContent = mensagem;
  }

  function atualizarControles() {
    const ativo = estado !== 'parado';
    const topo = document.getElementById('btn-ouvir');
    if (topo) {
      topo.setAttribute('aria-pressed', String(ativo));
      topo.setAttribute('aria-label', ativo ? 'Parar leitura em voz alta' : 'Ouvir a página em voz alta');
      topo.querySelector('.rotulo').textContent = ativo ? 'Parar' : 'Ouvir';
      topo.querySelector('i').className = `bi ${ativo ? 'bi-stop-fill' : 'bi-volume-up-fill'}`;
    }
    const pausar = document.querySelector('[data-leitura="pausar"]');
    if (pausar) {
      pausar.disabled = !ativo;
      pausar.querySelector('span').textContent = estado === 'pausado' ? 'Continuar' : 'Pausar';
    }
    const pararBtn = document.querySelector('[data-leitura="parar"]');
    if (pararBtn) pararBtn.disabled = !ativo;
  }

  function configurar() {
    if (!suportado) {
      document.querySelectorAll('[data-requer-voz]').forEach((el) => { el.hidden = true; });
      document.querySelectorAll('[data-sem-voz]').forEach((el) => { el.hidden = false; });
      return;
    }

    document.getElementById('btn-ouvir')?.addEventListener('click', () => (estado === 'parado' ? iniciar() : parar()));
    document.querySelector('[data-leitura="iniciar"]')?.addEventListener('click', iniciar);
    document.querySelector('[data-leitura="pausar"]')?.addEventListener('click', pausarOuContinuar);
    document.querySelector('[data-leitura="parar"]')?.addEventListener('click', parar);

    const lenta = document.getElementById('leitura-lenta');
    if (lenta) {
      lenta.checked = leituraLenta();
      lenta.addEventListener('change', () => {
        try {
          localStorage.setItem(CHAVE_LENTA, lenta.checked ? '1' : '0');
        } catch {
          // sem localStorage: vale só nesta visita
        }
      });
    }

    window.speechSynthesis.getVoices();
    window.addEventListener('pagehide', () => window.speechSynthesis.cancel());
    atualizarControles();
  }

  window.LeituraVoz = { suportado, falar, iniciar, parar };
  document.addEventListener('DOMContentLoaded', configurar);
})();
