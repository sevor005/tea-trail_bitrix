function getNodeIndex(node) {
  const nodes = Array.prototype.slice.call(node.parentNode.children);
  return nodes.indexOf(node);
}

const sliderNode = document.querySelector('.js-kettle-slider');

sliderNode.querySelector('.kettle__slider-left').addEventListener('click', () => {
  const activeSlideNode = sliderNode.querySelector('.kettle-slider__slide_active');
  const slidesNodeList = sliderNode.querySelectorAll('.kettle-slider__slide');
  const currentIndex = getNodeIndex(activeSlideNode);
  const slidesCount = slidesNodeList.length;
  const newIndex = currentIndex > 0 ? currentIndex - 1 : slidesCount - 1;

  activeSlideNode.classList.remove('kettle-slider__slide_active');
  sliderNode.querySelectorAll('.kettle-slider__slide')[newIndex].classList.add('kettle-slider__slide_active');
});

sliderNode.querySelector('.kettle__slider-right').addEventListener('click', () => {
  const activeSlideNode = sliderNode.querySelector('.kettle-slider__slide_active');
  const slidesNodeList = sliderNode.querySelectorAll('.kettle-slider__slide');
  const currentIndex = getNodeIndex(activeSlideNode);
  const slidesCount = slidesNodeList.length;
  const newIndex = currentIndex < slidesCount - 1 ? currentIndex + 1 : 0;

  activeSlideNode.classList.remove('kettle-slider__slide_active');
  sliderNode.querySelectorAll('.kettle-slider__slide')[newIndex].classList.add('kettle-slider__slide_active');
});
