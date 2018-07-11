import { scrollTo } from './scroll-to';

const pageWrapperNode = document.querySelector('.page-wrapper');
const pageNode = document.querySelector('.page');
const mapImgNode = document.querySelector('.map__img');
const mapPointerNode = document.querySelector('.map__pointer');

const pageWidth = pageNode.offsetWidth;
const pageHeight = pageNode.offsetHeight;

const mapWidth = mapImgNode.offsetWidth;
const mapHeight = mapImgNode.offsetHeight;

const coefficient = pageWidth / mapWidth;

function getMapPointerSize() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const mapPointerWidth = windowWidth / coefficient;
  const mapPointerHeight = windowHeight / coefficient;

  return { mapPointerWidth, mapPointerHeight };
}

function updateMapPointer() {
  const { mapPointerWidth, mapPointerHeight } = getMapPointerSize();

  mapPointerNode.style.width = `${mapPointerWidth}px`;
  mapPointerNode.style.height = `${mapPointerHeight}px`;
}

updateMapPointer();

pageWrapperNode.addEventListener('scroll', () => {
  const mapPointerScrollTop = pageWrapperNode.scrollTop / coefficient;
  const mapPointerScrollLeft = pageWrapperNode.scrollLeft / coefficient;

  mapPointerNode.style.top = `${mapPointerScrollTop}px`;
  mapPointerNode.style.left = `${mapPointerScrollLeft}px`;
});

mapImgNode.addEventListener('click', (event) => {
  const clickByPointer = event.target.classList.contains('map__pointer');
  const offsetTop = clickByPointer ? event.offsetY + mapPointerNode.offsetTop : event.offsetY;
  const offsetLeft = clickByPointer ? event.offsetX + mapPointerNode.offsetLeft : event.offsetX;

  const { mapPointerWidth, mapPointerHeight } = getMapPointerSize();

  const pageWrapperScrollY = (offsetTop - mapPointerHeight / 2) * coefficient;
  const pageWrapperScrollX = (offsetLeft - mapPointerWidth / 2) * coefficient;

  scrollTo(pageWrapperNode, pageWrapperScrollY, pageWrapperScrollX);
});

window.addEventListener('resize', updateMapPointer)
