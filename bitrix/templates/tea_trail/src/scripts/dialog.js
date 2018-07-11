const dialogOverlayNode = document.querySelector('.dialog-overlay');
const dialogsNodeList = document.querySelectorAll('.dialog');

function close() {
  dialogsNodeList.forEach(dialogNode => {
    dialogNode.style.display = 'none';
  });
  dialogOverlayNode.style.display = 'none';

  const hashParts = window.location.hash.split('/');

  if (hashParts.length === 3 && hashParts[0] === '#tea' || hashParts.length === 2 && hashParts[0] === '#dishes') {
    window.location.hash = hashParts.slice(0, -1).join('/');
  } else if (hashParts[0] === '#basket') {
    history.back();
  }
}

dialogOverlayNode.addEventListener('click', close);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    close();
  }
});

dialogsNodeList.forEach(dialogNode => {
  dialogNode.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  dialogNode.querySelector('.dialog__close').addEventListener('click', close);
});
