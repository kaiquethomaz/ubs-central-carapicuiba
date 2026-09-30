# Planejamento técnico — Landing Page da UBS

> Projeto: **Tecnologia da Informação Aplicada à Comunidade** — Atividade de Extensão II (ADS · UNIP · 2026/2)
> Etapa 2 do guia: *Analisar a necessidade e planejar a solução.*
> Método: discovery → diagnóstico → fatiamento em Jobs (`.cursor/rules/generate-jobs.mdc`), implementação de 1 Job por vez (`.cursor/rules/software-engineer.mdc`).

## 🔎 Diagnóstico

- **Causa / Gap:** A maioria das UBS municipais não tem canal próprio na internet. As informações básicas (serviços, horários, documentos, como agendar) e os avisos do dia a dia (campanhas de vacinação, mutirões, mudança de horário, falta de profissional) circulam no boca a boca, em cartazes na recepção ou em grupos de WhatsApp. A população chega à unidade sem saber o que levar ou perde campanhas. Solução: uma landing page responsiva, acessível e gratuita, com uma seção de **Campanhas e Avisos** que a própria equipe da UBS atualiza sem saber programar, preenchendo um Google Forms.
- **Evidências:** Repositório novo (só existe `.cursor/rules/`). Não há código legado, então todos os arquivos serão criados. A UBS específica ainda não foi escolhida, por isso o conteúdo institucional usa **dados de exemplo** marcados para substituição.

### Decisões de arquitetura

| Decisão | Escolha | Motivo |
|---|---|---|
| Front-end | HTML5 + CSS3 + JavaScript puro + Bootstrap 5 (CDN) | Compatível com o 2º semestre, sem etapa de build, fácil de manter |
| Fonte dos avisos | Google Forms → Google Sheets (publicado em CSV) → site | Custo zero, sem servidor, operável por pessoa leiga (inclusive pelo celular) |
| Hospedagem | Netlify (plano gratuito) | Link público real para a apresentação, deploy arrastando a pasta |
| Back-end | **Fora do escopo** | Evita custo, manutenção e riscos de segurança; fica para uma v2 de portfólio |
| Dados sensíveis | Nenhum | O site só exibe informação pública de divulgação, sem dados de pacientes |

### Estrutura de pastas prevista

```
/
├── index.html
├── css/styles.css
├── js/
│   ├── main.js            # comportamentos gerais (menu, status "aberto agora", ano)
│   ├── config.js          # URL da planilha publicada (único ponto de configuração)
│   ├── avisos-exemplo.js  # avisos de demonstração (modo offline/sem planilha)
│   └── avisos.js          # leitura, filtro e renderização dos avisos
├── assets/favicon.svg
├── docs/
│   ├── jobs/              # este planejamento
│   └── guia-painel-avisos.md
├── netlify.toml
└── README.md
```

## 📋 Ordem de Execução

1. **[JOB-01](JOB-01-estrutura-e-conteudo-institucional.md): estrutura base e conteúdo institucional.** Entrega a página navegável e responsiva com todas as informações fixas da UBS. É a base dos demais.
2. **[JOB-02](JOB-02-secao-campanhas-e-avisos.md): seção de Campanhas e Avisos com dados de exemplo.** Entrega o componente de avisos (cards, filtro por validade, destaque de alertas) funcionando offline. Depende do JOB-01.
3. **[JOB-03](JOB-03-integracao-google-forms-sheets.md): integração com Google Forms/Sheets.** Liga os avisos à planilha real e inclui o guia para a equipe. Depende do contrato de dados do JOB-02.
4. **[JOB-04](JOB-04-publicacao-seo-e-documentacao.md): publicação, SEO e documentação final.** Prepara o deploy no Netlify, metadados de compartilhamento, favicon e README. Depende dos anteriores.

## Fase 2: redesign conforme o briefing visual

### 🔎 Diagnóstico
- **Causa / Gap:** Recebemos um [briefing visual e de conteúdo](../briefing-visual.md) com a identidade azul e verde, a unidade "UBS Vila Real", uma nova arquitetura de seções (atalhos, FAQ, tabela por setor), um banner de avisos em tempo real no lugar do mural de cards e controles de acessibilidade (alto contraste e A+). A base técnica da Fase 1 (Bootstrap, pipeline Forms → Sheets, parser CSV) continua valendo. Muda a camada de apresentação.
- **Evidências:** `index.html` (todas as seções), `css/styles.css` (tokens `--c-*`), `js/main.js` (`HORARIOS`, `atualizarStatus`, `destacarDiaAtual`), `js/avisos.js` (`renderLista`, `configurarFiltros`, `atualizarContador` dependem de `#avisos-grade`, `.avisos-filtros` e `#avisos-contador`).

### 📋 Ordem de Execução
5. **[JOB-05](JOB-05-redesign-visual-e-conteudo.md): redesign visual e conteúdo.** Nova identidade e seções do briefing. Base dos seguintes.
6. **[JOB-06](JOB-06-banner-avisos-tempo-real.md): banner de avisos em tempo real.** Troca o mural pelo banner com atualização automática. Depende da marcação do JOB-05.
7. **[JOB-07](JOB-07-alto-contraste-e-fonte.md): alto contraste e aumento de fonte.** Liga os botões da barra superior. Depende da marcação do JOB-05.

