# 🛠️ Issue: JOB-04 — Publicação no Netlify, SEO e documentação final
**Tipo:** `Chore`

## 📖 História / Escopo
> Para a apresentação (Etapa 4) e para a população de fato encontrar a página, ela precisa estar publicada num link público, ter boa pré-visualização quando compartilhada no WhatsApp e ser documentada para quem for mantê-la. Este job fecha a entrega técnica.

**Entregável (Definition of Done):**
> O projeto está pronto para deploy no Netlify arrastando a pasta, mostra título, descrição e ícone corretos ao ser compartilhado, e tem um README que explica o projeto, a estrutura, como rodar, publicar e trocar os dados de exemplo.

**Requisitos Técnicos:**
- [ ] Meta tags: `description`, `theme-color`, Open Graph (`og:title`, `og:description`, `og:type`, `og:locale`) e `canonical` comentado para quando houver link final.
- [ ] `assets/favicon.svg` próprio. Não usar logotipos oficiais do SUS ou da prefeitura sem autorização.
- [ ] `netlify.toml` com cabeçalhos de segurança básicos (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) e cache curto para HTML e JS.
- [ ] `README.md`: contexto do projeto de extensão, tecnologias, estrutura de pastas, como testar localmente, como publicar no Netlify, checklist "trocar dados de exemplo" e link para o guia do painel de avisos.
- [ ] Revisão final: navegação por teclado, contraste, links quebrados, console limpo e teste em largura mobile.

## 📂 Impactos / Arquivos Alvo
- 📝 `index.html` (Modificação: meta tags e favicon)
- 🆕 `assets/favicon.svg` (Criação)
- 🆕 `netlify.toml` (Criação)
- 🆕 `README.md` (Criação)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** N/A.
- **Environment (ENV):** N/A.
- **Pacotes:** N/A. O deploy é pelo painel do Netlify, sem CLI obrigatória.
- **Side-effects:** Os cabeçalhos do `netlify.toml` valem só no Netlify. Localmente nada muda.
- **Depende de:** JOB-01, JOB-02 e JOB-03.

## ✅ Critérios de Aceite
- [ ] Console sem erros.
- [ ] A página é totalmente navegável só com teclado (Tab/Enter) e o foco é sempre visível.
- [ ] O README permite a um terceiro publicar o site sem ajuda.
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
