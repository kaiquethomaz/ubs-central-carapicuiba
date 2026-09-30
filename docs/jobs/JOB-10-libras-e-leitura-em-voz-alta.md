# 🛠️ Issue: JOB-10 — Libras (VLibras) e leitura em voz alta
**Tipo:** `Feature`

## 📖 História / Escopo
> Duas barreiras que ajustes visuais não resolvem:
> - **Pessoas surdas** que têm a Libras como primeira língua e nem sempre leem português com fluência.
> - **Pessoas cegas, com baixa visão ou baixo letramento**, que precisam *ouvir* o conteúdo.
>
> Este job integra o **VLibras**, tradutor oficial e gratuito do governo federal (Ministério da Gestão e da Inovação, UFPB), e a **leitura em voz alta** pela Web Speech API do próprio navegador. Nenhum dos dois tem custo, chave ou cadastro.

**Entregável (Definition of Done):**
> O avatar do VLibras traduz qualquer texto da página para Libras, e o botão "Ouvir a página" lê o conteúdo em português. Há também um botão "Ouvir aviso" no banner.

**Requisitos Técnicos:**
- [ ] **VLibras:** snippet oficial (`vlibras.gov.br/app/vlibras-plugin.js`) carregado de forma assíncrona. Se o script falhar, a página segue funcionando, sem erro fatal.
- [ ] **Leitura em voz alta** com `speechSynthesis`:
  - Voz `pt-BR` quando disponível.
  - Lê as seções do `<main>` em blocos (contorna o corte de ~15s do Chrome).
  - Destaca visualmente o bloco que está sendo lido e rola até ele.
  - Controles Ouvir, Pausar/Continuar e Parar, com velocidade normal ou lenta.
- [ ] Botão "Ouvir aviso" no banner (lê o aviso principal).
- [ ] Controles no painel de acessibilidade (JOB-09) e atalho visível na barra superior.
- [ ] Detecção de suporte: sem `speechSynthesis`, os botões ficam ocultos e o painel informa.
- [ ] A leitura para ao sair da página.

## 📂 Impactos / Arquivos Alvo
- 📝 `index.html` (Modificação: widget VLibras e controles de leitura)
- 🆕 `js/leitura.js` (Criação: leitura em voz alta)
- 📝 `js/avisos.js` (Modificação: botão "Ouvir aviso")
- 📝 `css/styles.css` (Modificação: destaque do bloco em leitura)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** N/A.
- **Environment (ENV):** N/A.
- **Pacotes:** Script externo do VLibras (gov.br, gratuito).
- **Side-effects:** O VLibras carrega cerca de 1 MB sob demanda e só funciona com internet. A qualidade da voz depende do sistema: Windows, Android e iOS têm voz pt-BR nativa.
- **Depende de:** JOB-09 (painel).

## ✅ Critérios de Aceite
- [ ] Console sem erros próprios do site.
- [ ] O botão do VLibras aparece e abre o avatar.
- [ ] "Ouvir a página" lê em sequência, destaca o bloco atual, e pausar/parar funcionam.
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
