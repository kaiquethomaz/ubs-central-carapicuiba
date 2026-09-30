# 🛠️ Issue: JOB-02 — Seção de Campanhas e Avisos (com dados de exemplo)
**Tipo:** `Feature`

## 📖 História / Escopo
> É o diferencial da solução: um mural digital em que a população vê campanhas de vacinação, mutirões, mudanças de horário e alertas do dia. Este job constrói o componente completo (modelo de dados, regras de exibição e interface) usando uma lista de avisos de exemplo. Assim a página já é demonstrável sem nenhuma conta Google.
>
> O **contrato de dados** definido aqui (campos de um aviso) é o que o JOB-03 vai preencher a partir da planilha.

**Entregável (Definition of Done):**
> A seção "Campanhas e Avisos" lista os avisos de exemplo em cards: só os válidos, com alertas primeiro e o restante do mais recente para o mais antigo. Há filtros por tipo e estados de carregamento, lista vazia e erro.

**Requisitos Técnicos:**
- [ ] Contrato de dados de um aviso: `{ titulo: string, mensagem: string, tipo: "Alerta" | "Campanha" | "Aviso", publicadoEm: Date, validoAte: Date | null }`.
- [ ] `js/avisos-exemplo.js` com 5 a 6 avisos realistas. As datas são relativas a "hoje" para a demonstração nunca ficar desatualizada, e há pelo menos um aviso vencido para provar o filtro.
- [ ] Regras: esconder avisos com `validoAte` anterior a hoje (o aviso vale até o fim do dia informado). Ordenar com `Alerta` primeiro e depois por `publicadoEm` decrescente.
- [ ] Cards com cor e ícone por tipo, data de publicação e texto "Válido até dd/mm". Mensagens longas são truncadas com botão "Ler mais".
- [ ] Filtros por tipo (Todos / Alertas / Campanhas / Avisos) com botões acessíveis (`aria-pressed`).
- [ ] Estados de interface: carregando (skeleton), vazio ("Nenhum aviso no momento") e erro (mensagem amigável).
- [ ] **Segurança:** todo texto vindo dos dados entra no DOM via `textContent`, nunca `innerHTML`, porque no JOB-03 o conteúdo virá de um formulário.
- [ ] Contador de avisos ativos no botão "Ver avisos" do hero.

## 📂 Impactos / Arquivos Alvo
- 📝 `index.html` (Modificação: marcação da seção de avisos e inclusão dos scripts)
- 📝 `css/styles.css` (Modificação: estilos dos cards, filtros e skeleton)
- 🆕 `js/avisos-exemplo.js` (Criação)
- 🆕 `js/avisos.js` (Criação: regras e renderização)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** N/A.
- **Environment (ENV):** N/A.
- **Pacotes:** N/A.
- **Side-effects:** Nenhum. A seção é isolada.
- **Depende de:** JOB-01.

## ✅ Critérios de Aceite
- [ ] Console sem erros.
- [ ] O aviso de exemplo vencido **não** aparece e os alertas aparecem no topo.
- [ ] Os filtros alteram a lista, e "Todos" restaura a lista completa.
- [ ] Um aviso com HTML no texto (ex.: `<b>teste</b>`) é exibido como texto literal.
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
