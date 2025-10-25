document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[action="/message"]');
  const nameInput = document.getElementById('fullName');
  const messageInput = document.getElementById('messageText');

  form.addEventListener('submit', (e) => {
    const nameVal = nameInput.value.trim();
    const messageVal = messageInput.value.trim();

    let errorMsg = '';

    if (!nameVal) errorMsg += 'Please enter your full name.\n';
    if (!messageVal) errorMsg += 'Please write a message.\n';

    if (errorMsg) {
      e.preventDefault();
      alert(errorMsg);
      if (!nameVal) nameInput.focus();
      else messageInput.focus();
    }
  });
});