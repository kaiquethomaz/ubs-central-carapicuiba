# 🛠️ Issue: JOB-09 — Central de Acessibilidade (visão, motora e cognitiva)
**Tipo:** `Feature`

## 📖 História / Escopo
> O público de uma UBS inclui idosos, pessoas com baixa visão, daltonismo, dislexia, deficiência motora, baixo letramento e pessoas que usam leitor de tela. A Fase 2 só tinha dois botões (contraste e A+). Este job cria uma **Central de Acessibilidade**: um painel lateral com todos os ajustes, atalhos de teclado no padrão do governo federal (**eMAG**) e alvos de toque adequados. As referências são WCAG 2.2 nível AA e eMAG 3.1.

**Entregável (Definition of Done):**
> O botão "Acessibilidade" da barra superior abre um painel com todos os ajustes. Os atalhos Alt+1/2/3/4 funcionam, e as preferências ficam salvas e podem ser restauradas.

**Requisitos Técnicos:**
- [ ] **Barra superior:** atalhos rápidos Alto Contraste, A-, A+ e o botão "Acessibilidade", que abre um offcanvas do Bootstrap com foco preso, fechamento por Esc e retorno do foco ao botão.
- [ ] **Painel, grupo Visão:**
  - Alto contraste (migrado da Fase 2).
  - Tamanho do texto em 4 níveis (100%, 115%, 130%, 150%), com A-, A+ e "tamanho padrão".
  - Fonte mais legível: Atkinson Hyperlegible, criada para baixa visão, gratuita no Google Fonts.
  - Destacar links (sublinhado e contorno).
  - Cursor ampliado.
- [ ] **Painel, grupo Leitura e compreensão:** espaçamento de texto ampliado (altura de linha 1,8, letras +0,05em, palavras +0,12em, conforme WCAG 1.4.12).
- [ ] **Painel, grupo Movimento:** pausar animações e transições (além de respeitar `prefers-reduced-motion`).
- [ ] Botão "Restaurar configurações padrão".
- [ ] **Persistência:** um único objeto em `localStorage` (`try/catch`, com a página funcionando sem ele), restaurado ao carregar.
- [ ] **Atalhos eMAG:** Alt+1 conteúdo, Alt+2 menu, Alt+3 avisos, Alt+4 rodapé. Links "Ir para…" visíveis ao receber foco no topo da página.
- [ ] **Motora:** alvos de toque de pelo menos 44x44px (botões da barra, filtros, links do menu) e nada que dependa só de hover.

## 📂 Impactos / Arquivos Alvo
- 📝 `index.html` (Modificação: barra superior, skip links, offcanvas)
- 📝 `css/styles.css` (Modificação: classes dos modos e alvos de toque)
- 🆕 `js/acessibilidade.js` (Criação: preferências, painel e atalhos; sai de `main.js`)
- 📝 `js/main.js` (Modificação: remover o código de acessibilidade migrado)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** N/A.
- **Environment (ENV):** N/A.
- **Pacotes:** Fonte Atkinson Hyperlegible via Google Fonts (CDN, gratuita).
- **Side-effects:** As chaves antigas `ubs:alto-contraste` e `ubs:fonte-grande` são migradas para o novo formato. Alt+número pode conflitar com atalhos do navegador em alguns sistemas, mas o eMAG adota o mesmo padrão.
- **Depende de:** JOB-08.

## ✅ Critérios de Aceite
- [ ] Console sem erros.
- [ ] Cada ajuste funciona sozinho e combinado, e persiste após recarregar.
- [ ] Sem rolagem horizontal em 360px com texto 150% + espaçamento + fonte legível.
- [ ] Painel operável só pelo teclado (abre, navega, Esc fecha, o foco volta).
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
