import openGoodsDialog from './open-goods-dialog';

document.querySelectorAll('.js-goods').forEach((goodsNode) => {
  goodsNode.addEventListener('click', () => openGoodsDialog(goodsNode));
});
