import axios from 'axios';

document.querySelector('.js-feedback-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const formNode = event.target;
  const formData = {};
  const hasErrors = false;

  formNode.querySelectorAll('input, textarea').forEach(inputNode => {
    if (!inputNode.value) {
      hasErrors = true;
      inputNode.classList.add('form__field_error');
    } else {
      inputNode.classList.remove('form__field_error');
      formData[inputNode.name] = inputNode.value;
    }
  });

  if (hasErrors) {
    return;
  }

  axios({
    method: 'post',
    url: '/api/feedback/',
    data: formData,
  }).then(() => {
    formNode.querySelectorAll('input, textarea').forEach(inputNode => {
      inputNode.value = '';
      document.querySelector('.dialog-overlay').style.display = 'block';
      document.querySelector('.js-dialog-feedback-finish').style.display = 'block';
    });
  });
});
