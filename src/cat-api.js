import axios, { Axios } from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_WRWXKlnRixSzsHICcWS6Pn9tmnRdWr3I3QkTBEOi29hGwjbPJIswGEFXh1JSeUoD';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios
    .get('/breeds')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      showError();
    });
}

export function fetchCatByBreed(breedsData, breedId) {
  return breedsData.find(breed => breed.id === breedId);
}
