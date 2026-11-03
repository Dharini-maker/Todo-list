# Ex03 To-Do List using JavaScript
## Date:3.11.2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM
.html
```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Todo Application</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">

        <h1>My Todo List</h1>
        <p class="subtitle">Organize your day, one task at a time!</p>

        <div class="input-section">
            <input type="text" id="taskInput" placeholder="Enter a new task">
            <input type="date" id="taskDate">

            <select id="taskPriority">
                <option value="Low">Low Priority</option>
                <option value="Medium" selected>Medium Priority</option>
                <option value="High">High Priority</option>
            </select>

            <button onclick="addTask()">Add Task</button>
        </div>

        <input type="text" id="searchInput"
               placeholder="Search tasks..."
               oninput="displayTasks()">

        <div class="filters">
            <button onclick="setFilter('All')">All</button>
            <button onclick="setFilter('Pending')">Pending</button>
            <button onclick="setFilter('Completed')">Completed</button>
            <button onclick="clearCompleted()">Clear Completed</button>
        </div>

        <div class="task-stats">
            <span id="totalTasks">Total: 0</span>
            <span id="completedTasks">Completed: 0</span>
            <span id="pendingTasks">Pending: 0</span>
        </div>

        <div id="taskList"></div>

    </div>

    <footer>
        
        <p>Designed and Developed by Dharini S</p>
        <p>Register Number: 212224040072</p>
        
    </footer>

    <script src="script.js"></script>

</body>
</html>
```
.css
```

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f3edff;
    min-height: 100vh;
    padding: 30px 15px;
}

.container {
    max-width: 850px;
    margin: auto;
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(70, 40, 120, 0.15);
}

h1 {
    text-align: center;
    color: #633b9b;
    margin-bottom: 10px;
}

.subtitle {
    text-align: center;
    color: #9578b5;
    margin-bottom: 25px;
}

.input-section {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

input, select {
    padding: 12px;
    border: 1px solid #d5c5ed;
    border-radius: 7px;
    font-size: 14px;
    background: #fcfaff;
}

#taskInput {
    flex: 2;
    min-width: 180px;
}

button {
    padding: 12px 16px;
    border: none;
    border-radius: 7px;
    background: #8054b8;
    color: white;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #59358b;
}

#searchInput {
    width: 100%;
    margin-bottom: 15px;
}

.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.task-stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    background: #eee5fb;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    color: #633b9b;
    font-weight: bold;
}

.task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    background: #faf7ff;
    border-left: 5px solid #9365c5;
    padding: 15px;
    margin-bottom: 12px;
    border-radius: 8px;
}

.task-info {
    flex: 1;
    min-width: 150px;
}

.task-info h3 {
    color: #49305f;
    margin-bottom: 6px;
}

.task-info p {
    color: #806e91;
    font-size: 13px;
    margin-top: 4px;
}

.completed h3 {
    text-decoration: line-through;
    color: #aaa;
}

.priority {
    font-weight: bold;
}

.High {
    color: #e34b68 !important;
}

.Medium {
    color: #dc922b !important;
}

.Low {
    color: #299c67 !important;
}

.task-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
}

.complete-btn {
    background: #43a77a;
}

.complete-btn:hover {
    background: #27845b;
}

.edit-btn {
    background: #e5a044;
}

.edit-btn:hover {
    background: #c78325;
}

.delete-btn {
    background: #e45b70;
}

.delete-btn:hover {
    background: #c93c54;
}

.empty {
    text-align: center;
    color: #9578b5;
    padding: 20px;
}

footer {
    background: #59358b;
    color: white;
    text-align: center;
    padding: 25px;
    margin: 30px auto 0;
    max-width: 850px;
    border-radius: 12px;
    line-height: 2;
}

footer h3 {
    color: #f5d6ff;
    margin-bottom: 8px;
}

footer p {
    font-size: 14px;
}

@media (max-width: 600px) {

    .container {
        padding: 20px;
    }

    .input-section {
        flex-direction: column;
    }

    .input-section input,
    .input-section select,
    .input-section button {
        width: 100%;
    }

    .task {
        flex-direction: column;
        align-items: flex-start;
    }

    .task-stats {
        flex-direction: column;
    }
}

```
.js
```

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "All";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let date = document.getElementById("taskDate").value;
    let priority = document.getElementById("taskPriority").value;

    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        name: taskName,
        date: date,
        priority: priority,
        completed: false
    });

    input.value = "";
    document.getElementById("taskDate").value = "";

    saveTasks();
    displayTasks();
}

function displayTasks() {
    let taskList = document.getElementById("taskList");
    let search = document.getElementById("searchInput").value.toLowerCase();

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        let matchesSearch = task.name.toLowerCase().includes(search);

        let matchesFilter =
            currentFilter === "All" ||
            (currentFilter === "Pending" && !task.completed) ||
            (currentFilter === "Completed" && task.completed);

        return matchesSearch && matchesFilter;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<p class="empty">No tasks found!</p>';
    }

    filteredTasks.forEach(task => {
        let div = document.createElement("div");

        div.className = task.completed ? "task completed" : "task";

        div.innerHTML = `
            <div class="task-info">
                <h3>${escapeHTML(task.name)}</h3>
                <p>Date: ${escapeHTML(task.date || "No due date")}</p>
                <p class="priority ${task.priority}">
                    Priority: ${task.priority}
                </p>
                <p>Status: ${task.completed ? "Completed" : "Pending"}</p>
            </div>

            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="edit-btn" onclick="editTask(${task.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(div);
    });

    document.getElementById("totalTasks").textContent =
        "Total: " + tasks.length;

    document.getElementById("completedTasks").textContent =
        "Completed: " + tasks.filter(t => t.completed).length;

    document.getElementById("pendingTasks").textContent =
        "Pending: " + tasks.filter(t => !t.completed).length;
}

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    displayTasks();
}

function editTask(id) {
    let task = tasks.find(task => task.id === id);

    let newName = prompt("Edit your task:", task.name);

    if (newName !== null && newName.trim() !== "") {
        task.name = newName.trim();
        saveTasks();
        displayTasks();
    }
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        displayTasks();
    }
}

function setFilter(filter) {
    currentFilter = filter;
    displayTasks();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    displayTasks();
}

displayTasks();

```
## OUTPUT
![alt text](1.jpg)
![alt text](2.jpg)

## RESULT
The program for creating To-do list using JavaScript is executed successfully.
