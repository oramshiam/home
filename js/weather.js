const API_KEY = ""


function onGeoOk(position){
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    console.log(lat, lon)
    const url = `............${API_KEY}`
    fetch(url).then(response => response.json()).then(data => {
        console.log(data.name, data.weather[0].main)
    })
}

function onGeoError(){
    alert("Cannot find location")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)

