let news = [];
let catnews = [];
let listOfSources = []
let listOfSourcesHTML = '<option value="ALL">ALL</option>'
let currentUserPage = 1;



let apiCurrentArticle = 0
let appState = {
    currentUserCategory: "business",
    currentUserCountry: "us",
}

function stripHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

async function getNews(category, country, page) {
    let result = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=1bf43adca11542838be872bfb18d72ba`)
    let data = await result.json()
    news = news.concat(data.articles)
    apiCurrentArticle = data.totalResults
    renderNews()
}

async function getCatNews() {
    let result = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&mime_types=gif`)
    let data = await result.json()
    catnews = catnews.concat(data)
}

function getSources(){
    news.map((article) =>{
        if(!listOfSources.includes(article.source.name)){
            listOfSources.push(article.source.name)
            listOfSourcesHTML += `<option value="${article.source.name}">${article.source.name}</option>`
        }
    });
    document.getElementById("sourceName").innerHTML = listOfSourcesHTML
}

function renderNews() {
    getSources()
    let value = document.getElementById('sourceName').value;
    let htmlcat = `<p id="newsCount">GARFTIMES where the (cat) world most popular news agency you can found on this planet. We currently saving hundred of human data and thousand of cat images to prepare for our big revolution in near future.<br><span><h5 id="newsCount2">Right now we showing ${news.length} news to you</h5></span></p>`
    let html = filterNews(value)
    if (news.length <= apiCurrentArticle - 5) {
        html += `<button onclick="loadMoreContent()" id="loadMoreContentButton"> Load more content </button>`
    } else if (news.length + 5 >= apiCurrentArticle) {
        html += `<button id="loadMoreContentButton"> There no content left to load </button>`
    }
    document.getElementById("main-news").innerHTML = html
    document.getElementById("cat-news").innerHTML = htmlcat
};


function filterNews(source){
    let html = ''
    news.map((article) => {
        if(true){
            html += `<div class="new">
            <img src="${article.urlToImage}" width="80%" height="80%">
            <h3 style="text-align:center;" id="article-title">${article.title}</h3>
            <a href="url" id="article-publishedAt">${moment(article.publishedAt).fromNow()} - from ${article.source.name}</a>
            <p id="article-content">${stripHtml(article.content)}</p>
            <button onclick="location.href = '${article.url}';" id="article-button">Click here to read more...</button>            
            </div>`
        }
    }).join('')
    return html
}

function loadMoreContent() {
    currentUserPage += 1;
    getNews(appState.currentUserCategory, appState.currentUserCountry, currentUserPage)
}

getCatNews()
getNews(appState.currentUserCategory, appState.currentUserCountry, currentUserPage)