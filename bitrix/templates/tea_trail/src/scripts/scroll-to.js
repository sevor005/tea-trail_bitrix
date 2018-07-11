export const scrollTo = (element, toY, toX, duration = 500) => {
  const startY = element.scrollTop;
  const startX = element.scrollLeft;
  const changeY = toY - startY;
  const changeX = toX - startX;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;
    const valY = Math.easeInOutQuad(currentTime, startY, changeY, duration);
    const valX = Math.easeInOutQuad(currentTime, startX, changeX, duration);
    element.scrollTop = valY;
    element.scrollLeft = valX;
    if(currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

export const scrollToElement = (selector) => {
  const elementNode = document.querySelector(selector);

  if (!elementNode) {
    return;
  }

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const elementTop = elementNode.offsetTop;
  const elementLeft = elementNode.offsetLeft;
  const elementWidth = elementNode.offsetWidth;
  const elementHeight = elementNode.offsetHeight;

  const elementCenterX = elementLeft - (windowWidth - elementWidth) / 2;
  const elementCenterY = elementTop - (windowHeight - elementHeight) / 2;

  scrollTo(document.querySelector('.page-wrapper'), elementCenterY, elementCenterX);
};
