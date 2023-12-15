// import axios, { Axios } from 'axios';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
const selector = document.querySelector('.breed-select');
const loadingTxt = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
const info = document.querySelector('.cat-info');

// axios.defaults.headers.common['x-api-key'] =
//   'live_WRWXKlnRixSzsHICcWS6Pn9tmnRdWr3I3QkTBEOi29hGwjbPJIswGEFXh1JSeUoD';
// axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

// importowana funkcja

// function fetchBreeds() {
//   return axios
//     .get('/breeds')
//     .then(res => {
//       return res.data;
//     })
//     .catch(error => {
//       showError();
//     });
// }

function showSelector() {
  selector.style.display = 'block';
}
function hideselector() {
  selector.style.display = 'none';
}
function showError() {
  errorMsg.style.display = 'block';
}
function hideError() {
  errorMsg.style.display = 'none';
}
function showLoading() {
  loadingTxt.style.display = 'block';
}
function hideLoading() {
  loadingTxt.style.display = 'none';
}

hideError();
hideselector();
fetchBreeds()
  .then(data => {
    hideLoading();
    const initialOption = document.createElement('option');
    initialOption.value = 0;
    initialOption.text = 'Wybierz kota';
    selector.appendChild(initialOption);

    data.map(breed => {
      const selectItem = document.createElement('option');
      selectItem.value = breed.id;
      selectItem.text = breed.name;
      selector.insertAdjacentElement('beforeend', selectItem);
    });
    showSelector();
  })
  .catch(showError);

selector.addEventListener('change', event => {
  if (event.target.value === '0') {
    console.log('Wybierz kota z listy aby uzyskać o nim informacje');
  } else {
    showLoading();
    hideError();
    info.innerHTML = '';
    const catID = event.target.value;
    // console.log(catID);

    fetchBreeds()
      .then(data => {
        const selectedCat = fetchCatByBreed(data, catID);
        // console.log(selectedCat);
        const image = document.createElement('img');
        image.src = selectedCat.image.url;
        image.alt = 'This is a image of a cat';
        image.height = 500;
        info.insertAdjacentElement('beforeend', image);
        info.insertAdjacentHTML('beforeend', `<h2>${selectedCat.name}</h2>`);
        info.insertAdjacentHTML(
          'beforeend',
          `<p><b>Description:</b> ${selectedCat.description}</p>`
        );
        info.insertAdjacentHTML(
          'beforeend',
          `<p><b>Temperament:</b> ${selectedCat.temperament}</p>`
        );
        hideLoading();
      })
      .catch(error => {
        hideLoading();
        showError();
        console.error(error);
      });
  }
});
