import baron from 'baron';

baron({
  direction: 'v',
  scroller: '.js-dialog-basket .js-dialog-content',
  bar: '.js-dialog-basket .js-dialog-v-scroller-bar',
  root: '.js-dialog-basket',
});

baron({
  direction: 'v',
  scroller: '.js-dialog-goods .js-dialog-content',
  bar: '.js-dialog-goods .js-dialog-v-scroller-bar',
  root: '.js-dialog-goods',
});
