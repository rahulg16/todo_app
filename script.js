// Sample todo items for demonstration
let todos = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    endDate: "2024-03-20",
    status: "todo",
    enableEdit: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    endDate: "2024-03-21",
    status: "doing",
    enableEdit: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description for Task 3",
    endDate: "2024-03-22",
    status: "done",
    enableEdit: false,
  },
];

// let todos = [];

// Function to render todo items
function renderTodos() {
  const todoList = document.getElementById("todo-list");
  const doingList = document.getElementById("doing-list");
  const doneList = document.getElementById("done-list");

  todoList.innerHTML = "";
  doingList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");
    if (todo.status === "done") {
      listItem.classList.add("completed");
    }
    listItem.innerHTML = `
      <h4>
        ${todo.title}
      </h4>
      <p class="description">
        ${todo.description}
      </p>
      <h4>End Date: ${todo.endDate}</h4>
      <button class="btn btn-delete">Delete</button>
      <button class="btn btn-edit">Edit</button>
      <button class="btn btn-complete">Complete</button>
    `;
    if (todo.status === "todo") {
      todoList.appendChild(listItem);
    } else if (todo.status === "doing") {
      doingList.appendChild(listItem);
    } else if (todo.status === "done") {
      doneList.appendChild(listItem);
    }
  });
}

// Function to delete a todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// Function to edit a todo
function editTodo(id) {
  const todoToEdit = todos.find((todo) => todo.id === id);
  // Implement edit functionality here
}

// Function to mark a todo as completed
function completeTodo(id) {
  const todoToComplete = todos.find((todo) => todo.id === id);
  todoToComplete.status = "done";
  renderTodos();
}

// Initial rendering of todos
renderTodos();
