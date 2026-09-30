# Landing Page da UBS Central (Carapicuíba/SP), com banner de avisos em tempo real

🔗 **Site no ar:** https://ubscentralcarapicuiba.netlify.app

Projeto da **Atividade de Extensão II**: *Tecnologia da Informação Aplicada à Comunidade: Desenvolvimento de Soluções Computacionais para Organizações Sociais*. Curso de Análise e Desenvolvimento de Sistemas, UNIP, 2026/2.

## O problema

Muitas Unidades Básicas de Saúde não têm um canal próprio na internet. Informações simples, como os serviços oferecidos, o horário, os documentos necessários e as campanhas de vacinação, chegam à população por cartazes na recepção ou pelo boca a boca.

## A solução

Uma página única, responsiva e acessível, com:

- **Informações da unidade:** atalhos rápidos, serviços, tabela de horários por setor (com selo "Unidade Aberta Agora"), documentos, localização e contatos, mapa e perguntas frequentes.
- **Banner de avisos em tempo real:** atualizado pela própria equipe da UBS **por meio de um Google Forms**, sem precisar programar. A página confere a planilha sozinha a cada minuto, os avisos vencidos saem do ar automaticamente e os alertas urgentes têm prioridade.
- **Acessibilidade completa:** Central de Acessibilidade (contraste, tamanho do texto, fonte legível, espaçamento, destaque de links, cursor ampliado, pausar animações), leitura em voz alta, tradução para Libras (VLibras), atalhos de teclado no padrão eMAG e informações de atendimento prioritário.

O visual segue o [briefing visual e de conteúdo](docs/briefing-visual.md).

O site não coleta nenhum dado de paciente. Ele só exibe informação pública.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | HTML5, CSS3, JavaScript (sem frameworks) |
| Layout responsivo | Bootstrap 5.3 e Bootstrap Icons (via CDN) |
| Tipografia | Inter (Google Fonts) |
| Fonte dos avisos | Google Forms → Google Sheets publicado em CSV |
| Hospedagem | Netlify (plano gratuito) |

Não há back-end, banco de dados nem etapa de build: são só arquivos estáticos.

## Estrutura

```
├── index.html                 Página única
├── css/styles.css             Identidade visual (cores em variáveis no topo)
├── js/
│   ├── config.js              ⚙️ Link da planilha de avisos (único ponto de configuração)
│   ├── main.js                Selo aberto/fechado, menu e FAQ
│   ├── acessibilidade.js      Central de Acessibilidade e atalhos de teclado (eMAG)
│   ├── leitura.js             Leitura em voz alta (Web Speech API)
│   ├── libras.js              Atalho do painel para o VLibras
│   ├── avisos.js              Leitura da planilha, atualização automática e banner
│   └── avisos-exemplo.js      Avisos de demonstração (usados sem planilha)
├── assets/favicon.svg
├── netlify.toml               Cabeçalhos de segurança e cache
└── docs/
    ├── jobs/                  Planejamento técnico (Jobs 01 a 11)
    ├── briefing-visual.md     Briefing de design e conteúdo (Fase 2)
    └── guia-painel-avisos.md  Passo a passo para a equipe da UBS
```

## Como rodar localmente

É preciso ter Python (ou qualquer servidor estático) instalado. Na pasta do projeto:

```bash
python -m http.server 5500
```

Depois, acesse <http://localhost:5500>.

> Abrir o `index.html` com duplo clique também funciona no modo demonstração. Para ler a planilha real, use um servidor como o do comando acima.

## Como publicar no Netlify

1. Crie uma conta gratuita em <https://app.netlify.com>.
2. Vá em **Add new site → Deploy manually** e **arraste a pasta do projeto** para a área indicada.
3. Em **Site configuration → Change site name**, escolha um endereço, como `ubscentralcarapicuiba.netlify.app`.
4. Para atualizar, basta arrastar a pasta de novo em **Deploys**.

Alternativa: suba o projeto no GitHub e conecte o repositório no Netlify (**Import from Git**). Assim, cada `git push` publica automaticamente.

## Ligar o banner à planilha da UBS

Siga o guia [docs/guia-painel-avisos.md](docs/guia-painel-avisos.md). Resumo:

