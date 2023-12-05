const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

let todos = [];
const TODOS_KEY = "todos"

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}

function deleteTodo(event){
    const li = event.target.parentElement
    todos = todos.filter(todo => todo.id !== parseInt(li.id))
    li.remove()
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}

function paintTodo(newTodoObj){
    const li = document.createElement("li");
    li.id = newTodoObj.id
    const span = document.createElement("span");
    li.appendChild(span);
    const button = document.createElement("button");
    button.innerText = "X"
    button.addEventListener("click", deleteTodo)
    li.appendChild(button);
    span.innerText = newTodoObj.text;
    todoList.appendChild(li);
}

function handleTodoSubmit(event){
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        text: newTodo, 
        id: Date.now(),
    }
    todos.push(newTodoObj)
    paintTodo(newTodoObj);
    saveTodos()
}

todoForm.addEventListener("submit", handleTodoSubmit)

const savedTodos = localStorage.getItem(TODOS_KEY)

if(savedTodos){
    const parsedTodos = JSON.parse(savedTodos)
    todos = parsedTodos
    parsedTodos.forEach(paintTodo)
}