import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';


export class SearchPhotos {

    #page = 1;
    #searchQuery = '';
    #totalPages = 0;
    #perPage = 40;
    #params = {
     params: {
      key: '30781806-3b92b5450cc5990729c443812',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: this.#page,
      
      }
    }

    async getPhotos() {
        const urlAXIOS = `/?q=${this.#searchQuery}&page=${this.#page}}`;

        const { data } = await axios.get(urlAXIOS, this.#params);

        return data;
                

        


    }

    
        set searchQuery(newSearchQuery) {
            this.#searchQuery = newSearchQuery;
        }

        get searchQuery() {
            return this.#searchQuery;
        }

        incrementPage() {
            this.#page += 1;
          }

          calculateTotalPages(total) {
            this.#totalPages = Math.ceil(total / this.#perPage);
          }  

        get isShowLoadMore() {
            return this.#page < this.#totalPages;
          }

        resetPage() {
            this.#page = 1;
          }


    }




