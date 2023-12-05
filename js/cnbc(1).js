const url = 'https://www.cnbc.com';
const proxyUrl = `https://proxy.cors.sh/${url}`
/*
console.log(proxyUrl)

fetch(proxyUrl)
    .then(response => response.text())
    .then(html => {
        console.log(html);
});
*/
fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const marketCardContainer = doc.querySelector('.MarketsBanner-marketData');
        console.log(marketCardContainer);
    })
    .catch(error => {
        console.log("There was an error:", error);
    });
