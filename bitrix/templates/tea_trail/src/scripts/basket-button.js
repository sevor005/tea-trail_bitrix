import updateBasket from './update-basket';

document.querySelectorAll('.js-basket-button').forEach(buttonNode => {
  buttonNode.querySelector('.btn__section-left').addEventListener('click', (event) => {
    event.stopPropagation();
  });

  buttonNode.querySelector('.js-button-dec').addEventListener('click', () => {
    const pricePoint = buttonNode.getAttribute('data-price-point');
    const [pricePointValue, pricePointCaption] = pricePoint.split(' ');
    const quantityNode = buttonNode.querySelector('.btn__quantity');
    const quantity = quantityNode.innerHTML;
    if (quantity > pricePointValue) {
      quantityNode.innerHTML = quantity - pricePointValue;
    }
  });

  buttonNode.querySelector('.js-button-inc').addEventListener('click', () => {
    const pricePoint = buttonNode.getAttribute('data-price-point');
    const [pricePointValue, pricePointCaption] = pricePoint.split(' ');
    const quantityNode = buttonNode.querySelector('.btn__quantity');
    const quantity = quantityNode.innerHTML;
    quantityNode.innerHTML = +quantity + +pricePointValue;
  });

  buttonNode.addEventListener('click', (event) => {
    const id = buttonNode.getAttribute('data-id');
    const name = buttonNode.getAttribute('data-name');
    const link = buttonNode.getAttribute('data-link');
    const image = buttonNode.getAttribute('data-image');
    const price = buttonNode.getAttribute('data-price');
    const pricePoint = buttonNode.getAttribute('data-price-point');
    const [pricePointValue, pricePointCaption] = pricePoint.split(' ');
    const quantityNode = buttonNode.querySelector('.btn__quantity');
    const quantity = quantityNode.innerHTML;
    const flyingTeaIconNode = document.querySelector('.kettle-small__tea');
    const basketHatNode = document.querySelector('.kettle-small__head');
    basketHatNode.classList.add('kettle-small__head_opened');
    flyingTeaIconNode.style.display = 'block';
    flyingTeaIconNode.style.top = `${event.clientY}px`;
    flyingTeaIconNode.style.right = `${window.innerWidth - event.clientX}px`;
    setTimeout(() => {
      flyingTeaIconNode.style.top = null;
      flyingTeaIconNode.style.right = null;
      flyingTeaIconNode.style.opacity = 0;
    });
    setTimeout(() => {
      flyingTeaIconNode.style.opacity = null;
      flyingTeaIconNode.style.display = 'none';
      basketHatNode.classList.remove('kettle-small__head_opened');

      const basketState = JSON.parse(localStorage.getItem('basket')) || {};

      if (basketState[id]) {
        basketState[id].quantity = +basketState[id].quantity + +quantity;
      } else {
        basketState[id] = { id, name, link, image, price, pricePointValue, pricePointCaption, quantity };
      }

      localStorage.setItem('basket', JSON.stringify(basketState));

      updateBasket();
    }, 500);
  });
});

updateBasket();
