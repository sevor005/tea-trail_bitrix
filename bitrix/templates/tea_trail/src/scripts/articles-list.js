function getNodeIndex(node) {
  const nodes = Array.prototype.slice.call(node.parentNode.children);
  return nodes.indexOf(node);
}

function selectPage(articlesSectionNode, pageIndex) {
  articlesSectionNode.querySelectorAll('.articles-page').forEach((pageNode, index) => {
    if (index === pageIndex) {
      pageNode.classList.add('articles-page_active');
    } else {
      pageNode.classList.remove('articles-page_active');
    }
  });

  articlesSectionNode.querySelector('.switch-article__circle_active').classList.remove('switch-article__circle_active');
  articlesSectionNode.querySelectorAll('.switch-article__circle')[pageIndex].classList.add('switch-article__circle_active');
}

document.querySelectorAll('.switch-article').forEach(switcherNode => {
  const sectionNode = switcherNode.parentNode;
  const pagesCount = sectionNode.querySelectorAll('.articles-page').length;

  switcherNode.querySelectorAll('.switch-article__circle').forEach(circleNode => {
    const circleIndex = getNodeIndex(circleNode);
    const pageIndex = circleIndex - 1;
    circleNode.addEventListener('click', () => selectPage(sectionNode, pageIndex));
  });

  switcherNode.querySelector('.switch-article__toggle_left').addEventListener('click', () => {
    const activePageIndex = getNodeIndex(sectionNode.querySelector('.articles-page_active'));
    if (activePageIndex - 1 >= 0) {
      selectPage(sectionNode, activePageIndex - 1);
    }
  });

  switcherNode.querySelector('.switch-article__toggle_right').addEventListener('click', () => {
    const activePageIndex = getNodeIndex(sectionNode.querySelector('.articles-page_active'));
    if (activePageIndex + 1 < pagesCount) {
      selectPage(sectionNode, activePageIndex + 1);
    }
  });
});
