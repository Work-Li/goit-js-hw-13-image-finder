import './sass/main.scss';
import cardTemplate from './js/templates/card.hbs';
import ApiSrevice from './js/apiService.js';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const searchFormEl = document.querySelector('#search-form');
const loadBtnEl = document.querySelector('.btn-load-more');
const galleryEl = document.querySelector('.gallery');
const btnUpEl = document.querySelector('.btn-up')

const imagesApiService = new ApiSrevice();


searchFormEl.addEventListener('submit', onSearch);
loadBtnEl.addEventListener('click', onLoadMore);

function onSearch(event) {
    event.preventDefault();
    
    imagesApiService.query = event.currentTarget.query.value;
    imagesApiService.resetPage();
    
    if (!imagesApiService.query) {
        onError('Please enter a correct request');

        return;
    }
    imagesApiService.fetchImages()
    .then(images => {
        clearGallery();
        appendImagesMarkup(images);
    })
    .catch(onError('Sorry, please repeat request')); 
    addBtnUp(); 
    addLoadMoreBtn();    
}

function onLoadMore() {
    imagesApiService.fetchImages().
        then(images => {
            // console.log(images);
            appendImagesMarkup(images)});
}

function appendImagesMarkup (images) {
    galleryEl.insertAdjacentHTML('beforeend', cardTemplate(images));
}

function clearGallery() {
    galleryEl.innerHTML = '';
  }

function addBtnUp() {
    btnUpEl.classList.remove('hidden');
    btnUpEl.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
}
function addLoadMoreBtn() {
    loadBtnEl.classList.remove('hidden');
}    

function hideLoadMoreBtn() {
    loadBtnEl.classList.add('hidden');
}


function onError(message) {
    return error({
     text: message,
     title: 'Something went wrong',
     hide: true,
     delay: 2000,
     width: '100vw',
     styling: 'brighttheme',
     closer: false,
     sticker: false,
     icon: null
    
    });
}