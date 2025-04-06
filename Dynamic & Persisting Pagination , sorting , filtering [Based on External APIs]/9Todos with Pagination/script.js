const fetchBtn = document.getElementById("fetchBtn");
const todoContainer = document.getElementById("todo-container");
const paginationContainer = document.getElementById("pagination");

let todos = [];
const todosPerPage = 10;

fetchBtn.addEventListener("click", () => {
  fetchTodos();
});

async function fetchTodos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    todos = data;
    renderTodos(1);
    createPagination(Math.ceil(todos.length / todosPerPage));
  } catch (err) {
    console.error("Failed to fetch todos:", err);
  }
}

function renderTodos(pageNumber) {
  todoContainer.innerHTML = "";
  const start = (pageNumber - 1) * todosPerPage;
  const end = start + todosPerPage;
  const pageTodos = todos.slice(start, end);

  pageTodos.forEach(todo => {
    const div = document.createElement("div");
    div.className = "todo-item";

    const label = document.createElement("label");
    label.textContent = todo.title;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    div.append(label, checkbox);
    todoContainer.appendChild(div);
  });
}

function createPagination(pages) {
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      renderTodos(i);
    });
    paginationContainer.appendChild(btn);
  }
}