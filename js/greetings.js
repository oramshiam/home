const loginForm = document.querySelector("#login-form"); //Id
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");

const link = document.querySelector("a"); //anchor
const greeting = document.querySelector("#greeting")

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function paintGreetings(username){
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

function onLoginSubmit(event){
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    paintGreetings(username)
};

function onLinkClick(event){
    console.log(event);
};

const localUser = localStorage.getItem(USERNAME_KEY);
if (localUser === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME)
} else {
    paintGreetings(localUser)
}

loginForm.addEventListener("submit", onLoginSubmit);
link.addEventListener("click", onLinkClick);