# 🛠️ Issue: JOB-08 — Dados reais da UBS Central (Carapicuíba)
**Tipo:** `Chore`

## 📖 História / Escopo
> A instituição beneficiada foi definida: **UBS Central, Vila Gustavo Correia, Carapicuíba/SP, telefone (11) 4188-5930**. Este job troca os dados fictícios ("UBS Vila Real") pelos dados reais, para que a demonstração na Etapa 4 mostre a página da própria unidade.
>
> **Fontes consultadas em 30/09/2026:**
> - Nome, bairro e telefone: informados pelo aluno.
> - Horário de 7h às 19h: notícia da Prefeitura de Carapicuíba sobre a ampliação do horário de todas as UBS e USF do município.
> - Endereço Av. Consolação, 505: encontrado em busca que cita as páginas da prefeitura, mas **não confirmado**, porque as páginas oficiais estavam fora do ar.
>
> Tudo o que não pôde ser confirmado fica marcado com `CONFIRMAR NA VISITA`.

**Entregável (Definition of Done):**
> Nome, telefone, endereço, cidade e mapa da UBS Central aparecem em toda a página, e há um checklist com o que falta confirmar na visita.

**Requisitos Técnicos:**
- [ ] Trocar "UBS Vila Real" por "UBS Central" em `<title>`, meta tags, navbar, hero, mapa e rodapé.
- [ ] Telefone `(11) 4188-5930` com link `tel:+551141885930` em todos os pontos.
- [ ] Endereço "Av. Consolação, 505, Vila Gustavo Correia, Carapicuíba/SP" no card do hero e na localização. O mapa e o link de rota usam o mesmo endereço (embed gratuito, sem chave).
- [ ] Remover dados fictícios que não se aplicam (linhas de ônibus 101-A/204-B/305, "próximo à praça central") e usar só informação verificável ("ponto de ônibus na Av. Consolação").
- [ ] Checklist `CONFIRMAR NA VISITA` no README: endereço/CEP, horários por setor, serviços, telefone de atendimento, linhas de ônibus e estrutura física de acessibilidade.

## 📂 Impactos / Arquivos Alvo
- 📝 `index.html` (Modificação: dados da unidade)
- 📝 `README.md` (Modificação: checklist de confirmação)

## ⚠️ Riscos e Dependências
- **Banco de Dados (DB):** N/A.
- **Environment (ENV):** N/A.
- **Pacotes:** N/A.
- **Side-effects:** Informação de saúde errada prejudica o cidadão. Nada não confirmado pode ir para o link público antes da visita.
- **Depende de:** JOB-05.

## ✅ Critérios de Aceite
- [ ] Nenhuma ocorrência de "Vila Real", "Jardim Exemplo" ou "4000-0000" no código.
- [ ] O selo de horário segue 7h às 19h (confirmado pela prefeitura).
- [ ] O Entregável (Definition of Done) foi validado ponta a ponta.
- [ ] Não há logs de debug esquecidos no código.
