// Function to handle the response and update the HTML elements
function getTreasuryYield(ticker) {
    return function(response) {
        var yieldElement = document.getElementById(ticker.toLowerCase() + "-yield");
        var changeElement = document.getElementById(ticker.toLowerCase() + "-change");
        var updatedElement = document.getElementById(ticker.toLowerCase() + "-updated");
        
        // Extract the yield, daily change, and last updated time from the response
        var yieldMatch = response.match(/"last":"(.*?)"/);
        var yieldValue = yieldMatch ? yieldMatch[1] : "N/A";
        yieldElement.innerText = yieldValue;

        var changeMatch = response.match(/"change":"(.*?)",/);
        var changeValue = changeMatch ? changeMatch[1] : "N/A";
        changeElement.innerText = changeValue;
        if (parseFloat(changeValue) >= 0){
            changeElement.setAttribute("class", "plus")
        } else {
            changeElement.setAttribute("class", "minus")
        }

        var updatedMatch = response.match(/"last_timedate":"(.*?)"/);
        var updatedValue = updatedMatch ? updatedMatch[1] : "N/A";
        updatedElement.innerText = updatedValue;
        updatedElement.setAttribute("class", "updated");
        setTimeout(() => updatedElement.removeAttribute("class", "updated"), 1000);
    };
}

function getIndices(ticker) {
    return function(response) {
        var yieldElement = document.getElementById(ticker.toLowerCase() + "-yield");
        var changeElement = document.getElementById(ticker.toLowerCase() + "-change");
        var updatedElement = document.getElementById(ticker.toLowerCase() + "-updated");
        // Extract the yield, daily change, and last updated time from the response
        var yieldMatch = response.match(/"last":"(.*?)"/);
        var yieldValue = yieldMatch ? yieldMatch[1] : "N/A";
        yieldElement.innerText = yieldValue;

        var changeMatch = response.match(/"change_pct":"(.*?)",/);
        var changeValue = changeMatch ? changeMatch[1] : "N/A";
        changeElement.innerText = changeValue;
        if (parseFloat(changeValue) >= 0){
            changeElement.setAttribute("class", "plus")
        } else {
            changeElement.setAttribute("class", "minus")
        }

        var updatedMatch = response.match(/lastTradeTime">Last \| (.*?)</);
        var updatedValue = updatedMatch ? updatedMatch[1] : "N/A";
        updatedElement.innerText = updatedValue;
        updatedElement.setAttribute("class", "updated");
        setTimeout(() => updatedElement.removeAttribute("class", "updated"), 1000);
    };
}


function update() {
    // Fetch the data for each ticker
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
            var tickers = [".IXIC", ".SPX", ".DJI"];
            for (var i = 0; i < tickers.length; i++) {
                var ticker = tickers[i];
        
                fetch(url + ticker)
                    .then(function (response) {
                        return response.text();
                    })
                    .then(getIndices(ticker))
                    .catch(function (error) {
                        console.log("Error:", error);
                    });
            }
        
            var tickers = ["@ND.1", "@SP.1", "@DJ.1"];
        
            for (var i = 0; i < tickers.length; i++) {
                var ticker = tickers[i];
        
                fetch(url + ticker)
                    .then(function (response) {
                        return response.text();
                    })
                    .then(getIndices(ticker))
                    .catch(function (error) {
                        console.log("Error:", error);
                    });
            }
        
            var tickers = ["US10Y", "US2Y", "US3M"];
        
            for (var i = 0; i < tickers.length; i++) {
                var ticker = tickers[i];
        
                fetch(url + ticker)
                    .then(function (response) {
                        return response.text();
                    })
                    .then(getTreasuryYield(ticker))
                    .catch(function (error) {
                        console.log("Error:", error);
                    });
            }
        });
}



update();
var playUpdate = setInterval(update, 60000); 