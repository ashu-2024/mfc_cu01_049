document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const searchInput = document.getElementById("searchInput");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks(filter = "") {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            if (task.text.toLowerCase().includes(filter.toLowerCase())) {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span class="${task.completed ? "completed" : ""}" data-id="${task.id}">${task.text}</span>
                    <button class="delete-btn" data-id="${task.id}">X</button>
                `;
                taskList.appendChild(li);
            }
        });
    }

    // Add task
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Task cannot be empty!");
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        renderTasks();
    });

    // Toggle completion or delete task
    taskList.addEventListener("click", function (e) {
        const id = Number(e.target.dataset.id);
        if (e.target.classList.contains("delete-btn")) {
            tasks = tasks.filter(task => task.id !== id);
        } else {
            tasks.forEach(task => {
                if (task.id === id) {
                    task.completed = !task.completed;
                }
            });
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    });

    // Search tasks
    searchInput.addEventListener("input", function () {
        renderTasks(searchInput.value);
    });

    // Load tasks on page load
    renderTasks();
});