## Fase 3: UBS real e acessibilidade completa

### 🔎 Diagnóstico
- **Causa / Gap:** A instituição foi definida: **UBS Central, Vila Gustavo Correia, Carapicuíba/SP, (11) 4188-5930**. O público de uma UBS exige acessibilidade além de contraste e tamanho de fonte: Libras para pessoas surdas, leitura em voz alta para cegos e pessoas com baixo letramento, ajustes para dislexia, deficiência motora e daltonismo, informação sobre atendimento prioritário e uma declaração de acessibilidade, como recomenda o eMAG.
- **Evidências:** dados fictícios em `index.html` (marcados `TROCAR`). Acessibilidade limitada a `alternarAltoContraste` e `alternarFonte` em `js/main.js`. A barra superior só tem 2 botões, com alvos de toque abaixo de 44px.

### 📋 Ordem de Execução
8. **[JOB-08](JOB-08-dados-reais-ubs-central.md): dados reais da UBS Central.** A página passa a ser da unidade atendida.
9. **[JOB-09](JOB-09-central-de-acessibilidade.md): Central de Acessibilidade.** Painel com ajustes visuais, motores e cognitivos, e atalhos eMAG.
10. **[JOB-10](JOB-10-libras-e-leitura-em-voz-alta.md): Libras e leitura em voz alta.** VLibras e Web Speech API. Depende do painel do JOB-09.
11. **[JOB-11](JOB-11-atendimento-prioritario-e-declaracao.md): atendimento prioritário, declaração e auditoria.** Fecha a fase. Depende dos anteriores.

## ✅ Status da implementação

| Job | Status | Validação realizada |
|---|---|---|
| JOB-01 | Concluído | Página renderizada sem erros no console. Sem rolagem horizontal em 360px. Menu mobile fecha e rola até a seção. Selo "Aberto agora" e destaque "Hoje" corretos |
| JOB-02 | Concluído | Aviso vencido oculto, alerta no topo, filtros com `aria-pressed`, "Ler mais" expande e recolhe, contador no hero |
| JOB-03 | Concluído | Parser testado com colunas fora de ordem, aspas, vírgula e quebra de linha, tipo desconhecido e linha sem título. CSV real carregado no navegador. HTML malicioso exibido como texto. URL inválida mostra estado de erro sem afetar o resto da página |
| JOB-04 | Concluído (falta o deploy) | Meta tags, favicon, `netlify.toml` e README criados. Navegação por teclado com foco visível. O deploy no Netlify depende da conta do aluno |
| JOB-05 | Concluído | Nenhum link, atalho ou botão aponta para âncora inexistente. Atalhos em 4 colunas no desktop e 2x2 no mobile, sem rolagem horizontal em 360px. Atalho "Farmácia" abre o item do FAQ. Selo validado nos limites (seg 06:59 fechado, 07:00 aberto, sex 18:59 aberto, 19:00 fechado, sábado fechado) |
| JOB-06 | Concluído | Banner com o exemplo do briefing e "Ver mais N avisos". Planilha simulada: requisição com `_nocache`. Novo alerta apareceu sem recarregar, tanto pelo intervalo de 60s quanto ao voltar à aba. Falha após carga mantém os avisos na tela. Atualização pausa com a aba oculta |
| JOB-07 | Concluído | Alto contraste (preto, branco e amarelo) aplicado em botões, tabela, banner e FAQ. Fonte +20% sem rolagem horizontal (o menu passou a recolher abaixo de 1200px para caber com fonte grande). Preferências persistem após recarregar e desligam corretamente |
| JOB-08 | Concluído | Nenhuma ocorrência de dados fictícios. Telefone (11) 4188-5930 nos 3 pontos, endereço e mapa da Av. Consolação, 505 (marcado para confirmar na visita). Horário de 7h às 19h confirmado pela prefeitura |
| JOB-09 | Concluído | 6 ajustes mais 4 níveis de fonte, testados sozinhos e combinados. Persistem após recarregar, e "Restaurar" volta ao padrão. Sem rolagem horizontal em 360px com tudo ligado a 150%. Alt+1/2/3/4 levam ao destino. Painel operável só por teclado (Tab, Espaço, Esc devolve o foco). Botões da barra com pelo menos 44x44px |
| JOB-10 | Concluído | VLibras 7.12 carregado (botão oficial injetado; o atalho do painel chama `VLibrasWidget.open()`). A leitura usa a voz "Microsoft Maria/Daniel pt-BR", avança bloco a bloco com destaque na ordem da página, e pausar, continuar e parar funcionam. "Ouvir aviso" lê o banner |
| JOB-11 | Concluído | Seções de atendimento prioritário e declaração de acessibilidade. Auditoria: 0 elementos sem nome acessível, 0 saltos de título, 0 IDs duplicados, 0 links quebrados, link externo avisa "nova aba". Contraste AA em 163 textos (normal) e 166 (alto contraste). Zoom 200% sem rolagem horizontal |
