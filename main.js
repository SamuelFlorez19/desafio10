import './style.css'

async function getChiste() {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    const jokeElement = document.getElementById('chiste');
    jokeElement.textContent = data.joke;
  } catch (error) {
    console.error('Error:', error);
    const jokeElement = document.getElementById('chiste');
    jokeElement.textContent = 'No se pudo obtener el chiste. Intente nuevamente.';
  }
}

getChiste();

/* ------------------------------------------------------------------------------------------------ */

async function getPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    const postListElement = document.getElementById('post-list');

    posts.forEach(post => {
      const postElement = document.createElement('li');
      postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body.substring(0, 100)}...</p>
        <a href="post-detail.html?id=${post.id}">Read more</a>
      `;
      postListElement.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error:', error);
    const postListElement = document.getElementById('post-list');
    postListElement.innerHTML = '<li>Error loading posts. Try again later.</li>';
  }
}

getPosts();


/* ------------------------------------------------------------------------------------------------ */

/*     const apiKey = 'b8bf895';
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const movieListElement = document.getElementById('movie-list');
    
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        try {
          const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`);
          const data = await response.json();
        } catch (error) {
          console.error('Error:', error);
          movieListElement.innerHTML = '<p>Error searching for movies. Try again later.</p>';
        }
      }
    }); */


    const apiKey = '29ad0a47';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const movieHTML = `
                <div class="movie">
                    <img src="${data.Poster}" alt="${data.Title}">
                    <h2 class="title">${data.Title}</h2>
                    <p class="year">${data.Year}</p>
                </div>
            `;
            resultsContainer.innerHTML = movieHTML;
        } catch (error) {
            console.error(error);
            resultsContainer.innerHTML = '<p>Error al cargar la película</p>';
        }
    }
});



/* ------------------------------------------------------------------------------------------------ */


const apiKey1 = 'CCEA39VaFMH4XhiWJF0m28QnptwKxxn51F8cq2jiF4I';
const searchForm1 = document.getElementById('search-form1');
const searchInput1 = document.getElementById('search-input1');
const imageGallery1 = document.getElementById('image-gallery1');

searchForm1.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchTerm = searchInput1.value.trim();
  if (searchTerm) {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${apiKey1}`);
      const data = await response.json();
      const images = data.results;
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const imageUrl = randomImage.urls.regular;
      const image = await fetch(imageUrl);
      const imageBuffer = await image.arrayBuffer();
      const imageData = new Uint8Array(imageBuffer);
      // Create an image element and append it to the gallery
      const img = document.createElement('img');
      img.src = URL.createObjectURL(new Blob([imageData], { type: 'image/jpeg' }));
      imageGallery1.appendChild(img);
    } catch (error) {
      console.error(error);
    }
  }
});
