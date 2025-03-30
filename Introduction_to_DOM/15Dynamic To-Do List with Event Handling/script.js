document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Task cannot be empty!");
            return;
        }

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = taskText;

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", () => {
            span.classList.toggle("completed");
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(li);
        });

        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        taskInput.value = "";
    });
});
