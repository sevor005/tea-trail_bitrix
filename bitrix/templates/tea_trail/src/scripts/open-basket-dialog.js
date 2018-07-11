import updateBasket from './update-basket';

function getBasketTotalCost() {
  const basketState = JSON.parse(localStorage.getItem('basket'));
  return Object.values(basketState).reduce((total, basketItem) => total + +basketItem.price * +basketItem.quantity / +basketItem.pricePointValue, 0);
}

export default function openBasketDialog(goodsNode) {
  const basketState = JSON.parse(localStorage.getItem('basket'));
  const basketDialogNode = document.querySelector('.js-dialog-basket');
  const basketItemsListNode = basketDialogNode.querySelector('.basket__order');
  const basketTotalCostNode = basketDialogNode.querySelector('.js-basket-total');

  function update() {
    localStorage.setItem('basket', JSON.stringify(basketState));
    basketTotalCostNode.innerHTML = getBasketTotalCost();
    updateBasket();
  }

  document.querySelector('.dialog-overlay').style.display = 'block';

  document.querySelectorAll('.dialog').forEach(dialogNode => {
    dialogNode.style.display = 'none';
  });

  const basketItems = Object.values(basketState).map((basketItem) => `
    <div class="order js-basket-item" data-price-point-value="${basketItem.pricePointValue}" data-id="${basketItem.id}">
      <div class="order__section">
        <div class="order__img" style="background-image: url(${basketItem.image});"></div>
        <div class="order__title-case">
          <a href="#${basketItem.link}" class="order__title">${basketItem.name}</a>
        </div>
      </div>
      <div class="order__section">
        <div class="order__counter counter">
          <div class="counter__switch js-count-dec">-</div>
          <div class="counter__quantity">${basketItem.quantity} ${basketItem.pricePointCaption}</div>
          <div class="counter__switch js-count-inc">+</div>
        </div>
        <div class="order__cost">${basketItem.price} руб</div>
        <div class="order__close js-basket-item-delete"></div>
      </div>
    </div>
  `);

  if (!basketItems || basketItems.length === 0) {
    basketDialogNode.querySelector('.basket__delivery').style.display = 'none';
    basketDialogNode.querySelector('.basket__form').style.display = 'none';
  } else {
    basketDialogNode.querySelector('.basket__delivery').style.display = 'block';
    basketDialogNode.querySelector('.basket__form').style.display = 'block';
  }

  basketItemsListNode.innerHTML = basketItems.join('');
  basketTotalCostNode.innerHTML = getBasketTotalCost();

  basketItemsListNode.querySelectorAll('.js-basket-item').forEach(basketItemNode => {
    const pricePointValue = basketItemNode.getAttribute('data-price-point-value');

    basketItemNode.querySelector('.js-count-dec').addEventListener('click', () => {
      const quantityNode = basketItemNode.querySelector('.counter__quantity');
      const [quantityValue, quantityCaption] = quantityNode.innerHTML.split(' ');
      if (quantityValue > pricePointValue) {
        const newQuantity = quantityValue - pricePointValue;
        quantityNode.innerHTML = `${newQuantity} ${quantityCaption}`;
        basketState[basketItemNode.getAttribute('data-id')].quantity = newQuantity;
        update();
      }
    });

    basketItemNode.querySelector('.js-count-inc').addEventListener('click', () => {
      const quantityNode = basketItemNode.querySelector('.counter__quantity');
      const [quantityValue, quantityCaption] = quantityNode.innerHTML.split(' ');
      const newQuantity = +quantityValue + +pricePointValue;
      quantityNode.innerHTML = `${newQuantity} ${quantityCaption}`;
      basketState[basketItemNode.getAttribute('data-id')].quantity = newQuantity;
      update();
    });

    basketItemNode.querySelector('.js-basket-item-delete').addEventListener('click', (event) => {
      const itemForDeleteNode = event.target.parentNode.parentNode;
      const itemForDeleteId = itemForDeleteNode.getAttribute('data-id');
      delete basketState[itemForDeleteId];
      itemForDeleteNode.remove();
      update();
    });
  });

  basketDialogNode.style.display = 'block';
};
