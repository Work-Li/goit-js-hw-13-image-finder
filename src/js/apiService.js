const API_KEY = '24192544-a81042c0a59826e332cc4d72c';
const BASE_URL = 'https://pixabay.com/api';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
      return  fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}&key=${API_KEY}`)
            .then(responce => responce.json())
            .then(data  => {
              this.incrementPage();
              
              return data.hits;
            });
    }   
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }


};
