let input = document.getElementById("todo-input");
let addBtn = document.getElementById("add-btn");
let list = document.getElementById("todo-list");

// try to load saved todos from localStorage
let saved = localStorage.getItem("todos");
let todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// create a dom node for a todo object and RETURN it
function createNode(todo, index) {
  let li = document.createElement("li");

  // Checkbox to toggle completion
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    // Visual feedback: strike-through when completed
    li.classList.toggle("completed", todo.completed);
    saveTodos();
  });

  let textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  if (todo.completed) {
    li.classList.add("completed");
  }

  // double click the todo text to edit it (attached to the item, not the whole document)
  textSpan.addEventListener("dblclick", () => {
    let newText = prompt("Edit todo", todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodos();
    }
  });

  // Delete button to remove the todo
  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1); // remove from the todos ARRAY
    render();
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);

  return li; // <-- this was missing!
}

// Render the whole todo list from the todos array
function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    list.appendChild(createNode(todo, index));
  });

  // Show an empty-state message when there are no todos
  let emptyMsg = document.querySelector(".empty-msg");
  if (emptyMsg) {
    emptyMsg.style.display = todos.length === 0 ? "block" : "none";
  }
}

function addTodo() {
  let text = input.value.trim();
  if (!text) {
    return;
  }
  todos.push({ text, completed: false });
  input.value = "";
  render();
  saveTodos();
}

addBtn.addEventListener("click", addTodo);

// Show saved todos when the page loads
render();
