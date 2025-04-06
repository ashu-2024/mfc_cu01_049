const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const novelsRef = db.collection('novels');
  
  const novelTable = document.getElementById('novelTable');
  const searchInput = document.getElementById('searchInput');
  const yearFilter = document.getElementById('yearFilter');
  const sortPrice = document.getElementById('sortPrice');
  
  function renderTable(docs) {
    novelTable.innerHTML = '';
    docs.forEach(doc => {
      const novel = doc.data();
      const row = `<tr>
        <td>${novel.title}</td>
        <td>${novel.author}</td>
        <td>$${novel.price.toFixed(2)}</td>
        <td>${novel.release_year}</td>
        <td>${novel.genre}</td>
      </tr>`;
      novelTable.innerHTML += row;
    });
  }
  
  function fetchNovels() {
    let query = novelsRef;
  
    const searchValue = searchInput.value.toLowerCase();
    const year = yearFilter.value;
    const sort = sortPrice.value;
  
    if (year) {
      query = query.where('release_year', '==', parseInt(year));
    }
  
    if (sort) {
      query = query.orderBy('price', sort);
    }
  
    query.get().then(snapshot => {
      let results = snapshot.docs;
  
      if (searchValue) {
        results = results.filter(doc => {
          const { title, author } = doc.data();
          return title.toLowerCase().includes(searchValue) || author.toLowerCase().includes(searchValue);
        });
      }
  
      renderTable(results);
    }).catch(err => {
      novelTable.innerHTML = `<tr><td colspan="5">Error loading novels: ${err.message}</td></tr>`;
    });
  }
  
  searchInput.addEventListener('input', fetchNovels);
  yearFilter.addEventListener('change', fetchNovels);
  sortPrice.addEventListener('change', fetchNovels);
  
  window.onload = fetchNovels;
  