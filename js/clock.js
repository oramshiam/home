const clock = document.querySelector("h2#clock")

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock()
setInterval(getClock, 1000) // ms 마다 시행
//setTimeout(sayHello, 2000) // ms 후 한번 시행 