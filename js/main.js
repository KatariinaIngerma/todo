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

        // Create a checkbox element
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("mr-2", "w-4", "h-4");
        taskItem.appendChild(checkbox);

        // Create a paragraph element for task text
        const taskParagraph = document.createElement("p");
        taskParagraph.classList.add("task-item", "flex-grow");
        taskParagraph.textContent = taskText;
        taskItem.appendChild(taskParagraph);

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn", "text-red-500");
        deleteButton.textContent = "Delete";
        taskItem.appendChild(deleteButton);

        todoList.appendChild(taskItem);
        todoInput.value = "";

        // Store task and checkbox state in localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, checked: false }); // Save checkbox state as false initially
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}


// Event listener for "ADD" button
addTaskBtn.addEventListener("click", addTask);

function deleteTask(taskItem){
    taskItem.remove()
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskText = taskItem.querySelector("p").textContent;

    const index = tasks.findIndex(task => task.text === taskText);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    console.log(tasks)
    // Store the updated tasks back to localStorage


}

todoList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON" && event.target.classList.contains("delete-btn")) {
        const taskItem = event.target.parentNode;
        deleteTask(taskItem);
    }
});

function updateTaskState(taskText, checked) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(task => task.text === taskText);
    if (index !== -1) {
        tasks[index].checked = checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Event listener for checkbox change
todoList.addEventListener("change", function(event) {
    if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
        const taskText = event.target.nextElementSibling.textContent;
        const checked = event.target.checked;
        updateTaskState(taskText, checked);
    }
});

// Function to load tasks from local storage 
// Function to load tasks from local storage 
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(tasks)
    tasks.forEach(function(task) {
        const taskItem = document.createElement("div");

        taskItem.classList.add(
            "flex",
            "items-center",
            "px-4",
            "py-2",
            "border-b"
        );

        // Create a checkbox element with appropriate state
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("mr-2", "w-4", "h-4");
        checkbox.checked = task.checked;
        taskItem.appendChild(checkbox);

        // Create a paragraph element for task text
        const taskParagraph = document.createElement("p");
        taskParagraph.classList.add("task-item", "flex-grow");
        taskParagraph.textContent = task.text;
        taskItem.appendChild(taskParagraph);

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn", "text-red-500");
        deleteButton.textContent = "Delete";
        taskItem.appendChild(deleteButton);

        todoList.appendChild(taskItem);

        // Event listener for delete button inside the loadTasks function
        deleteButton.addEventListener("click", function() {
            deleteTask(taskItem);
        });
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
