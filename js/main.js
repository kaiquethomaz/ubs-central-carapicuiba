// Horário da recepção (0 = domingo); manter igual à tabela de horários do index.html.
const HORARIOS = {
  0: null,
  1: ['07:00', '16:00'],
  2: ['07:00', '16:00'],
  3: ['07:00', '16:00'],
  4: ['07:00', '16:00'],
  5: ['07:00', '16:00'],
  6: null,
};

function paraMinutos(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function atualizarStatus() {
  const pill = document.getElementById('status-funcionamento');
  if (!pill) return;

  const agora = new Date();
  const hoje = HORARIOS[agora.getDay()];
  const minutos = agora.getHours() * 60 + agora.getMinutes();
  const aberto = Boolean(hoje) && minutos >= paraMinutos(hoje[0]) && minutos < paraMinutos(hoje[1]);

  pill.classList.toggle('is-open', aberto);
  pill.classList.toggle('is-closed', !aberto);
  pill.querySelector('.status-texto').textContent = aberto
    ? `Unidade Aberta Agora (Atendimento até ${hoje[1]})`
    : 'Unidade Fechada no Momento';
}

function fecharMenuAoNavegar() {
  const menu = document.getElementById('menu');
  if (!menu || !window.bootstrap) return;
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
}

function abrirFaqPeloLink(hash) {
  const alvo = hash && document.querySelector(`${hash}.accordion-collapse`);
  if (!alvo || !window.bootstrap) return false;
  bootstrap.Collapse.getOrCreateInstance(alvo, { toggle: false }).show();
  alvo.closest('.accordion-item').scrollIntoView({ block: 'start' });
  return true;
}

function configurarLinksDoFaq() {
  document.querySelectorAll('a[href^="#faq-"]').forEach((link) => {
    link.addEventListener('click', (evento) => {
      if (abrirFaqPeloLink(link.getAttribute('href'))) evento.preventDefault();
    });
  });
  abrirFaqPeloLink(location.hash);
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarStatus();
  fecharMenuAoNavegar();
  configurarLinksDoFaq();
  setInterval(atualizarStatus, 60 * 1000);

  const ano = document.getElementById('ano-atual');
  if (ano) ano.textContent = new Date().getFullYear();
});
