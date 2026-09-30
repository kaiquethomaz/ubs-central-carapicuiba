# 🛠️ Issue: JOB-05 — Redesign visual e novo conteúdo institucional (UBS Vila Real)
**Tipo:** `Refactor`

## 📖 História / Escopo
> Recebemos um briefing visual e de conteúdo ([docs/briefing-visual.md](../briefing-visual.md)) com a identidade azul e verde do SUS, a unidade **UBS Vila Real** e uma nova estrutura de seções: atalhos rápidos, 3 serviços, tabela por setor, documentos, localização em 2 colunas, FAQ e rodapé. Este job refaz a página inteira conforme o briefing, mantendo a base técnica da Fase 1: HTML semântico, Bootstrap e acessibilidade por teclado.
>
> O banner de avisos (JOB-06) e a barra de acessibilidade funcional (JOB-07) entram só como marcação neste job.

**Entregável (Definition of Done):**
> A página exibe as seções 1, 2 e 4 a 10 do briefing com as novas cores, a fonte Inter e o selo "Aberto/Fechado" pelo horário das 07h às 19h, responsiva de 360px a desktop.

**Requisitos Técnicos:**
- [ ] Tokens de cor: azul `#0055A5`, verde `#28A745` e fundo `#F8F9FA`. **Ajuste de acessibilidade:** texto branco sobre `#28A745` tem contraste 3,1:1, abaixo do mínimo AA (4,5:1). Os botões verdes usam `#1E7E34` (5,1:1), e o verde da marca fica nos ícones e checks.
- [ ] Fonte Inter (Google Fonts).
- [ ] Barra superior escura com "Sistema Único de Saúde — SUS" e os botões Alto Contraste e A+ (só marcação; a lógica fica no JOB-07). Navbar branca com a marca "SUS | UBS Vila Real", os links Serviços, Vacinação, Horários, Como Chegar e Dúvidas, e o botão verde "Ver Unidade".
- [ ] A sigla SUS aparece **em texto**. Não usar o logotipo oficial.
- [ ] Hero com gradiente azul-claro, selo dinâmico, H1, subtítulo, botões "Sala de Vacinas" e "Ver Horários", e card à direita com ícone grande e informações rápidas.
- [ ] Atalhos: 4 cards clicáveis (4 colunas no desktop, 2x2 no mobile). Vacinação → linha da Sala de Vacinas, Consultas → Serviços, Farmácia → FAQ da farmácia, Cadastro → Documentos.
- [ ] Serviços (3 cards), tabela de horários zebrada por setor (responsiva, com destaque na linha alvo via `:target`), documentos com checks verdes, localização em 2 colunas mantendo o mapa incorporado (gratuito, sem chave de API), FAQ em accordion do Bootstrap e rodapé.
- [ ] `js/main.js`: horário da recepção de segunda a sexta, das 07:00 às 19:00. Textos do selo: "Unidade Aberta Agora (Atendimento até 19:00)" e "Unidade Fechada no Momento". Remover o destaque de dia da tabela antiga.
- [ ] Remover as seções que não estão no briefing ("Como ser atendido", lista de 12 serviços) e os estilos órfãos.

## 📂 Impactos / Arquivos Alvo
- 📝 `index.html` (Modificação: nova estrutura de seções)
- 📝 `css/styles.css` (Modificação: novos tokens e componentes)
- 📝 `js/main.js` (Modificação: horários e textos do selo)
- 📝 `README.md` (Modificação: nome da unidade e checklist `TROCAR`)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** N/A.
- **Environment (ENV):** N/A.
- **Pacotes:** N/A (CDN).
- **Side-effects:** Os IDs `avisos-grade`, `avisos-filtros` e `avisos-contador` deixam de existir. O `js/avisos.js` precisa ser atualizado no JOB-06, a ser entregue em sequência.
- **Depende de:** JOB-01 a JOB-04.

## ✅ Critérios de Aceite
- [ ] Console sem erros.
- [ ] Sem rolagem horizontal em 360px. Atalhos em 2x2 no mobile e 4 colunas no desktop.
- [ ] Todos os links do menu, atalhos e botões levam à seção correta.
- [ ] Selo verde de segunda a sexta, das 07h às 19h, e vermelho fora disso.
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
