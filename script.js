document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const imagesContainer = document.querySelector('.images');
  const searchBar = document.querySelector('.search-bar');
  const submitPhotoBtn = document.querySelector('.submit-photo-btn');
  const body = document.querySelector('body'); // Get the body element

  const numberOfImages = 12; // Number of images to fetch

  async function fetchImages(filterValue) {
    imagesContainer.innerHTML = '';

    for (let i = 0; i < numberOfImages; i++) {
      const response = await fetch(`https://source.unsplash.com/random/?${filterValue}`);
      const img = document.createElement('img');
      img.src = response.url;
      img.alt = `Image ${i + 1}`;
      img.classList.add(filterValue);
      imagesContainer.appendChild(img);

      // Add event listener to change body background on hover
      img.addEventListener('mouseenter', function () {
        body.style.backgroundImage = `url('${response.url}')`; // Set body background image
      });

      // Reset body background when mouse leaves image
      img.addEventListener('mouseleave', function () {
        body.style.backgroundImage = ''; // Reset body background image
      });
    }
  }

  fetchImages('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filterValue = this.getAttribute('data-filter');
      fetchImages(filterValue);
    });
  });

  searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = searchBar.value.trim();
        if (query) {
            fetchImages(query);
        }
        searchBar.value = ''; // Clear the search bar text
    }
  });

  submitPhotoBtn.addEventListener('click', function () {
    alert('Working on implementing the "Submit a photo" feature. Stay tuned for its update! Thanks, :)');
  });
});
