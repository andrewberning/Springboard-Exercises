// Part 2
// Now that you have a functioning todo app, save your todos in localStorage! Make sure that when the page refreshes, the todos on the page remain there.

// Get the todo form and todo list by their id's
const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");

// Get todos from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to update localStorage and refresh the list
function updateLocalStorageAndRefresh() {
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  refreshTodoList();
}

// Function to refresh the todo list
function refreshTodoList() {
  todoList.innerHTML = ""; // clears the current todoList

  // forEach method on savedTodos to create li's and buttons
  savedTodos.forEach(todo => {
    // for each "todo" in savedTodos, create an li and give it the innerText of todo.task.
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.task;

    // If todo.isCompleted is true, add "line" to classList of newTodo
    if (todo.isCompleted === true) {
      newTodo.classList.add("line");
    }

    // Create a button and give it the innerText of "Remove"
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";

    // add event listener on remove button(s)
    removeBtn.addEventListener("click", function () {
      // find the index of the task in the savedTodos from the 
      const taskIndex = savedTodos.findIndex(item => item.task === todo.task);
      // If the taskIndex is not -1, splice that task from the savedTodos and call the updateLocalStorageAndRefresh function.
      if (taskIndex !== -1) {
        savedTodos.splice(taskIndex, 1);
        updateLocalStorageAndRefresh();
      }
    });

    // Append the button to the todo and the todo to the todo list
    newTodo.appendChild(removeBtn);
    todoList.appendChild(newTodo);
  })
}

// Listen for form submission
todoForm.addEventListener("submit", function (e) {
  // Prevent the default behavior of a submit event
  e.preventDefault();
  // Get the value of the text from the input in the form
  const todoValue = document.getElementById("todo").value;

  // If it has a value, push it to the savedTodos via an object
  // with the key/value pairs of task to the todoValue and isCompleted to be fasle
  // Reset the form
  if (todoValue) {
    savedTodos.push({ task: todoValue, isCompleted: false });
    updateLocalStorageAndRefresh();
    todoForm.reset();
  }
});

// Listen for click events on the list element
todoList.addEventListener("click", function (e) {
  // Grab the event target and put it into a variable
  const target = e.target;

  // If target has a value, find that todo inside of the savedTodos list.
  // I added "Remove" at the end of the item.task because the innerText of the target was "<todo here>Remove"
  if (target) {
    const todoText = target.innerText; // ex. laundryRemove
    const task = savedTodos.find(item => item.task + "Remove" === todoText);

    // If the targets tagName is "LI", reassign task.isCompleted to !task.Completed
    if (target.tagName === "LI") {
      task.isCompleted = !task.isCompleted;
      updateLocalStorageAndRefresh();
    }
  }
});

// Initial list refresh
refreshTodoList();