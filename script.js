// Retrieve tasks from local storage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display tasks
function displayTasks() {
    const completedTasksList = document.getElementById('completedTasksList');
    const incompleteTasksList = document.getElementById('incompleteTasksList');
    
    completedTasksList.innerHTML = '';
    incompleteTasksList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
            <span>${task.date}</span>
            <span>${task.status}</span>
            <span>${task.description}</span>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        if (task.completed) {
            completedTasksList.appendChild(li);
        } else {
            incompleteTasksList.appendChild(li);
        }
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskDescription = document.getElementById('taskDescription');
    const title = taskInput.value.trim();
    const date = taskDate.value;
    const description = taskDescription.value.trim();
    if (title && date) {
        tasks.push({ title, date, description, completed: false, status: 'Incomplete' });
        taskInput.value = '';
        taskDate.value = '';
        taskDescription.value = '';
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Function to toggle task completion status
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    tasks[index].status = tasks[index].completed ? 'Completed' : 'Incomplete';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to edit an existing task
function editTask(index) {
    const newTitle = prompt('Enter new title for the task:', tasks[index].title);
    if (newTitle !== null) {
        tasks[index].title = newTitle.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Event listener for adding a new task
document.getElementById('addTaskBtn').addEventListener('click', addTask);

// Initial display of tasks
displayTasks();
