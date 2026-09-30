# 🛠️ Issue: JOB-03 — Integração dos avisos com Google Forms e Google Sheets
**Tipo:** `Feature`

## 📖 História / Escopo
> A equipe da UBS precisa publicar avisos sozinha, sem acesso a código. O fluxo escolhido: a recepcionista preenche um **Google Forms**, as respostas caem numa **planilha**, a planilha é publicada na web em CSV e o site lê esse CSV a cada acesso. Não há servidor, custo nem senha para gerenciar.
>
> Este job troca a fonte dos avisos (exemplo → planilha) sem alterar a interface do JOB-02 e entrega um guia passo a passo para a equipe configurar e operar o formulário.

**Entregável (Definition of Done):**
> Com a URL do CSV em `js/config.js`, um aviso enviado pelo Google Forms aparece na página ao recarregar. Sem URL configurada, a página continua exibindo os avisos de exemplo.

**Requisitos Técnicos:**
- [ ] `js/config.js` com `AVISOS_CSV_URL` como único ponto de configuração. Vazio significa modo demonstração.
- [ ] Parser de CSV que respeite aspas, vírgulas e quebras de linha dentro do texto, porque mensagens do Forms podem ter parágrafos.
- [ ] Mapeamento de colunas **pelo nome do cabeçalho**, ignorando maiúsculas e acentos: `Carimbo de data/hora` → `publicadoEm`, `Título` → `titulo`, `Mensagem` → `mensagem`, `Tipo` → `tipo`, `Válido até` → `validoAte`. A ordem das colunas pode mudar sem quebrar nada.
- [ ] Datas em formato brasileiro (`dd/mm/aaaa` e `dd/mm/aaaa hh:mm:ss`) e ISO. Linhas sem título ou mensagem são descartadas, e um tipo desconhecido vira `Aviso`.
- [ ] Requisição com `cache: "no-store"` e timeout de 10s. Em falha, mostrar o estado de erro do JOB-02.
- [ ] `docs/guia-painel-avisos.md`: como criar o formulário (campos e opções), vincular à planilha, publicar em CSV, colar a URL no `config.js`, e como editar ou remover um aviso.

## 📂 Impactos / Arquivos Alvo
- 🆕 `js/config.js` (Criação)
- 📝 `js/avisos.js` (Modificação: carregar da planilha, com parser e mapeamento)
- 📝 `index.html` (Modificação: incluir `config.js`)
- 🆕 `docs/guia-painel-avisos.md` (Criação)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** A planilha do Google Sheets funciona como "banco". Não há migração, mas os nomes das perguntas do Forms precisam seguir o guia.
- **Environment (ENV):** `AVISOS_CSV_URL` em `js/config.js`. É pública por natureza e não é segredo.
- **Pacotes:** N/A.
- **Side-effects:** O Google leva de 1 a 5 minutos para atualizar o CSV publicado. Na apresentação, publicar o aviso com alguns minutos de antecedência ou explicar o atraso.
- **Depende de:** JOB-02 (contrato de dados).

## ✅ Critérios de Aceite
- [ ] Console sem erros nos dois modos (exemplo e planilha).
- [ ] O parser lida com campo entre aspas contendo vírgula e quebra de linha.
- [ ] Trocar a ordem das colunas da planilha não quebra a leitura.
- [ ] Uma URL inválida mostra o estado de erro sem travar o resto da página.
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
