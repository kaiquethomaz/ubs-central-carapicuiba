# Briefing visual e de conteúdo — Landing Page UBS Vila Real

> Documento de referência recebido para a Fase 2 (redesign). Implementado nos Jobs 05 a 07 (ver `docs/jobs/`).

## Diretrizes gerais de design
- **Cores:** azul institucional `#0055A5`, verde de destaque `#28A745`, cinza claro de fundo `#F8F9FA`, branco e amarelo (para alertas).
- **Tipografia:** fonte sem serifa, clara e legível (Inter).
- **Estilo:** visual limpo e acolhedor, com cards bem definidos, totalmente responsivo para celulares.

## 1. Topo e cabeçalho
- **Barra de acessibilidade (fundo escuro):** à esquerda, "Sistema Único de Saúde — SUS" com ícone de hospital; à direita, os botões **Alto Contraste** e **A+ Aumentar Fonte**.
- **Menu (fundo branco):** sigla SUS em azul + "UBS Vila Real". Links: Serviços · Vacinação · Horários · Como Chegar · Dúvidas. Botão verde **Ver Unidade**, que rola até o endereço e o mapa.

## 2. Hero
- Fundo azul bem claro ou gradiente, texto à esquerda e card com ícone grande à direita.
- **Selo dinâmico:** "🟢 Unidade Aberta Agora (Atendimento até 19:00)" ou "🔴 Unidade Fechada no Momento".
- **H1:** "Sua saúde perto de você: atendimento público e gratuito."
- **Subtítulo:** "Confira a disponibilidade de consultas, o calendário da sala de vacinas e as orientações da UBS Vila Real."
- **Botões:** Sala de Vacinas (verde) e Ver Horários (borda azul).

## 3. Banner de avisos em tempo real
- Caixa amarela ou laranja com ícone de megafone. O texto vem do Google Sheets.
- Exemplo: "📢 Campanha Ativa: Vacinação contra Gripe e Dengue". "Atendimento na Sala 03, de segunda a sexta, das 08h às 16h. Traga sua carteira de vacinação."

## 4. Atalhos rápidos (4 cards; 2x2 no celular)
Vacinação (Doses e horários) · Consultas (Especialidades) · Farmácia (Retirada de medicamentos) · Cadastro (Documentos exigidos).

## 5. Serviços oferecidos (3 cards, ícone azul)
- **Clínica Geral & Pediatria:** consultas de rotina, acompanhamento de doenças crônicas e desenvolvimento infantil.
- **Saúde da Mulher & Pré-Natal:** exames preventivos, acompanhamento gestacional e consultas ginecológicas.
- **Odontologia:** avaliação bucal, restaurações, limpeza e atendimento odontológico preventivo.

## 6. Tabela de horários (zebrada)
| Setor / Serviço | Dias | Horário |
|---|---|---|
| Recepção e Triagem | Segunda a Sexta | 07:00 às 19:00 |
| Sala de Vacinas | Segunda a Sexta | 07:30 às 16:30 |
| Coleta de Exames Laboratoriais | Segunda a Sexta | 07:00 às 09:00 (com jejum) |
| Farmácia da Unidade | Segunda a Sexta | 08:00 às 17:00 |

## 7. Documentos necessários (checks verdes)
"Para ser atendido ou fazer o seu cadastro inicial na unidade, tenha em mãos os seguintes documentos originais:" documento oficial com foto (RG ou CNH), CPF, Cartão Nacional do SUS e comprovante de residência recente.

## 8. Localização e contatos (2 colunas)
- **Endereço:** Rua da Saúde, nº 100, Bairro Vila Real, próximo à praça central. **Ônibus:** 101-A, 204-B e 305, com ponto em frente.
- **Canais:** telefone (11) 4000-0000 · Ouvidoria Geral do SUS: Disque 136 · atendimento telefônico das 08h às 17h.

## 9. Perguntas frequentes (accordion)
1. *Posso ser atendido em uma UBS fora do meu bairro?* Acolhimento e urgência leve, em qualquer unidade. Consultas agendadas e acompanhamento contínuo exigem cadastro na UBS de referência do endereço.
2. *Como retirar remédios na farmácia da UBS?* Apresentando a receita médica válida emitida pelo SUS, com documento com foto e Cartão do SUS.

## 10. Rodapé
"Unidade Básica de Saúde — UBS Vila Real" · "Projeto Acadêmico sem fins lucrativos — Informações de utilidade pública."

## Instruções lógicas
- **Status:** de segunda a sexta, das 07h às 19h, exibir selo verde (aberto); nos demais horários, vermelho (fechado).
- **Google Sheets:** buscar a planilha publicada com um parâmetro anti-cache (`&_nocache=`) para atualizar o banner sem F5.
- **Acessibilidade:** funções que alternam no `body` a classe de alto contraste (fundo preto, texto amarelo e branco) e a de aumento de fonte.
