# 🛠️ Issue: JOB-06 — Banner de avisos em tempo real
**Tipo:** `Feature`

## 📖 História / Escopo
> O briefing troca o mural de cards por um **banner amarelo de destaque**, logo abaixo do hero, que se atualiza sozinho sem F5. É o canal da equipe da UBS com a população. Este job adapta a camada de interface do `js/avisos.js` e mantém a camada de dados da Fase 1, já testada: Google Forms → Sheets publicado → parser, validade e ordenação.
>
> **Decisão técnica:** o briefing cita "JSON/GViz", mas mantemos a planilha **publicada em CSV**. As duas opções são gratuitas e sem chave, mas o CSV já está implementado, testado e documentado no guia da equipe, e o GViz exigiria compartilhar a planilha inteira por link e interpretar datas no formato `Date(2026,8,30)`. O requisito real do briefing, atualizar sem F5 usando `&_nocache=`, é atendido.

**Entregável (Definition of Done):**
> O banner mostra o aviso prioritário (alertas primeiro, depois o mais recente), permite expandir os demais e se atualiza sozinho a cada 60 segundos quando conectado à planilha.

**Requisitos Técnicos:**
- [ ] Banner amarelo/laranja com ícone de megafone, rótulo por tipo ("Alerta", "Campanha ativa", "Aviso"), título, descrição e validade.
- [ ] Com mais de um aviso ativo, um botão "Ver mais N avisos" (`aria-expanded`) mostra a lista compacta dos demais.
- [ ] Estados: carregando (skeleton), sem avisos (mensagem neutra) e erro (mensagem amigável, sem quebrar a página).
- [ ] Atualização automática: `fetch` com `&_nocache=<timestamp>` a cada 60s, **só com a aba visível**, e recarga imediata ao voltar para a aba (`visibilitychange`). No modo demonstração (sem URL) não há polling.
- [ ] Se uma atualização falhar e já houver avisos na tela, eles continuam visíveis (sem piscar para o estado de erro).
- [ ] Texto "Atualizado às HH:MM" e região `aria-live="polite"`.
- [ ] Continuar usando só `textContent` para os dados da planilha.
- [ ] Remover o código do mural antigo (filtros, grade, contador) e os estilos órfãos.
- [ ] Ajustar `docs/guia-painel-avisos.md` (o aviso aparece no banner e se atualiza sozinho).

## 📂 Impactos / Arquivos Alvo
- 📝 `js/avisos.js` (Modificação: renderização do banner e polling; parser mantido)
- 📝 `js/avisos-exemplo.js` (Modificação: aviso de exemplo do briefing)
- 📝 `index.html` (Modificação: marcação do banner)
- 📝 `css/styles.css` (Modificação: estilos do banner)
- 📝 `docs/guia-painel-avisos.md` (Modificação)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** A planilha continua igual (mesmas colunas do Forms).
- **Environment (ENV):** `AVISOS_CSV_URL` em `js/config.js`, sem mudança.
- **Pacotes:** N/A.
- **Side-effects:** O Google leva de 1 a 5 minutos para atualizar o CSV publicado. O `_nocache` evita o cache do navegador, não o do Google.
- **Depende de:** JOB-05.

## ✅ Critérios de Aceite
- [ ] Console sem erros.
- [ ] Com a planilha conectada, um aviso novo aparece sem recarregar a página.
- [ ] O aviso vencido não aparece e o alerta tem prioridade no banner.
- [ ] Conteúdo HTML vindo da planilha é exibido como texto.
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
