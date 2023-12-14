import axios, { Axios } from 'axios';

const selector = document.querySelector('.breed-select');
const loadingTxt = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
const info = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_WRWXKlnRixSzsHICcWS6Pn9tmnRdWr3I3QkTBEOi29hGwjbPJIswGEFXh1JSeUoD';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios
    .get('/breeds')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      showError();
    });
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
  })
  .catch(showError);

// za wiele kombinowania

// function findCats(catID, thing, catData) {
//   const foundCat = catData.find(breed => breed.id === catID);
//   if (foundCat) {
//     return foundCat[thing];
//   }
//   return '';
// }

selector.addEventListener('change', event => {
  showLoading();
  hideError();
  info.innerHTML = '';
  const catID = event.target.value;
  // console.log(catID);

  fetchBreeds()
    .then(data => {
      // console.log(data.find(breed => breed.id === catID));

      // tak jest zdecydowanie prościej
      const selectedCat = data.find(breed => breed.id === catID);

      const image = document.createElement('img');
      image.src = data.find(breed => breed.id === catID).image.url;
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
});

// fetchBreeds().then(data => {
//   data.map(breed => {
//     console.log(breed.id);
//     console.log(breed.name);
//     console.log(breed.description);
//     console.log(breed.image.url);
//     const image = document.createElement('img');
//     image.src = breed.image.url;
//     image.alt = 'This is a image of a cat';
//     image.width = 300;
//     image.height = 200;
//     info.insertAdjacentElement('beforeend', image);
//   });
// });
