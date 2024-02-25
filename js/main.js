// Function to add a task to the todo list and localStorage
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        const taskItem = document.createElement("div");
        taskItem.classList.add(
            "flex",
            "items-center",
            "px-4",
            "py-2",
            "border-b"
        );
        taskItem.innerHTML = `
            <input type="checkbox" class="mr-2 w-4 h-4">
            <p class="task-item flex-grow">${taskText}</p>
            <button class="delete-btn text-red-500">Delete</button>
        `;
        todoList.appendChild(taskItem);
        todoInput.value = "";

        // Store task in localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Event listener for "ADD" button
addTaskBtn.addEventListener("click", addTask);

function deleteTask(taskItem){
    taskItem.remove()
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskText = taskItem.querySelector("p").textContent;

    const index = tasks.indexOf(taskText);
    if (index !== -1) {
        tasks.splice(index, 1);
    }

    // Store the updated tasks back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

todoList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON" && event.target.classList.contains("delete-btn")) {
        const taskItem = event.target.parentNode;
        deleteTask(taskItem);
    }
});

// Function to load tasks from local storage 
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(taskText) {
        const taskItem = document.createElement("div");
        taskItem.classList.add(
            "flex",
            "items-center",
            "px-4",
            "py-2",
            "border-b"
        );
        taskItem.innerHTML = `
            <input type="checkbox" class="mr-2 w-4 h-4">
            <p class="task-item flex-grow">${taskText}</p>
            <button  class="delete-btn text-red-500">Delete</button>
        `;
        todoList.appendChild(taskItem);
    });
}

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function deleteAllTasks() {
    localStorage.removeItem("tasks");
    todoList.innerHTML = "";
    loadTasks();

}

clearTasksBtn.addEventListener("click", deleteAllTasks);
