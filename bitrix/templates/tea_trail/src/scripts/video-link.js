function showVideo(title, code) {
  const videoNode = document.querySelector('.js-video');
  videoNode.querySelector('.video__title').innerHTML = title;
  videoNode.querySelector('.video__window iframe').src = '';
  videoNode.querySelector('.video__window iframe').src = `https://www.youtube.com/embed/${code}`;
  videoNode.style.display = 'block';
}

document.querySelectorAll('.js-video-link').forEach(linkNode => {
  linkNode.addEventListener('click', (event) => {
    const videoCodeAttr = linkNode.getAttribute('data-video-code');
    if (!!videoCodeAttr) {
      const videoCodeParts = videoCodeAttr.split('/');
      const videoCode = videoCodeParts[videoCodeParts.length - 1];

      showVideo(linkNode.innerHTML, videoCode);
    }
  });
});

const hash = window.location.hash;
const hashParts = hash.split('/');
if (hashParts.length === 2 && hashParts[0] === '#video') {
  const videoLinkNode = document.querySelector(`.js-video-link[href="${hash}"]`);
  const videoCodeAttr = videoLinkNode.getAttribute('data-video-code');
  if (!!videoCodeAttr) {
    const videoCodeParts = videoCodeAttr.split('/');
    const videoCode = videoCodeParts[videoCodeParts.length - 1];
    showVideo(videoLinkNode.innerHTML, videoCode);
  }
}
