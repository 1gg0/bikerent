document.addEventListener('DOMContentLoaded', function () {
  // 1) Inicializa o EmailJS
  emailjs.init("wE7JxyzdfEHmVM7M9");

  const form = document.getElementById('form-agendamento');
  const msg  = document.getElementById('mensagem');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Feedback inicial
    msg.style.color = '#888';
    msg.textContent = 'Enviando agendamento...';

    // 2) Monta o objeto com os campos fixos
    const params = {
      nome:           form.nome.value,
      email:          form.email.value,
      data:           form.data.value,
      horario_inicio: form.horario_inicio.value,
      duracao:        form.duracao.value,
      observacoes:    form.observacoes.value
    };

    // 3) Adiciona bicicleta_1, bicicleta_2, … conforme selects
    form.querySelectorAll('select[name="bicicleta"]').forEach((sel, i) => {
      params[`bicicleta_${i+1}`] = sel.value;
    });

    // 4) Envia o e-mail
    emailjs.send('service_bikefloripa', 'template_agendamento', params)
      .then(function() {
        // 5) Em caso de sucesso no e-mail, dispara gravação no SheetDB
        fetch('https://sheetdb.io/api/v1/y6nmrlr4yqdxl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept':       'application/json'
          },
          body: JSON.stringify({ data: params })
        })
        .then(async res => {
          console.log('SheetDB POST status:', res.status, res.statusText);
          console.log('SheetDB POST body  :', await res.text());
        })
        .catch(err => console.error('Erro ao postar no SheetDB:', err));

        // 6) Feedback visual e reset
        msg.style.color = 'green';
        msg.textContent = 'Agendamento enviado com sucesso! Verifique seu e-mail.';
        form.reset();

        // 7) Recria apenas 1 select de bicicleta
        document.getElementById('bicicletas').innerHTML = `
          <div class="bicicleta-container">
            <label>Bicicleta:</label>
            <select name="bicicleta">
              <option value="Caloi Elite FS">Caloi Elite FS</option>
              <option value="Caloi Supra">Caloi Supra</option>
              <option value="Caloi Carbon XC Race">Caloi Carbon XC Race</option>
              <option value="Caloi Explorer Comp">Caloi Explorer Comp</option>
            </select>
            <button type="button" class="remover-btn" onclick="removerBicicleta(this)">x</button>
          </div>
        `;
      })
      .catch(function() {
        msg.style.color = 'red';
        msg.textContent = 'Erro ao enviar agendamento. Tente novamente.';
      });
  });
});