1. Crie o Google Forms com as perguntas **Título**, **Mensagem**, **Tipo** (Alerta/Campanha/Aviso) e **Válido até**.
2. Vincule o formulário a uma planilha e publique a planilha em **CSV** (Arquivo → Compartilhar → Publicar na Web).
3. Cole o link em `js/config.js` e publique o site novamente.

Enquanto `AVISOS_CSV_URL` estiver vazio, o site mostra **avisos de exemplo**, o que é útil para demonstrações.

## 🏥 Unidade atendida

**UBS Central**, Vila Gustavo Correia, Carapicuíba/SP. Telefone (11) 4188-5930.

| Informação | Situação | Fonte |
|---|---|---|
| Nome, bairro e telefone | ✅ Informado pela equipe do projeto | Contato com a unidade |
| Funcionamento das 7h às 19h | ✅ Confirmado | Prefeitura de Carapicuíba (ampliação de horário de todas as UBS/USF) |
| Endereço Av. Consolação, 505 | ⚠️ Confirmar na visita | Busca na web (página oficial fora do ar em 30/09/2026) |

## ✅ Checklist: confirmar na visita à UBS

Os pontos estão marcados com `CONFIRMAR NA VISITA` no código. **Nada disso deve ir para o link público sem confirmação**, porque informação de saúde errada prejudica o cidadão.

- [ ] Endereço, número e CEP (card do topo, Localização e rodapé)
- [ ] Horários por setor: sala de vacinas, coleta e farmácia (tabela em `index.html`)
- [ ] Serviços oferecidos e respostas do FAQ
- [ ] Linhas de ônibus que atendem a unidade
- [ ] Estrutura física de acessibilidade (bloco comentado na seção "Atendimento prioritário")
- [ ] Horário do atendimento telefônico
- [ ] Autorização para usar o nome da unidade e publicar o link
- [ ] Link da planilha em `js/config.js`

> A sigla "SUS" aparece só em texto. Não use o logotipo oficial do SUS ou da prefeitura sem autorização por escrito.

## Acessibilidade

O público de uma UBS inclui idosos, pessoas com deficiência visual, auditiva, motora e cognitiva, e pessoas com baixo letramento. O site segue a **WCAG 2.2 nível AA** e o **eMAG** (Modelo de Acessibilidade em Governo Eletrônico).

| Público | Recursos |
|---|---|
| Baixa visão | Alto contraste, texto de 100% a 150%, fonte Atkinson Hyperlegible, cursor ampliado, destaque de links, zoom de 200% sem quebra |
| Cegueira | Estrutura semântica, rótulos ARIA, landmarks, leitura em voz alta, compatível com NVDA, TalkBack e VoiceOver |
| Surdez | Tradução para Libras com o VLibras (Governo Federal) |
| Deficiência motora | Navegação 100% por teclado, atalhos Alt+1 a Alt+4, alvos de toque de 44x44px, foco sempre visível |
| Dislexia, TDAH e baixo letramento | Espaçamento de texto (WCAG 1.4.12), fonte legível, ouvir a página ou o aviso, pausar animações |
| Daltonismo | Nenhuma informação depende só de cor: o selo aberto/fechado e os tipos de aviso sempre têm texto |

Também há a seção **Atendimento prioritário e inclusão** (direitos previstos em lei) e a **Declaração de acessibilidade**, com os atalhos e um canal para relatar dificuldades.

**Verificações feitas** (script de auditoria no navegador):
- 0 links ou botões sem nome acessível, 0 saltos na hierarquia de títulos, 0 IDs duplicados, 0 links quebrados.
- Contraste AA em 100% dos textos, no modo normal e no alto contraste.
- Sem rolagem horizontal em 360px com todos os ajustes ligados e o texto a 150%.

> O verde da marca `#28A745` tem só 3,1:1 com texto branco, então os botões verdes usam `#1E7E34` (5,1:1).

## Segurança

- Textos vindos do formulário entram na página como **texto puro** (`textContent`), o que impede a injeção de HTML ou scripts.
- O `netlify.toml` define cabeçalhos de segurança (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Não há login, senha nem dados pessoais armazenados.
