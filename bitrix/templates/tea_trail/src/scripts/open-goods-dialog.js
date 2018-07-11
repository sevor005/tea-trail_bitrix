export default function openGoodsDialog(goodsNode) {
  const id = goodsNode.getAttribute('data-id');
  const name = goodsNode.getAttribute('data-name');
  const link = goodsNode.getAttribute('data-link');
  const previewText = goodsNode.getAttribute('data-preview-text');
  const detailText = goodsNode.querySelector('.goods__detail-text').innerHTML;
  const image = goodsNode.getAttribute('data-image');
  const price = goodsNode.getAttribute('data-price');
  const pricePoint = goodsNode.getAttribute('data-price-point');
  const goodsDialogNode = document.querySelector('.js-dialog-goods');

  document.querySelector('.dialog-overlay').style.display = 'block';
  goodsDialogNode.querySelector('.goods-card__img').style.backgroundImage = `url(${image})`;
  goodsDialogNode.querySelector('.goods-card__title').innerHTML = name;
  goodsDialogNode.querySelector('.goods-card__cost').innerHTML = `${price} руб./<span class="goods-card__weight">${pricePoint}</span>`;
  goodsDialogNode.querySelector('.goods-card__short').innerHTML = previewText;
  goodsDialogNode.querySelector('.goods-card__detail-text').innerHTML = detailText;
  goodsDialogNode.querySelector('.goods-card__btn').setAttribute('data-id', id);
  goodsDialogNode.querySelector('.goods-card__btn').setAttribute('data-name', name);
  goodsDialogNode.querySelector('.goods-card__btn').setAttribute('data-link', link);
  goodsDialogNode.querySelector('.goods-card__btn').setAttribute('data-image', image);
  goodsDialogNode.querySelector('.goods-card__btn').setAttribute('data-price', price);
  goodsDialogNode.querySelector('.goods-card__btn').setAttribute('data-price-point', pricePoint);
  goodsDialogNode.querySelector('.goods-card__btn .btn__quantity').innerHTML = pricePoint.split(' ')[0];

  document.querySelectorAll('.dialog').forEach(dialogNode => {
    dialogNode.style.display = 'none';
  });

  goodsDialogNode.style.display = 'block';
};
