const API_URL = "https://mockapi.io/tasks"; // replace with your real mockapi URL
const taskList = document.getElementById("taskList");

const modal = document.getElementById("editModal");
const closeBtn = document.querySelector(".close");
const editForm = document.getElementById("editForm");
const editTitle = document.getElementById("editTitle");
const editStatus = document.getElementById("editStatus");

let currentEditId = null;

// Fetch and display tasks
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    alert("Failed to load tasks.");
  }
}

// Render tasks
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerHTML = `<strong>${task.title}</strong> - ${task.status}`;
    li.appendChild(span);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.onclick = () => openEditModal(task);
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = () => deleteTask(task.id);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Delete task
async function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchTasks();
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      alert("Error deleting task.");
    }
  }
}

// Open edit modal
function openEditModal(task) {
  currentEditId = task.id;
  editTitle.value = task.title;
  editStatus.value = task.status;
  modal.style.display = "block";
}

// Handle edit form
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_URL}/${currentEditId}`, {
      method: "PATCH", // or PUT
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: editTitle.value,
        status: editStatus.value
      })
    });

    if (res.ok) {
      modal.style.display = "none";
      fetchTasks();
    } else {
      throw new Error("Update failed");
    }
  } catch (err) {
    alert("Error updating task.");
  }
});

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Initialize
fetchTasks();
