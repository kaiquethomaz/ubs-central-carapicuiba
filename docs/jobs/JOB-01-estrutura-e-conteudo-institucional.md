# 🛠️ Issue: JOB-01 — Estrutura base e conteúdo institucional da landing page
**Tipo:** `Feature`

## 📖 História / Escopo
> O cidadão precisa encontrar rapidamente, pelo celular, o que a UBS oferece, quando está aberta, o que levar e como chegar. Este job cria a página única com identidade visual própria, navegação fixa e todas as seções institucionais. A seção de avisos entra só como área reservada, preenchida no JOB-02.
>
> Como a UBS ainda não foi definida, todo o conteúdo usa **dados de exemplo** (nome, endereço, telefone e horários), marcados com comentários `<!-- TROCAR -->` para facilitar a substituição depois da primeira visita.

**Entregável (Definition of Done):**
> Abrir `index.html` exibe uma landing page completa, responsiva de 360px a desktop, com as seções Início, Avisos (reservada), Serviços, Horários, Como ser atendido e Contato/Localização.

**Requisitos Técnicos:**
- [ ] `index.html` semântico (`header`, `nav`, `main`, `section`, `footer`) com Bootstrap 5.3 e Bootstrap Icons via CDN jsDelivr, e fonte do Google Fonts.
- [ ] Navbar fixa com âncoras para cada seção e menu recolhível no mobile, que fecha ao clicar num link.
- [ ] **Hero** com nome da unidade, frase de apoio, endereço resumido, selo "Aberto agora / Fechado" e botões "Ver avisos" e "Como chegar".
- [ ] **Serviços**: grade de cards com ícone, título e descrição curta (consultas, vacinação, enfermagem, saúde bucal, pré-natal, preventivo, farmácia básica, coleta de exames, testes rápidos, acompanhamento de hipertensos e diabéticos).
- [ ] **Horários**: tabela de funcionamento geral e horários específicos (vacinação, coleta, farmácia).
- [ ] **Como ser atendido**: passo a passo de agendamento, lista de documentos necessários e bloco de urgência/emergência (SAMU 192, UPA).
- [ ] **Contato/Localização**: endereço, telefone clicável (`tel:`), mapa do Google Maps incorporado sem chave de API, com `loading="lazy"`.
- [ ] `js/main.js`: calcula o status "Aberto agora" a partir de um objeto de horários, preenche o ano no rodapé e fecha o menu mobile ao navegar.
- [ ] Acessibilidade desde a base: link "Pular para o conteúdo", contraste AA, foco visível, `aria-label` nos ícones funcionais, `lang="pt-BR"` e respeito a `prefers-reduced-motion`.
- [ ] Rodapé com aviso de que o site é informativo e não coleta dados de pacientes, além do crédito ao projeto de extensão UNIP.

## 📂 Impactos / Arquivos Alvo
- 🆕 `index.html` (Criação)
- 🆕 `css/styles.css` (Criação: tokens de cor, tipografia e componentes)
- 🆕 `js/main.js` (Criação)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** N/A.
- **Environment (ENV):** N/A.
- **Pacotes:** Nenhum `npm install`. Bootstrap, Bootstrap Icons e a fonte são carregados por CDN.
- **Side-effects:** Sem internet, o CDN não carrega. Na apresentação, abrir sempre pelo link publicado (JOB-04).
- **Depende de:** Nenhuma.

## ✅ Critérios de Aceite
- [ ] HTML sem erros estruturais e console do navegador sem erros.
- [ ] Layout sem rolagem horizontal em 360px, 768px e 1280px.
- [ ] Todas as âncoras do menu levam à seção correta e o menu mobile fecha ao clicar.
- [ ] O selo "Aberto agora / Fechado" reflete o horário configurado.
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
