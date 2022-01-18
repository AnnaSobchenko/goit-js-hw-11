const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '25300151-6154e4a76e8e82454cce4100c';

import Notiflix from 'notiflix';

export default async function fetchImages(query, page = 1, perPage = 40) {
  console.log('page=', page);
  if (!query || !query.trim() || page > Math.floor(500 / perPage) + 1) {
    return Promise.resolve('');
  }
  return await fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&safeserach=true&page=${page}&per_page=${perPage}&key=${apiKey}&q=${query}`,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(Notiflix.Notify.failure(`Error ${response.status}`));
      }
      return response.json();
    })
    .catch(() =>
      Notiflix.Notify.failure(
        '❌ Sorry, there are no images matching your search query. Please try again.',
      ),
    );
}
