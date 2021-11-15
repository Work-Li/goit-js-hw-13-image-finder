import './sass/main.scss';
import cardTemplate from './js/templates/card.hbs';
import ApiSrevice from './js/apiService.js';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import * as basicLightbox from 'basiclightbox';



const searchFormEl = document.querySelector('#search-form');
const loadBtnEl = document.querySelector('.btn-load-more');
const galleryEl = document.querySelector('.gallery');
const btnUpEl = document.querySelector('.btn-up');


const imagesApiService = new ApiSrevice();


searchFormEl.addEventListener('submit', onSearch);
loadBtnEl.addEventListener('click', onLoadMore);
galleryEl.addEventListener('click', openBigImage);

function onSearch(event) {
    event.preventDefault();
    clearGallery();
    imagesApiService.query = event.currentTarget.query.value;
    imagesApiService.resetPage();
    
    if (!imagesApiService.query) {
        onError('Please enter a correct request');
        hideLoadMoreBtn();
        return;
    }
    imagesApiService
        .fetchImages()
        .then(images => {
            
            if (!images.length) {
                hideLoadMoreBtn();
                clearGallery();
                onError('No images for this request');}
            appendImagesMarkup(images);
        })
        .catch(error => {
            onError('Sorry, please repeat request')}
        ); 
    addBtnUp(); 
    addLoadMoreBtn();    
}

function onLoadMore() {
    imagesApiService
        .fetchImages()
        .then(images => {
            if(images.length === 0) {
                hideLoadMoreBtn();
                onError("No more images");
            }
            appendImagesMarkup(images)});
    loadBtnEl.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        });

}

function appendImagesMarkup (images) {
    galleryEl.insertAdjacentHTML('beforeend', cardTemplate(images));
}

function clearGallery() {
   galleryEl.innerHTML = '';
  };

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

function openBigImage(event) {
    const instance = basicLightbox.create(`
  <img src=${event.target.dataset.src} width="600" height="400">
`);

 if (event.target.nodeName !== 'IMG') {
     return;
 }
    instance.show();
}
