export default function updateBasket() {
  const basketState = JSON.parse(localStorage.getItem('basket'));
  if (!basketState) {
    return;
  }
  let basketCost = 0;
  Object.values(basketState).forEach(basketItem => {
    basketCost += +basketItem.price * +basketItem.quantity / +basketItem.pricePointValue;
  });
  document.querySelector('.kettle-small__cost').innerHTML = basketCost;

  if (basketCost > 0) {
    document.querySelector('.kettle-small').classList.add('kettle-small_full');
  } else {
    document.querySelector('.kettle-small').classList.remove('kettle-small_full');
  }
};
