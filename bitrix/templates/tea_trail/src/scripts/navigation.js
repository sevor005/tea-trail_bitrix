import { scrollToElement } from './scroll-to';
import openGoodsDialog from './open-goods-dialog';
import openBasketDialog from './open-basket-dialog';

function selectMenuItem(hash) {
  const menuItem = document.querySelector(`.menu .menu__link[href="#${hash}"]`);

  if (!menuItem) {
    return;
  }

  document.querySelectorAll('.menu .menu__item').forEach(item => {
    item.classList.remove('menu__item_active');
  });

  menuItem.parentNode.classList.add('menu__item_active');
}

function showTeaSection(sectionCode) {
  document.querySelectorAll('.tea-section').forEach(sectionNode => {
    if (sectionNode.getAttribute('data-tea-section') === sectionCode) {
      sectionNode.style.display = 'block';
    } else {
      sectionNode.style.display = 'none';
    }
  });
}

function navigateByHash(url) {
  const hash = url.split('#')[1] ||'kettle';
  const hashParts = hash.split('/');
  scrollToElement(`[data-id="${hashParts[0]}"]`);
  if (hashParts.length === 3 || hashParts.length === 2 && hashParts[0] == 'dishes') {
    openGoodsDialog(document.querySelector(`.js-goods[href="#${hash}"]`));
  } else if (hash === 'basket') {
    openBasketDialog();
  } else {
    selectMenuItem(hash);
  }

  if (hashParts[0] === 'tea') {
    showTeaSection(hashParts[1]);
  }
}

window.onhashchange = (event) => {
  navigateByHash(event.newURL);
};

window.addEventListener('load', () => {
  navigateByHash(window.location.href);
});
