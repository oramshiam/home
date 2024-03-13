const WatchForm = document.getElementById("watch-form");
const WatchInput = WatchForm.querySelector("input");
const WatchList = document.getElementById("watch-list");

let Watchs = [];
const WatchS_KEY = "Watchs"

function saveWatchs(){
    localStorage.setItem(WatchS_KEY, JSON.stringify(Watchs))
}

function deleteWatch(event){
    const li = event.target.parentElement
    Watchs = Watchs.filter(Watch => Watch.id !== parseInt(li.id))
    li.remove()
    localStorage.setItem(WatchS_KEY, JSON.stringify(Watchs))
}

function paintWatch(newWatchObj){
    const li = document.createElement("li");
    li.id = newWatchObj.id
    const span = document.createElement("span");
    li.appendChild(span);
    const button = document.createElement("button");
    button.innerText = "X"
    button.addEventListener("click", deleteWatch)
    li.appendChild(button);
    span.innerText = newWatchObj.text;
    WatchList.appendChild(li);
}

function handleWatchSubmit(event){
    event.preventDefault();
    const newWatch = WatchInput.value;
    WatchInput.value = "";
    const newWatchObj = {
        text: newWatch, 
        id: Date.now(),
    }
    Watchs.push(newWatchObj)
    paintWatch(newWatchObj);
    saveWatchs()
}

WatchForm.addEventListener("submit", handleWatchSubmit)

const savedWatchs = localStorage.getItem(WatchS_KEY)

if(savedWatchs){
    const parsedWatchs = JSON.parse(savedWatchs)
    Watchs = parsedWatchs
    parsedWatchs.forEach(paintWatch)
}

var stockTickers = Watchs.map(function(item) {
    return item.text;
  });

function getPrice(ticker) {
    return function(response) {
        var yieldElement = document.getElementById(ticker.toLowerCase() + "-yield");
        var changeElement = document.getElementById(ticker.toLowerCase() + "-change");
        var updatedElement = document.getElementById(ticker.toLowerCase() + "-updated");
        // Extract the yield, daily change, and last updated time from the response
        var yieldMatch = response.match(/"last":"(.*?)"/);
        var yieldValue = yieldMatch ? yieldMatch[1] : "N/A";
        yieldElement.innerText = yieldValue;

        //var changeMatches = response.match(/"change_pct":"(.*?)",/g);

        var changeMatch = response.match(/"change_pct":"(.*?)",/);
        //var changeValue = changeMatches[0].split('"')[3];
        var changeValue = changeMatch ? changeMatch[1] : "N/A";
        //var changeValue = parseFloat(changeTemp).toFixed(2) + "%";
        changeElement.innerText = changeValue;
        if (parseFloat(changeValue) >= 0){
            changeElement.setAttribute("class", "plus")
        } else {
            changeElement.setAttribute("class", "minus")
        }

        var updatedMatch = response.match(/\(<!-- -->(.*?)<!-- -->/);
        //var updatedValue = changeMatches[1].split('"')[3];
        var updatedValue = updatedMatch ? updatedMatch[1] : "N/A";
        //var updatedValue = ((updatedTemp/yieldValue - 1)*100).toFixed(2) + "%";
        updatedElement.innerText = updatedValue;
        updatedElement.setAttribute("class", "updated");
        setTimeout(function() {
            if (parseFloat(updatedValue) >= 0){
                updatedElement.setAttribute("class", "plus");
            } else {
                updatedElement.setAttribute("class", "minus");
            }
        }, 1000);
        }
    };

function update() {
    var url = "https://www.cnbc.com/quotes/";
    fetch(url + ".IXIC")
        .then(function (response) {
            console.log("fetched");
        })
        .catch(function (error) {
            console.log('Error executing cnbc.js:', error);
            url = "https://cors-anywhere.herokuapp.com/https://www.cnbc.com/quotes/";
            console.log("url has changed: "+url);
        })
        .finally(function () {
            var tickers = stockTickers;
            for (var i = 0; i < tickers.length; i++) {
                var ticker = tickers[i];
        
                fetch(url + ticker)
                    .then(function (response) {
                        return response.text();
                    })
                    .then(getPrice(ticker))
                    .catch(function (error) {
                        console.log("Error:", error);
                    });
            }
        });


}


function makeStockTable(stockTickers){
    var priceTable = document.getElementById("priceTable");

    for (var i = 0; i < stockTickers.length; i++) {
        var ticker = stockTickers[i];
        
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var a1 = document.createElement('a');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        a1.innerText = ticker;
        a1.setAttribute("href", "https://seekingalpha.com/symbol/"+ticker);
        a1.setAttribute("target", "_blank");
        td2.id = ticker.toLowerCase() + "-yield";
        td3.id = ticker.toLowerCase() + "-change";
        td4.id = ticker.toLowerCase() + "-updated";
        
        priceTable.appendChild(tr);
        tr.appendChild(td1);
        td1.appendChild(a1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
    }
}

makeStockTable(stockTickers);
update();
var playUpdate = setInterval(update, 60000); 



