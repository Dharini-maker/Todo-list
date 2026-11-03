
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
