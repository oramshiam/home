const quotes = [
    {
        quotes: "good1", 
        author: "author1"
    }, 
    {
        quotes: "good2", 
        author: "author2"
    }, 
    {
        quotes: "good3", 
        author: "author3"
    }, 
    {
        quotes: "good4", 
        author: "author4"
    }, 
    {
        quotes: "good5", 
        author: "author5"
    }
]

const quote = document.querySelector("#quote span:first-child")
const author = document.querySelector("#quote span:last-child")



const todaysQuote = quotes[Math.floor(Math.random()*quotes.length)]
quote.innerText = todaysQuote["quotes"]
author.innerText = todaysQuote["author"]