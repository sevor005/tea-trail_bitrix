import axios from 'axios';

import updateBasket from './update-basket';

document.querySelector('.js-order-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const formNode = event.target;
  const formData = {
    goods: JSON.parse(localStorage.getItem('basket')),
  };

  formNode.querySelectorAll('input').forEach(inputNode => {
    if (inputNode.type === 'radio' && !inputNode.checked) {
      return;
    }

    formData[inputNode.name] = inputNode.value;
  });

  axios({
    method: 'post',
    url: '/api/order/',
    data: formData,
  }).then(() => {
    formNode.querySelectorAll('input:not([type="radio"])').forEach(inputNode => {
      inputNode.value = '';
      localStorage.setItem('basket', JSON.stringify({}));
      updateBasket();
      document.querySelector('.js-dialog-basket').style.display = 'none';
      document.querySelector('.js-dialog-order-finish').style.display = 'block';
    });
  });
});
