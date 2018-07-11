import baron from 'baron';

baron({
  direction: 'v',
  scroller: '.js-page-wrapper',
  bar: '.js-v-scroller-bar',
});

baron({
  direction: 'h',
  scroller: '.js-page-wrapper',
  bar: '.js-h-scroller-bar',
});

function onMouseDown(event) {
  if (!event.target.classList.contains('scroll__handler')) {
    document.querySelector('.page-wrapper').addEventListener('mousemove', onMouseMove);
  }
}

function onMouseMove(event) {
  event.preventDefault();
  document.querySelector('.page-wrapper').scrollTop -= event.movementY;
  document.querySelector('.page-wrapper').scrollLeft -= event.movementX;
}

function onMouseUp() {
  document.querySelector('.page-wrapper').removeEventListener('mousemove', onMouseMove);
}

document.querySelector('.page-wrapper').addEventListener('mouseup', onMouseUp);

document.querySelector('.page-wrapper').addEventListener('mousedown', onMouseDown);
