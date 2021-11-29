const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d9e2eda26ce9d82015a9827acd6e64c3&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d9e2eda26ce9d82015a9827acd6e64c3&query='

const main = document.getElementById('main')  //IMMUTABLE

const form = document.getElementById('form')

const search = document.getElementById('search')

//Function To get All Movies

getMovies(API_URL)

async function getMovies(x) {
    const res = await fetch(x);  //RESPONSE (res)
    const data = await res.json();

    // console.log(data)

    showMovies(data.results)

}

function showMovies(movies) {
    //render

    main.innerHTML = '';

    movies.forEach((movie) => {

        const {title, poster_path, vote_average, overview } = movie 

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML =
         `
                <img src="${IMG_PATH + poster_path} ">
                <div class="movie-info">
                   <h3>${title}</h3>
                   <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>

                <div class="overview">
                   <h3>Overview</h3>
                   <p>${overview}</p>
                </div>
        `

        main.appendChild(movieEl)
        
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >=5) {
        return 'orange'
    } else {
        return 'red'
    }
}

//Search 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

    }
})