// script/contato.js

document.addEventListener('DOMContentLoaded', function () {
  // 1) Inicializa o EmailJS com sua Public Key
  emailjs.init("wE7JxyzdfEHmVM7M9");

  // 2) Seleciona o formulário e o elemento de feedback
  const form   = document.getElementById('form-contato');
  const status = document.getElementById('mensagem');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // 3) Feedback inicial ao usuário
    status.style.color = 'blue';
    status.textContent = 'Enviando contato...';

    // 4) Coleta os valores do formulário
    const params = {
      nome:     this.nome.value,
      email:    this.email.value,
      mensagem: this['mensagem-contato'].value
    };

    // 5) Dispara o e-mail via EmailJS
    emailjs.send('service_bikefloripa', 'template_contato', params)
      .then(function() {
        // 6) Se o e-mail for enviado com sucesso, grava no Google Sheets via SheetDB
        fetch('https://sheetdb.io/api/v1/wdnppwddwmj4y', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept':       'application/json'
          },
          body: JSON.stringify({ data: params })
        })
        .then(async res => {
          console.log('SheetDB Contatos status:', res.status, res.statusText);
          console.log('SheetDB Contatos body  :', await res.text());
        })
        .catch(err => console.error('Erro ao postar no SheetDB Contatos:', err));

        // 7) Feedback de sucesso e reset do formulário
        status.style.color = 'green';
        status.textContent = 'Mensagem enviada com sucesso!';
        form.reset();
      })
      .catch(function() {
        // 8) Em caso de erro no envio do e-mail
        status.style.color = 'red';
        status.textContent = 'Erro ao enviar contato. Tente novamente.';
      });
  });
});
