const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '25300151-6154e4a76e8e82454cce4100c';

import Notiflix from 'notiflix';
import axios from 'axios';

export default async function fetchImages(query, page = 1, perPage = 40) {
  if (!query || !query.trim() || page > Math.floor(500 / perPage) + 1) {
    return Promise.resolve('');
  }
  return await axios
    .get(
      `${BASE_URL}?image_type=photo&orientation=horizontal&safeserach=true&page=${page}&per_page=${perPage}&key=${apiKey}&q=${query}`,
    )
    .then(response => {
      console.log('total', Number(response.data.total));
      if (Number(response.status) !== 200) {
        throw new Error(Notiflix.Notify.failure(`Error ${response.status}`));
      }
      if (Number(response.data.total) !== 0) {
        return response.data;
      }
      Notiflix.Notify.failure(
        '❌ Sorry, there are no images matching your search query. Please try again.',
      );
    })
    .catch(() =>
      Notiflix.Notify.failure(
        '❌ Sorry, there are no images matching your search query. Please try again.',
      ),
    );
}
