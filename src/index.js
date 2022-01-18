import './sass/main.scss';
import fetchImages from './fetchImages';
import photoCard from './templates/photoCard.hbs';

const refs = {
  formSeachEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
};

refs.formSeachEl.addEventListener('submit', getImages);

function getImages(e) {
  e.preventDefault();
  // console.log(e.target.searchQuery.value);

  fetchImages(e.target.searchQuery.value).then(createMarkup);
}

function createMarkup(dataImages) {
  const markup = photoCard(dataImages.hits);
  refs.galleryEl.innerHTML = markup;
  console.log(markup);
}
