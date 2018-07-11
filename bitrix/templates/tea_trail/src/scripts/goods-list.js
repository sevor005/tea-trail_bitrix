function getNodeIndex(node) {
  const nodes = Array.prototype.slice.call(node.parentNode.children);
  return nodes.indexOf(node);
}

function selectPage(goodsSectionNode, pageIndex) {
  goodsSectionNode.querySelectorAll('.goods-page').forEach((pageNode, index) => {
    if (index === pageIndex) {
      pageNode.classList.add('goods-page_active');
    } else {
      pageNode.classList.remove('goods-page_active');
    }
  });

  goodsSectionNode.querySelector('.switch-goods__circle_active').classList.remove('switch-goods__circle_active');
  goodsSectionNode.querySelectorAll('.switch-goods__circle')[pageIndex].classList.add('switch-goods__circle_active');
}

document.querySelectorAll('.switch-goods').forEach(switcherNode => {
  const sectionNode = switcherNode.parentNode;
  const pagesCount = sectionNode.querySelectorAll('.goods-page').length;

  switcherNode.querySelectorAll('.switch-goods__circle').forEach(circleNode => {
    const circleIndex = getNodeIndex(circleNode);
    const pageIndex = circleIndex - 1;
    circleNode.addEventListener('click', () => selectPage(sectionNode, pageIndex));
  });

  switcherNode.querySelector('.switch-goods__toggle_left').addEventListener('click', () => {
    const activePageIndex = getNodeIndex(sectionNode.querySelector('.goods-page_active'));
    if (activePageIndex - 1 >= 0) {
      selectPage(sectionNode, activePageIndex - 1);
    }
  });

  switcherNode.querySelector('.switch-goods__toggle_right').addEventListener('click', () => {
    const activePageIndex = getNodeIndex(sectionNode.querySelector('.goods-page_active'));
    if (activePageIndex + 1 < pagesCount) {
      selectPage(sectionNode, activePageIndex + 1);
    }
  });
});
