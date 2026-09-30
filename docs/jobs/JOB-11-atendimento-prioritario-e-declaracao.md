# 🛠️ Issue: JOB-11 — Atendimento prioritário, declaração de acessibilidade e auditoria final
**Tipo:** `Feature`

## 📖 História / Escopo
> Acessibilidade numa UBS não é só o site: é o cidadão saber que **tem direito a atendimento prioritário** e como a unidade o recebe. Este job adiciona:
> - Uma seção sobre prioridade e direitos, com base na lei.
> - A **Declaração de Acessibilidade** do site, recomendada pelo eMAG, com os recursos, atalhos e um canal para relatar barreiras.
> - Uma auditoria final (semântica, leitores de tela, independência de cor).

**Entregável (Definition of Done):**
> A página tem as seções "Atendimento prioritário" e "Acessibilidade deste site", e a auditoria final não encontra problemas de semântica, nome acessível ou contraste.

**Requisitos Técnicos:**
- [ ] **Seção "Atendimento prioritário e inclusão"**, só com direitos garantidos em lei:
  - Prioridade (Lei 10.048/2000 e alterações): idosos a partir de 60 anos (80+ com prioridade especial, Estatuto da Pessoa Idosa), gestantes, lactantes, pessoas com criança de colo, pessoas com deficiência, pessoas com TEA (Lei 12.764/2012), pessoas com mobilidade reduzida, obesos e doadores de sangue.
  - Cão-guia (Lei 11.126/2005).
  - Lei Brasileira de Inclusão (Lei 13.146/2015).
- [ ] A **estrutura física da unidade** (rampa, banheiro adaptado, etc.) fica **comentada no HTML** com `CONFIRMAR NA VISITA`. Nada não verificado aparece na página.
- [ ] **Seção "Acessibilidade deste site"**: recursos disponíveis, tabela de atalhos de teclado, padrões seguidos (WCAG 2.2 AA e eMAG) e canal para relatar dificuldades (telefone da unidade). Link no rodapé e no painel.
- [ ] **Auditoria:**
  - Hierarquia de títulos sem saltos.
  - Landmarks únicos e rotulados.
  - Todo link e botão com nome acessível.
  - Links externos avisam "abre em nova aba".
  - Informação nunca depende só de cor.
  - Zoom de 200% sem perda.
  - `lang` e `title` corretos.
- [ ] Atualizar o README (seção Acessibilidade) e o status dos Jobs.

## 📂 Impactos / Arquivos Alvo
- 📝 `index.html` (Modificação: novas seções e ajustes da auditoria)
- 📝 `css/styles.css` (Modificação: estilos das seções)
- 📝 `README.md` e `docs/jobs/README.md` (Modificação)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** N/A.
- **Environment (ENV):** N/A.
- **Pacotes:** N/A.
- **Side-effects:** Nenhum.
- **Depende de:** JOB-09 e JOB-10.

## ✅ Critérios de Aceite
- [ ] Console sem erros.
- [ ] O script de auditoria no navegador não encontra link ou botão sem nome, título com salto ou imagem sem texto alternativo.
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
