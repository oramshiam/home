const todoForm2 = document.getElementById("todo-form2");
const todoInput2 = todoForm2.querySelector("input");
const todoList2 = document.getElementById("todo-list2");

let todos2 = [];
const TODOS_KEY2 = "todos2"

function saveTodos(){
    localStorage.setItem(TODOS_KEY2, JSON.stringify(todos2))
}

function deleteTodo(event){
    const li = event.target.parentElement
    todos2 = todos2.filter(todo => todo.id !== parseInt(li.id))
    li.remove()
    localStorage.setItem(TODOS_KEY2, JSON.stringify(todos2))
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
    todoList2.appendChild(li);
}

function handleTodoSubmit(event){
    event.preventDefault();
    const newTodo = todoInput2.value;
    todoInput2.value = "";
    const newTodoObj = {
        text: newTodo, 
        id: Date.now(),
    }
    todos2.push(newTodoObj)
    paintTodo(newTodoObj);
    saveTodos()
}

todoForm2.addEventListener("submit", handleTodoSubmit)

const savedTodos2 = localStorage.getItem(TODOS_KEY2)

if(savedTodos2){
    const parsedTodos = JSON.parse(savedTodos2)
    todos2 = parsedTodos
    parsedTodos.forEach(paintTodo)
}