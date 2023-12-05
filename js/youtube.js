const iframeYoutube = document.getElementById("youtube");

const musicForm = document.getElementById("music-link");
const musicInput = musicForm.querySelector("input");
const musicList = document.getElementById("music-list");


let Musics = [];
const MusicS_KEY = "Musics"

function saveMusics(){
    localStorage.setItem(MusicS_KEY, JSON.stringify(Musics))
}

function deleteMusic(event){
    const li = event.target.parentElement
    Musics = Musics.filter(Music => Music.id !== parseInt(li.id))
    li.remove()
    localStorage.setItem(MusicS_KEY, JSON.stringify(Musics))
}

function paintMusic(newMusicObj){
    const li = document.createElement("li");
    li.id = newMusicObj.id
    const span = document.createElement("span");
    li.appendChild(span);
    const button = document.createElement("button");
    button.innerText = "X"
    button.addEventListener("click", deleteMusic)
    li.appendChild(button);
    span.innerText = newMusicObj.text;
    musicList.appendChild(li);
}

function handleMusicSubmit(event){
    event.preventDefault();
    var newMusic = musicInput.value;
    var musicCode = newMusic.match(/v=(.*?)&/)[1];
    var newMusicObj = {
        text: newMusic, 
        id: Date.now(),
    }
    iframeYoutube.setAttribute("src", "https://www.youtube.com/embed/" + musicCode);
    Musics = [newMusicObj];
    saveMusics()
    
}

musicForm.addEventListener("submit", handleMusicSubmit)

const savedMusics = localStorage.getItem(MusicS_KEY)

if(savedMusics){
    musicInput.value = savedMusics.match(/text":"(.*?)"/)[1]
    var musicCode = musicInput.value.match(/v=(.*?)&/)[1];
    iframeYoutube.setAttribute("src", "https://www.youtube.com/embed/" + musicCode);

    const parsedMusics = JSON.parse(savedMusics)
    Musics = parsedMusics
    parsedMusics.forEach(paintMusic)
}