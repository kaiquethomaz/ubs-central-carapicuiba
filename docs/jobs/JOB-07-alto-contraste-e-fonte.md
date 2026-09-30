# 🛠️ Issue: JOB-07 — Alto contraste e aumento de fonte
**Tipo:** `Feature`

## 📖 História / Escopo
> Boa parte do público da UBS é formada por idosos e pessoas com baixa visão. O briefing pede dois botões na barra superior: **Alto Contraste** (fundo preto, texto branco e amarelo) e **A+** (aumentar fonte), seguindo o padrão dos sites do governo. Isso reforça o argumento de acessibilidade no relatório da extensão.

**Entregável (Definition of Done):**
> Os botões da barra superior ligam e desligam o alto contraste e a fonte ampliada em toda a página, e a escolha fica salva para a próxima visita.

**Requisitos Técnicos:**
- [ ] Duas funções em `js/main.js`, `alternarAltoContraste()` e `alternarFonte()`, que alternam as classes `alto-contraste` e `fonte-grande` no `body`.
- [ ] O estado vai para `aria-pressed` nos botões e é salvo em `localStorage` (leitura e escrita com `try/catch`; a página funciona sem ele) e restaurado ao carregar.
- [ ] Alto contraste feito **redefinindo os tokens de cor** (fundo preto, texto branco, destaques e links amarelos, bordas brancas), cobrindo navbar, cards, tabela, banner, accordion, botões e rodapé.
- [ ] Fonte ampliada escalando o tamanho raiz (`rem`) em cerca de 20%, sem quebrar o layout mobile.

## 📂 Impactos / Arquivos Alvo
- 📝 `js/main.js` (Modificação: funções de acessibilidade)
- 📝 `css/styles.css` (Modificação: temas `.alto-contraste` e `.fonte-grande`)
- 📝 `README.md` (Modificação: seção de acessibilidade)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** N/A.
- **Environment (ENV):** N/A.
- **Pacotes:** N/A.
- **Side-effects:** O mapa incorporado (iframe do Google) não segue o alto contraste, o que é uma limitação de conteúdo de terceiros.
- **Depende de:** JOB-05 (marcação dos botões).

## ✅ Critérios de Aceite
- [ ] Console sem erros.
- [ ] Os dois modos funcionam juntos e separados, e persistem após recarregar.
- [ ] Sem rolagem horizontal em 360px com a fonte ampliada.
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
