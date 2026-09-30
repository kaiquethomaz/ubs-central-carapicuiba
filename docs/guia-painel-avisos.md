# Guia do Painel de Avisos (Google Forms + Google Sheets)

Este guia explica como a equipe da UBS publica **campanhas e avisos** na página sem precisar programar.

```
Recepção preenche o Google Forms  →  resposta vai para a planilha  →  site lê a planilha  →  aviso aparece no banner amarelo
```

**Como o banner funciona:** logo abaixo do topo da página aparece o aviso mais importante (alertas primeiro, depois o mais recente). Os demais ficam no botão **"Ver mais N avisos"**. A página confere a planilha **sozinha a cada 1 minuto**, então quem está com o site aberto vê o aviso novo sem precisar recarregar.

> Tudo é gratuito e usa uma conta Google da unidade (ou do responsável). Nenhum dado de paciente passa por aqui: só informações públicas de divulgação.

---

## Parte 1 — Configuração inicial (feita uma única vez)

### 1. Criar o formulário

1. Acesse <https://forms.google.com> com a conta Google da unidade e clique em **Em branco**.
2. Dê o título **"Publicar aviso — UBS"**.
3. Crie as perguntas abaixo **com exatamente estes nomes**. O site identifica cada coluna pelo nome, mas não diferencia maiúsculas nem acentos.

| Pergunta | Tipo de pergunta | Obrigatória | Observação |
|---|---|---|---|
| **Título** | Resposta curta | Sim | Ex.: "Campanha de vacinação contra a gripe" |
| **Mensagem** | Parágrafo | Sim | Pode ter várias linhas |
| **Tipo** | Múltipla escolha | Sim | Opções: `Alerta`, `Campanha`, `Aviso` |
| **Válido até** | Data | Não | Último dia em que o aviso aparece. Em branco, fica no ar até ser apagado |

**Quando usar cada tipo:**
- **Alerta**: algo que muda o atendimento hoje ou nos próximos dias (falta de médico, sem coleta, unidade fechada). Tem **prioridade no banner**, com destaque vermelho.
- **Campanha**: vacinação, mutirões, dias especiais. Aparece como "Campanha Ativa:".
- **Aviso**: recados gerais (grupos, novos horários, orientações).

4. Em **Configurações**, deixe **desmarcado** "Coletar endereços de e-mail". Se quiser que só a equipe publique, ative **"Restringir aos usuários da organização"** ou simplesmente não divulgue o link do formulário ao público.

### 2. Vincular à planilha

1. No formulário, abra a aba **Respostas** e clique em **Vincular ao Planilhas** (ícone verde) → **Criar uma nova planilha**.
2. Na planilha, acesse **Arquivo → Configurações** e confirme a **Localidade: Brasil**. Isso garante datas no formato `dd/mm/aaaa`.

### 3. Publicar a planilha em CSV

1. Na planilha, acesse **Arquivo → Compartilhar → Publicar na Web**.
2. Em "Link", escolha a aba **Respostas ao formulário 1** e o formato **Valores separados por vírgula (.csv)**.
3. Clique em **Publicar** e copie o link gerado. Ele termina em `output=csv`.

> Publicar na web torna **somente os valores da planilha** visíveis para quem tiver o link. Como os avisos já são públicos, não há problema. **Não adicione outras informações nessa planilha.**

### 4. Ligar o site à planilha

Abra o arquivo `js/config.js` e cole o link entre as aspas:

```js
window.AVISOS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv';
```

Publique o site novamente (veja o `README.md`). A partir daí os avisos de exemplo deixam de aparecer e o site passa a mostrar os avisos da planilha.

---

## Parte 2 — Uso no dia a dia

### Publicar um aviso
1. Abra o link do formulário (vale salvar nos favoritos do computador da recepção ou do celular).
2. Preencha título, mensagem, tipo e, se quiser, a data de validade.
3. Clique em **Enviar**.

⏱️ O Google leva **de 1 a 5 minutos** para atualizar a planilha publicada. Depois disso, o aviso aparece sozinho em até 1 minuto para quem estiver com a página aberta.

### Editar um aviso
Abra a planilha de respostas e altere o texto direto na célula. A alteração aparece no site em alguns minutos.

### Tirar um aviso do ar
Você pode fazer de duas formas:
- **Automático:** o aviso some sozinho depois da data em "Válido até".
- **Manual:** na planilha, clique com o botão direito no número da linha → **Excluir linha**.

### Boas práticas
- Títulos curtos e diretos: *"Sem coleta de sangue na sexta (04/10)"*.
- Na mensagem, diga **o quê, quando, para quem e o que levar**.
- Use **Alerta** só para o que é urgente. Se tudo for alerta, nada chama atenção.
- Nunca publique nomes de pacientes, telefones pessoais ou qualquer dado de saúde de alguém.

---

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Aparece "Não foi possível carregar os avisos" | Link errado ou planilha despublicada | Refazer o passo 3 e conferir o link no `config.js` |
| O aviso novo não aparece | Atraso de publicação do Google | Aguardar até 5 minutos (a página se atualiza sozinha) |
| O aviso some antes da hora ou nunca some | Planilha com localidade diferente de Brasil | Arquivo → Configurações → Localidade: Brasil |
| Aparece como "Aviso" em vez de "Campanha" | Opção digitada diferente | Usar exatamente `Alerta`, `Campanha` ou `Aviso` |
| Site não mostra nenhum aviso | Pergunta renomeada no formulário | As colunas **Título** e **Mensagem** precisam manter esses nomes |
