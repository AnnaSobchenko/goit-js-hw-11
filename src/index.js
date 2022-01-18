import './sass/main.scss';
import fetchImages from './fetchImages';
import photoCard from './templates/photoCard.hbs';

const refs = {
  formSeachEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
};
let page = 1;
const perPage = 40;
let query = '';
refs.formSeachEl.addEventListener('submit', getImages);

function getImages(e) {
  e.preventDefault();

  page = 1;
  refs.galleryEl.innerHTML = '';
  query = e.target.searchQuery.value;
  fetchImages(query, page, perPage).then(createMarkup);
}

function createMarkup(dataImages) {
  const markup = photoCard(dataImages.hits);
  refs.galleryEl.innerHTML += markup;
  renderOnIntersectionObserverApi(dataImages.hits);
}

function scrollPage() {
  if (page > Math.floor(500 / perPage) + 1) return;
  page += 1;
  fetchImages(query, page, perPage).then(createMarkup);
}

function renderOnIntersectionObserverApi(data) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  // const observer = new IntersectionObserver((entries, observer) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrollPage();
      }
    });
  }, options);
  // createMarkup(data);

  observer.observe(refs.galleryEl.lastElementChild);
}
