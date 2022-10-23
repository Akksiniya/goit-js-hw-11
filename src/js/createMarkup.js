export function createMarkup(photos) {
    return photos.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads 
    }) => {
        
      return `<div class="photo-card">
      <a href="${largeImageURL}"><img
      src="${webformatURL}"
      alt="${tags}"
      loading="lazy"
    /></a>
              <div class="info">
        <p class="info-item">
          <b>Likes <br><span class="info-value">${likes}</span></br></b>
        </p>
        <p class="info-item">
          <b>View <br><span class="info-value">${views}</span></br> </b>
        </p>
        <p class="info-item">
          <b>Comments <br><span class="info-value">${likes}</span></br> </b>
        </p>
        <p class="info-item">
          <b>Downloads <br><span class="info-value">${downloads}</span></br></b>
        </p>
      </div>
    </div>`;
    }
  )
  .join('');

}



