// Dados da planilha entram no DOM só via textContent, nunca innerHTML.
(function () {
  const TIPOS = {
    Alerta: { rotulo: 'Alerta:', classe: 'is-alerta' },
    Campanha: { rotulo: 'Campanha Ativa:', classe: 'is-campanha' },
    Aviso: { rotulo: 'Aviso:', classe: 'is-aviso' },
  };
  const INTERVALO_ATUALIZACAO = 60 * 1000;
  const formatoData = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' });
  const formatoHora = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });

  let avisosAtivos = [];
  let assinaturaAtual = null;
  let listaExpandida = false;
  let carregando = false;

  function inicioDoDia(data) {
    const d = new Date(data);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function prepararAvisos(lista) {
    const hoje = inicioDoDia(new Date());
    return lista
      .filter((a) => !a.validoAte || inicioDoDia(a.validoAte) >= hoje)
      .sort((a, b) => {
        const alertaA = a.tipo === 'Alerta' ? 0 : 1;
        const alertaB = b.tipo === 'Alerta' ? 0 : 1;
        return alertaA - alertaB || b.publicadoEm - a.publicadoEm;
      });
  }

  function el(tag, classe, texto) {
    const node = document.createElement(tag);
    if (classe) node.className = classe;
    if (texto !== undefined) node.textContent = texto;
    return node;
  }

  function tipoDe(aviso) {
    return TIPOS[aviso.tipo] || TIPOS.Aviso;
  }

  function titulo(aviso, tag, classe) {
    const node = el(tag, classe);
    node.append(el('span', 'banner-rotulo', tipoDe(aviso).rotulo), document.createTextNode(` ${aviso.titulo}`));
    return node;
  }

  function validade(aviso) {
    return aviso.validoAte ? el('p', 'banner-validade', `Válido até ${formatoData.format(aviso.validoAte)}`) : null;
  }

  function renderPrincipal(aviso) {
    const bloco = el('div', 'banner-principal');
    bloco.append(titulo(aviso, 'h3', 'banner-titulo'), el('p', 'banner-mensagem', aviso.mensagem));
    const v = validade(aviso);
    if (v) bloco.append(v);

    if (window.LeituraVoz && window.LeituraVoz.suportado) {
      const ouvir = el('button', 'banner-ouvir');
      ouvir.type = 'button';
      const icone = el('i', 'bi bi-volume-up-fill');
      icone.setAttribute('aria-hidden', 'true');
      ouvir.append(icone, document.createTextNode(' Ouvir aviso'));
      ouvir.addEventListener('click', () => {
        const partes = [`${tipoDe(aviso).rotulo} ${aviso.titulo}.`, aviso.mensagem];
        if (aviso.validoAte) partes.push(`Válido até ${formatoData.format(aviso.validoAte)}.`);
        window.LeituraVoz.falar(partes.join(' '));
      });
      bloco.append(ouvir);
    }
    return bloco;
  }

  function renderOutros(outros) {
    const wrap = el('div', 'banner-outros');
    const lista = el('ul', 'banner-lista');
    lista.id = 'avisos-outros';
    lista.hidden = !listaExpandida;
    outros.forEach((aviso) => {
      const item = el('li', tipoDe(aviso).classe);
      item.append(titulo(aviso, 'h4', 'banner-item-titulo'), el('p', 'banner-mensagem', aviso.mensagem));
      const v = validade(aviso);
      if (v) item.append(v);
      lista.append(item);
    });

    const botao = el('button', 'banner-mais');
    botao.type = 'button';
    botao.setAttribute('aria-controls', lista.id);
    const rotuloBotao = () => {
      botao.setAttribute('aria-expanded', String(listaExpandida));
      botao.textContent = listaExpandida
        ? 'Ocultar outros avisos'
        : `Ver mais ${outros.length} ${outros.length === 1 ? 'aviso' : 'avisos'}`;
    };
    rotuloBotao();
    botao.addEventListener('click', () => {
      listaExpandida = !listaExpandida;
      lista.hidden = !listaExpandida;
      rotuloBotao();
    });

    wrap.append(botao, lista);
    return wrap;
  }

  function definirVariante(variante) {
    const banner = document.getElementById('banner-avisos');
    banner.classList.remove('is-alerta', 'is-campanha', 'is-aviso', 'is-vazio', 'is-erro', 'is-carregando');
    banner.classList.add(variante);
  }

  function renderAvisos() {
    const conteudo = document.getElementById('avisos-conteudo');
    if (!avisosAtivos.length) {
      definirVariante('is-vazio');
      conteudo.replaceChildren(
        el('p', 'banner-titulo', 'Nenhum aviso no momento.'),
        el('p', 'banner-mensagem', 'Campanhas e recados da equipe da unidade aparecem aqui.'),
      );
      return;
    }
    const [principal, ...outros] = avisosAtivos;
    definirVariante(tipoDe(principal).classe);
    conteudo.replaceChildren(renderPrincipal(principal));
    if (outros.length) conteudo.append(renderOutros(outros));
  }

  function renderErro() {
    definirVariante('is-erro');
    document.getElementById('avisos-conteudo').replaceChildren(
      el('p', 'banner-titulo', 'Não foi possível carregar os avisos agora.'),
      el('p', 'banner-mensagem', 'Tente novamente em alguns instantes ou confirme as informações pelo telefone da unidade.'),
    );
  }

  function marcarAtualizacao() {
    const rodape = document.getElementById('avisos-atualizado');
    if (rodape) rodape.textContent = `Atualizado às ${formatoHora.format(new Date())}`;
  }

  function parseCSV(texto) {
    const linhas = [];
    let linha = [];
    let campo = '';
    let entreAspas = false;

    for (let i = 0; i < texto.length; i++) {
      const c = texto[i];
      if (entreAspas) {
        if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
        else if (c === '"') entreAspas = false;
        else campo += c;
      } else if (c === '"') entreAspas = true;
      else if (c === ',') { linha.push(campo); campo = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && texto[i + 1] === '\n') i++;
        linha.push(campo); linhas.push(linha);
        linha = []; campo = '';
      } else campo += c;
    }
    if (campo !== '' || linha.length) { linha.push(campo); linhas.push(linha); }
    return linhas;
  }

  function normalizar(texto) {
    return String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  }

  function parseData(valor) {
    const texto = String(valor || '').trim();
    if (!texto) return null;
    const br = texto.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
    if (br) {
      const [, d, m, a, h = 0, min = 0, s = 0] = br;
      return new Date(+a, +m - 1, +d, +h, +min, +s);
    }
    const soData = texto.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (soData) return new Date(+soData[1], +soData[2] - 1, +soData[3]);
    // new Date("aaaa-mm-dd") usaria UTC e cairia no dia anterior no Brasil
    const iso = new Date(texto);
    return isNaN(iso) ? null : iso;
  }

  const COLUNAS = {
    publicadoEm: ['carimbo de data/hora', 'timestamp', 'data de publicacao'],
    titulo: ['titulo'],
    mensagem: ['mensagem'],
    tipo: ['tipo'],
    validoAte: ['valido ate', 'validade'],
  };

  function linhasParaAvisos(linhas) {
    const [cabecalho = [], ...dados] = linhas;
    const nomes = cabecalho.map(normalizar);
    const indice = {};
    Object.entries(COLUNAS).forEach(([chave, apelidos]) => {
      indice[chave] = nomes.findIndex((n) => apelidos.includes(n));
    });
    if (indice.titulo < 0 || indice.mensagem < 0) {
      throw new Error('Planilha sem as colunas "Título" e "Mensagem".');
    }

    const valor = (linha, chave) => (indice[chave] >= 0 ? (linha[indice[chave]] || '').trim() : '');
    const tipoValido = (t) => Object.keys(TIPOS).find((k) => normalizar(k) === normalizar(t)) || 'Aviso';

    return dados
      .map((linha) => ({
        titulo: valor(linha, 'titulo'),
        mensagem: valor(linha, 'mensagem'),
        tipo: tipoValido(valor(linha, 'tipo')),
        publicadoEm: parseData(valor(linha, 'publicadoEm')) || new Date(0),
        validoAte: parseData(valor(linha, 'validoAte')),
      }))
      .filter((a) => a.titulo && a.mensagem);
  }

  function urlDaPlanilha() {
    return (window.AVISOS_CSV_URL || '').trim();
  }

  async function carregarAvisos() {
    const url = urlDaPlanilha();
    if (!url) return window.AVISOS_EXEMPLO || [];

    const controle = new AbortController();
    const timeout = setTimeout(() => controle.abort(), 10000);
    const urlSemCache = `${url}${url.includes('?') ? '&' : '?'}_nocache=${Date.now()}`;
    try {
      const resposta = await fetch(urlSemCache, { cache: 'no-store', signal: controle.signal });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      return linhasParaAvisos(parseCSV(await resposta.text()));
    } finally {
      clearTimeout(timeout);
    }
  }

  async function atualizar() {
    if (carregando) return;
    carregando = true;
    try {
      const novos = prepararAvisos(await carregarAvisos());
      const assinatura = JSON.stringify(novos);
      // só redesenha se mudou, para o leitor de tela não repetir o anúncio a cada minuto
      if (assinatura !== assinaturaAtual) {
        assinaturaAtual = assinatura;
        avisosAtivos = novos;
        renderAvisos();
      }
      marcarAtualizacao();
    } catch (erro) {
      console.error('Falha ao carregar avisos:', erro);
      if (assinaturaAtual === null) renderErro();
    } finally {
      carregando = false;
      document.getElementById('avisos-conteudo').removeAttribute('aria-busy');
    }
  }

  function iniciar() {
    if (!document.getElementById('banner-avisos')) return;

    definirVariante('is-carregando');
    document.getElementById('avisos-conteudo').setAttribute('aria-busy', 'true');
    atualizar();

    if (!urlDaPlanilha()) return;
    setInterval(() => {
      if (!document.hidden) atualizar();
    }, INTERVALO_ATUALIZACAO);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) atualizar();
    });
  }

  document.addEventListener('DOMContentLoaded', iniciar);
})();
