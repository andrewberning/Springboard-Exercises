// JS Todos Exercise
// Part 1
// For this assignment you will be combining your knowledge of DOM access and events to build a todo app!

// As a user, you should be able to:
// Add a new todo(by submitting a form)
// Mark a todo as completed (cross out the text of the todo)
// Remove a todo

const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');


todoForm.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent default

  let newTodo = document.createElement('li'); // create newTodo element
  newTodo.innerText = document.getElementById('todo').value; // change innerText to the value from the input

  let removeBtn = document.createElement('button'); // create remove button
  removeBtn.innerText = 'Remove'; // change innerText of button

  todoList.appendChild(newTodo); // append newTodo to todoList

  newTodo.appendChild(removeBtn); // append remove button to newTodo

  todoForm.reset(); // reset the form
})

todoList.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentElement.remove();
  }

  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('line')
  }
})
