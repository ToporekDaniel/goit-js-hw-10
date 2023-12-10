import axios, { Axios } from 'axios';

const selector = document.querySelector('.breed-select');
const loadingTxt = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
const info = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_WRWXKlnRixSzsHICcWS6Pn9tmnRdWr3I3QkTBEOi29hGwjbPJIswGEFXh1JSeUoD';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get('/breeds').then(res => {
    return console.log(res.data);
  });
}
fetchBreeds();
