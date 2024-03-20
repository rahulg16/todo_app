// Sample todo items for demonstration
const modal = document.querySelector(".modal");
const addTaskModal = document.querySelector("#addTaskModal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelectorAll(".btn-close");
const finalEditBtn = document.querySelector(".edit-btn");

const titleInput = document.getElementById("editTitle");
const descriptionInput = document.getElementById("textAreaDescription");
const endDateInput = document.getElementById("endDate");

const addTitleInput = document.getElementById("addTitle");
const addDescriptionInput = document.getElementById("textAreaDescriptionAdd");
const addEndDateInput = document.getElementById("endDateAdd");
const finalAddCardBtn = document.querySelector(".addCard-btn");

const addCardBtn = document.getElementById("todo-plusBtn");

const todoList = document.getElementById("todo-list");
const doingList = document.getElementById("doing-list");
const doneList = document.getElementById("done-list");

if (!JSON.parse(localStorage.getItem("myTodoList"))) {
  localStorage.setItem("myTodoList", JSON.stringify([]));
}

// Function to delete a todo
function deleteTodo(id) {
  // todos = todos.filter((todo) => todo.id !== id);
  // renderTodos();
}

// Function to edit a todo
function editTodo(e) {
  let taskID = e.target.dataset.id;
  let title = titleInput.value;
  let description = descriptionInput.value;
  let date = endDateInput.value;
  let latestTodoList = JSON.parse(localStorage.getItem("myTodoList"));

  let modifiedTodos = latestTodoList.map((todo) => {
    if (todo.id == taskID) {
      return {
        ...todo,
        title: title,
        description: description,
        endDate: date,
      };
    } else return todo;
  });

  localStorage.setItem("myTodoList", JSON.stringify(modifiedTodos));

  renderTodos();
  closeModal();
}

function addCard() {
  let title = addTitleInput.value;
  let description = addDescriptionInput.value;
  let date = addEndDateInput.value;
  let latestTodoList = JSON.parse(localStorage.getItem("myTodoList"));

  let todo = {
    id: Date.now(),
    title: title,
    description: description,
    endDate: date,
    status: "todo",
  };

  latestTodoList.push(todo);

  localStorage.setItem("myTodoList", JSON.stringify(latestTodoList));
  renderTodos();
  closeModal();
}

// Function to mark a todo as completed
function completeTodo(id) {
  let latestTodoList = JSON.parse(localStorage.getItem("myTodoList"));
  let modifiedTodos = latestTodoList.map((todo) => {
    if (todo.id == id) {
      return {
        ...todo,
        status: "done",
      };
    } else return todo;
  });

  localStorage.setItem("myTodoList", JSON.stringify(modifiedTodos));
  renderTodos();
}

function activeTodo(id) {
  let latestTodoList = JSON.parse(localStorage.getItem("myTodoList"));
  let modifiedTodos = latestTodoList.map((todo) => {
    if (todo.id == id) {
      return {
        ...todo,
        status: "doing",
      };
    } else return todo;
  });

  localStorage.setItem("myTodoList", JSON.stringify(modifiedTodos));
  renderTodos();
}

// close modal function
const closeModal = function () {
  console.log("called");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  addTaskModal.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.forEach((closeBtn) =>
  closeBtn.addEventListener("click", closeModal)
);

overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// open modal function
const openModal = function (e) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  finalEditBtn.dataset.id = e.target.dataset.id;
  let latestTodoList = JSON.parse(localStorage.getItem("myTodoList"));

  let todo = latestTodoList.find((todo) => todo.id == e.target.dataset.id);

  titleInput.value = todo.title;
  descriptionInput.value = todo.description;
  endDateInput.value = todo.endDate;
};

finalEditBtn.addEventListener("click", editTodo);
finalAddCardBtn.addEventListener("click", addCard);

const openAddTaskModal = () => {
  addTaskModal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  addTitleInput.value = "";
  addDescriptionInput.value = "";
  addEndDateInput.value = "";
};

addCardBtn.addEventListener("click", openAddTaskModal);

// Function to render todo items
function renderTodos() {
  todoList.innerHTML = "";
  doingList.innerHTML = "";
  doneList.innerHTML = "";

  let todos = JSON.parse(localStorage.getItem("myTodoList"));

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
      <button class="btn btn-delete" onclick="deleteTodo(${
        todo.id
      })">Delete</button>
      <button class="btn btn-edit" data-id=${todo.id}>Edit</button>
      <button class="btn btn-doing ${
        todo.status == "doing" && "hidden"
      }" onclick="activeTodo(${todo.id})">Move to progress</button>
      <button class="btn btn-complete ${
        todo.status == "done" && "hidden"
      }" onclick="completeTodo(${todo.id})">Complete</button>
    `;
    if (todo.status === "todo") {
      todoList.appendChild(listItem);
    } else if (todo.status === "doing") {
      doingList.appendChild(listItem);
    } else if (todo.status === "done") {
      doneList.appendChild(listItem);
    }
  });

  const editTaskBtn = document.querySelectorAll(".btn-edit");
  editTaskBtn.forEach((el) => el.addEventListener("click", openModal));
}

// Initial rendering of todos
renderTodos();
