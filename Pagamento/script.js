document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const paymentMethod = document.getElementById('payment-method').value;
    let isValid = true;
  
    if (paymentMethod === 'card') {
      const cardNumber = document.getElementById('card-number').value;
      const expiryDate = document.getElementById('expiry-date').value;
      const cvv = document.getElementById('cvv').value;
  
      // Validando os campos do cartão
      if (cardNumber.trim() === '' || expiryDate.trim() === '' || cvv.trim() === '') {
        showMessage('Por favor, preencha todos os campos.', 'red');
        isValid = false;
      } else if (!(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardNumber))) {
        showMessage('Número do cartão inválido.', 'red');
        isValid = false;
      } else if (!(/^\d{2}\/\d{2}$/.test(expiryDate))) {
        showMessage('Data de expiração inválida. Use o formato MM/AA.', 'red');
        isValid = false;
      } else if (!(/^\d{3}$/.test(cvv))) {
        showMessage('CVV inválido.', 'red');
        isValid = false;
      }
    }
  
    if (isValid) {
      showMessage('Pagamento realizado com sucesso!', 'green');
    }
  });
  
  document.getElementById('payment-method').addEventListener('change', function() {
    const paymentMethod = this.value;
    const cardDetails = document.getElementById('card-details');
  
    if (paymentMethod === 'card') {
      cardDetails.style.display = 'block';
    } else {
      cardDetails.style.display = 'none';
    }
  });
  
  function showMessage(message, color) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.color = color;
    messageDiv.textContent = message;
  }
  