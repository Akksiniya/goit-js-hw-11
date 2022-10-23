import { Notify } from 'notiflix/build/notiflix-notify-aio';


import { refs } from './js/refs';
import { createMarkup } from './js/createMarkup';
import {SearchPhotos} from './js/searchPhotos';

const search = new SearchPhotos();

console.log(refs);
console.log(refs.gallery);
console.log(refs.searchForm);


const handleSubmit = async (evt) => {
    evt.preventDefault();

    const {
        elements: { searchQuery },
      } = evt.currentTarget;
      const query = searchQuery.value.trim().toLowerCase();
      if (!query) {
        Notify.failure('Enter your request');
        return;
      }

      search.searchQuery = query;
      clearPage();

      try {

      const { hits, totalHits } = await search.getPhotos();
        if (hits.length === 0) {
          onError();
            return;}

      const markup = createMarkup(hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);

        search.calculateTotalPages(totalHits);
        Notify.success(`Hooray! We found ${totalHits} images.`)

        if (search.isShowLoadMore) {
            refs.loadMoreBtn.classList.remove('is-hidden')
        };

        console.log(search);
        
        } catch (error) {
        onError();
        clearPage();
        
      };

      

    };

    const onLoadMore = () =>{
      
        search.incrementPage();

        if (!search.isShowLoadMore) {
            refs.loadMoreBtn.classList.add('is-hidden')
        }

        search.getPhotos()
      .then(({ hits}) => {
        const markup = createMarkup(hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
    })
    .catch = () => {
        onError();
        clearPage();

      };

    };



refs.searchForm.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function clearPage() {
    search.resetPage();
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
  };

const onError = () => {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.', 
    {timeout: 2000
    });

}