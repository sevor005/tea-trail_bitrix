function showArticle(title, text) {
  const articleNode = document.querySelector('.js-article');
  articleNode.querySelector('.paper__title').innerHTML = title;
  articleNode.querySelector('.paper__text').innerHTML = text;
  articleNode.style.display = 'block';
}

document.querySelectorAll('.js-article-link').forEach(linkNode => {
  linkNode.addEventListener('click', (event) => {
    const articleId = linkNode.getAttribute('data-id');
    if (!!articleId) {
      const articleText = document.querySelector(`.article-text-list [data-id="article-text-${articleId}"]`).innerHTML;
      showArticle(linkNode.innerHTML, articleText);
    }
  });
});

const hash = window.location.hash;
const hashParts = hash.split('/');
if (hashParts.length === 2 && hashParts[0] === '#article') {
  const linkNode = document.querySelector(`.js-article-link[href="${hash}"]`);
  const articleId = linkNode.getAttribute('data-id');
  if (!!articleId) {
    const articleText = document.querySelector(`.article-text-list [data-id="article-text-${articleId}"]`).innerHTML;
    showArticle(linkNode.innerHTML, articleText);
  }
}
