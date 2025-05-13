async function getChart(id, g) {
    //const url = `https://fred.stlouisfed.org/graph/fredgraph.png?id=${id}&api_key=${API_KEY}&observation_start=${startDate}&observation_end=${endDate}`;    // CORS error --> proxy 사용
    const url = `https://fred.stlouisfed.org/graph/fredgraph.png?g=${g}&api_key=${API_KEY}`;    // CORS error --> proxy 사용
    
    //const proxyUrl = `https://proxy.cors.sh/${url}`; //proxy 1 
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`; //proxy 2
    const response = await fetch(proxyUrl);
    const chartData = await response.blob();
    console.log(url)
    return chartData;
  }
  
async function drawChart(Ticker, g) {
    const chart = await getChart(Ticker, g);
    // create an img element
    const chartImage = document.createElement("img");
    // create a URL for the chart data
    const chartUrl = URL.createObjectURL(chart);
    // set the src attribute to the chart URL
    chartImage.src = chartUrl;
    // append the img element to the body of the page
    const anchor = document.createElement("a");
    anchor.href = `https://fred.stlouisfed.org/graph/?g=${g}`;
    anchor.target="_blank";
    anchor.rel="noreferrer noopener";
    divInvesting.appendChild(anchor);
    anchor.appendChild(chartImage);
    const br = document.createElement("br")
    divInvesting.appendChild(br);
  }
  
const API_KEY = "f4bb5d0067efc4b11f1fd95ea83d99ea";
const divInvesting = document.getElementById("investing")

async function start() {
  await drawChart("NASDAQ100", "16loa");
  await drawChart("CLI+BEI10", "16loz");
  await drawChart("Unemployment+Sahm", "1HNQK");
  a = document.createElement("a");
  a.href = "https://cors-anywhere.herokuapp.com/corsdemo";
  a.target="_blank";
  a.rel="noreferrer noopener";
  a.innerText = "Proxy Access";
  divInvesting.appendChild(a);
}

start()


//drawChart("SP500", startDate, endDate)
//drawChart("DGS10", startDate, endDate)
//drawChart("DGS2", startDate, endDate)
//drawChart("T10Y2Y", startDate, endDate)


/*
const timeFrom = document.getElementById("timeFrom");
const timeTo = document.getElementById("timeTo");

// 오늘 날짜 가져오기
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const paddedMonth = month.toString().padStart(2, "0");
const paddedDay = day.toString().padStart(2, "0");
const dateString = `${year}-${paddedMonth}-${paddedDay}`;


timeTo.defaultValue = dateString

let startDate = "2020-01-01"
let endDate = "2023-01-03"
*/
