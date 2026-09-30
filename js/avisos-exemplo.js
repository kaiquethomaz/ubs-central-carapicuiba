(function () {
  function diasAPartirDeHoje(dias) {
    const d = new Date();
    d.setHours(9, 0, 0, 0);
    d.setDate(d.getDate() + dias);
    return d;
  }

  window.AVISOS_EXEMPLO = [
    {
      titulo: 'Vacinação contra Gripe e Dengue',
      mensagem: 'Atendimento na Sala 03, de segunda a sexta, das 08h às 16h. Traga sua carteira de vacinação.',
      tipo: 'Campanha',
      publicadoEm: diasAPartirDeHoje(0),
      validoAte: diasAPartirDeHoje(25),
    },
    {
      titulo: 'Mutirão do preventivo no sábado',
      mensagem: 'No próximo sábado, das 8h às 12h, a unidade abre em horário especial para coleta do exame preventivo (Papanicolau). Mulheres de 25 a 64 anos podem comparecer sem agendamento.',
      tipo: 'Campanha',
      publicadoEm: diasAPartirDeHoje(-4),
      validoAte: diasAPartirDeHoje(5),
    },
    {
      titulo: 'Grupo de hipertensos e diabéticos',
      mensagem: 'Encontro mensal toda primeira quarta-feira do mês, às 9h, no salão da unidade. Vamos falar sobre alimentação e aferir pressão e glicemia. Traga suas receitas para renovação.',
      tipo: 'Aviso',
      publicadoEm: diasAPartirDeHoje(-6),
      validoAte: null,
    },
    {
      titulo: 'Novo horário da farmácia',
      mensagem: 'A partir deste mês, a farmácia funciona das 08h às 17h, de segunda a sexta-feira.',
      tipo: 'Aviso',
      publicadoEm: diasAPartirDeHoje(-10),
      validoAte: diasAPartirDeHoje(20),
    },
    {
      // vencido: não deve aparecer
      titulo: 'Dia D de multivacinação',
      mensagem: 'Atualização da caderneta de vacinação de crianças e adolescentes.',
      tipo: 'Campanha',
      publicadoEm: diasAPartirDeHoje(-30),
      validoAte: diasAPartirDeHoje(-15),
    },
  ];
})();
