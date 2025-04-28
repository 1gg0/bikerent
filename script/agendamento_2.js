
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-agendamento');
  const mensagemStatus = document.getElementById('mensagem-status');

  // Inicializando EmailJS corretamente
  emailjs.init("wE7JxyzdfEHmVM7M9");

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    mensagemStatus.textContent = "Enviando agendamento...";
    mensagemStatus.style.color = "#888";

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const plano = document.getElementById('plano').value;
    const observacoes = document.getElementById('observacoes').value;

    const templateParams = {
      nome: nome,
      email: email,
      data: data,
      hora: hora,
      plano: plano,
      observacoes: observacoes
    };

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
