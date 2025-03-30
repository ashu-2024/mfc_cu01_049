const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const incompleteCount = document.getElementById('incompleteCount');
const allTasksButton = document.getElementById('allTasks');
const completedTasksButton = document.getElementById('completedTasks');
const incompleteTasksButton = document.getElementById('incompleteTasks');
const sortTasksButton = document.getElementById('sortTasks');

let tasks = [];

// Function to update the task list UI
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';

  let filteredTasks = tasks;
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === 'incomplete') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', toggleTask);

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });

  updateCounters();
}

// Function to add a new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Task cannot be empty!');
    return;
  }

  tasks.push({ id: Date.now(), text, completed: false });
  taskInput.value = '';
  renderTasks();
}

// Function to toggle task completion
function toggleTask(event) {
  const taskId = Number(event.target.parentElement.dataset.id);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(event) {
  const taskId = Number(event.target.parentElement.dataset.id);
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks();
}

// Function to update task counters
function updateCounters() {
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter(task => task.completed).length;
  incompleteCount.textContent = tasks.filter(task => !task.completed).length;
}

// Function to sort tasks alphabetically
function sortTasks() {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  renderTasks();
}

// Event Listeners
addTaskButton.addEventListener('click', addTask);
allTasksButton.addEventListener('click', () => renderTasks('all'));
completedTasksButton.addEventListener('click', () => renderTasks('completed'));
incompleteTasksButton.addEventListener('click', () => renderTasks('incomplete'));
sortTasksButton.addEventListener('click', sortTasks);
