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
    return res.data;
  });
}

fetchBreeds().then(data => {
  data.map(breed => {
    const selectItem = document.createElement('option');
    selectItem.value = breed.id;
    selectItem.text = breed.name;
    selector.insertAdjacentElement('beforeend', selectItem);
  });
});

fetchBreeds().then(data => {
  console.log(data[0]);
});

fetchBreeds().then(data => {
  data.map(breed => {
    console.log(breed.id);
    console.log(breed.name);
    console.log(breed.description);
    console.log(breed.image.url);
    const image = document.createElement('img');
    image.src = breed.image.url;
    image.alt = 'This is a image of a cat';
    image.width = 300;
    image.height = 200;
    info.insertAdjacentElement('beforeend', image);
  });
});
