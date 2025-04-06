const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

let start = 0;
const limit = 10;
let isLoading = false;

// Function to fetch photos from API
async function fetchPhotos(start, limit) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    loader.innerText = "Error loading data.";
    console.error(error);
    return [];
  }
}

// Function to display images in gallery
function displayPhotos(photos) {
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.thumbnailUrl;
    img.alt = photo.title;
    gallery.appendChild(img);
  });
}

// Load more photos when scrolled near bottom
async function loadMore() {
  if (isLoading) return;

  isLoading = true;
  loader.style.display = 'block';

  const photos = await fetchPhotos(start, limit);
  displayPhotos(photos);

  start += limit;
  isLoading = false;
  loader.style.display = 'none';
}

// Listen for scroll to bottom
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMore();
  }
});

// Initial load
loadMore();