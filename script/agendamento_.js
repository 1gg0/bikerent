
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-agendamento');
  const bicicletasAgendadas = document.getElementById('bicicletas-agendadas');
  const planoInput = document.getElementById('plano');
  const mensagemStatus = document.getElementById('mensagem-status');

  // Inicializando EmailJS corretamente
  emailjs.init("wE7JxyzdfEHmVM7M9");

  // Ler parâmetros da URL
  const urlParams = new URLSearchParams(window.location.search);
  const bicicletas = urlParams.get('bicicletas') ? urlParams.get('bicicletas').split(',') : [];
  const plano = urlParams.get('plano') ? urlParams.get('plano') : '';

  // Preenche as bicicletas escolhidas
  if (bicicletas.length > 0) {
    bicicletas.forEach((bike, index) => {
      const div = document.createElement('div');
      div.classList.add('bicicleta-item');
      div.innerHTML = `
        <label>Bicicleta ${index + 1}:</label>
        <input type="text" value="${bike}" readonly>
      `;
      bicicletasAgendadas.appendChild(div);
    });
  }

  // Preenche o plano escolhido
  if (plano) {
    planoInput.value = plano.charAt(0).toUpperCase() + plano.slice(1);
  }

  // Envio do formulário
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    mensagemStatus.textContent = "Enviando agendamento...";
    mensagemStatus.style.color = "blue";

    const email = document.getElementById('email').value;

    const templateParams = {
      email: email
    };

    // Usar o serviço correto e o template correto para agendamento
    emailjs.send('service_bikefloripa', 'template_bikefloripa', templateParams)
    .then(function(response) {
      mensagemStatus.textContent = "Agendamento enviado com sucesso!";
      mensagemStatus.style.color = "green";
      form.reset();
    }, function(error) {
      mensagemStatus.textContent = "Erro ao enviar agendamento. Tente novamente.";
      mensagemStatus.style.color = "red";
    });
  });
});
