const naverSearch = document.querySelector("#naver-search")
const searchInput = naverSearch.querySelector("input");

function Nsearch(event){
    event.preventDefault()
    const url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${searchInput.value}`;
    window.open(url);
    searchInput.value = ""
}

naverSearch.addEventListener("submit", Nsearch)