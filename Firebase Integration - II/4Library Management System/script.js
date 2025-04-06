const DB_URL = "https://your-project-id.firebaseio.com/books.json"; 

let currentPage = +localStorage.getItem("page") || 1;
let filter = localStorage.getItem("genre") || "";
let sort = localStorage.getItem("sort") || "";
let limit = +localStorage.getItem("limit") || 5;

document.getElementById("genreFilter").value = filter;
document.getElementById("sortBy").value = sort;
document.getElementById("limit").value = limit;

async function fetchBooks() {
  try {
    const res = await fetch(DB_URL);
    const data = await res.json();
    let books = Object.entries(data || {}).map(([id, value]) => ({ id, ...value }));

    if (filter) books = books.filter(b => b.genre === filter);
    if (sort) books.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));

    const start = (currentPage - 1) * limit;
    const paginated = books.slice(start, start + limit);
    renderBooks(paginated);
    document.getElementById("pageNumber").innerText = currentPage;
  } catch (err) {
    document.getElementById("bookList").innerText = "Error fetching data.";
  }
}

function renderBooks(books) {
  const html = `<table><tr><th>Title</th><th>Author</th><th>Genre</th><th>Year</th><th>Available</th></tr>
    ${books.map(book => `<tr><td>${book.title}</td><td>${book.author}</td><td>${book.genre}</td><td>${book.publishedYear}</td><td>${book.available}</td></tr>`).join("")}
    </table>`;
  document.getElementById("bookList").innerHTML = html;
}

async function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const publishedYear = +document.getElementById("year").value;
  const available = document.getElementById("available").checked;

  const newBook = { title, author, genre, publishedYear, available };

  await fetch(DB_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  });

  fetchBooks();
}

function applyFilters() {
  filter = document.getElementById("genreFilter").value;
  sort = document.getElementById("sortBy").value;
  limit = +document.getElementById("limit").value;
  currentPage = 1;

  localStorage.setItem("genre", filter);
  localStorage.setItem("sort", sort);
  localStorage.setItem("limit", limit);
  localStorage.setItem("page", currentPage);

  fetchBooks();
}

function nextPage() {
  currentPage++;
  localStorage.setItem("page", currentPage);
  fetchBooks();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    localStorage.setItem("page", currentPage);
    fetchBooks();
  }
}

fetchBooks();
