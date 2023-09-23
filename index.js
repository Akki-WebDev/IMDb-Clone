// TMDb API

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const API_URL2 = BASE_URL + '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const searchURL = BASE_URL + '/search/movie?' + API_KEY;

getMovies(API_URL);
getKidMovies(API_URL2);

// function for popular movies
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}

// function for kids movies
function getKidMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showKidMovies(data.results);
    })
}


//  Showing movies on home page
const movie_list = document.getElementById('movies_list');
const main = document.getElementById('main');

function showMovies(data) {

    data.forEach(movie => {
        const { title, poster_path, vote_average, release_date, } = movie;
        const htmlData = ` 
        <div class="movie">
                <img src="${IMG_URL + poster_path}" alt="poster" class="movie_poster">
                <h4 class="movie_name"> ${title} </h4>
                <div class="movie_info">
                    <!-- <p class="genre"> Romantic / Musical </p> -->
                    <span> ${release_date} </span>
                    <span class="movie_rating"> ${vote_average} </span>
                    <i id="fav_icon" onclick="addFavrt()" class="fa-regular fa-bookmark"></i>
                </div>
        </div>`

        movie_list.insertAdjacentHTML('afterbegin', htmlData);
    })
}


//  Searching movies
const inputBox = document.querySelector('.input_box');
const searchBtn = document.getElementById('search_button');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchTerm = inputBox.value;

    if (searchTerm) {
        movie_list.innerHTML = "";
        getMovies(searchURL + '&query=' + searchTerm);
        inputBox.value = '';
    }

})

// Show movies in Kids Section
const fav = document.querySelector('#fav_wrapper');

function showKidMovies(data) {

    data.forEach(movie2 => {
        const { title, poster_path, vote_average, release_date, } = movie2;
        const favData = `
    <div class="fav_list_container">
    <div class="fav_list">
        <img src="${IMG_URL + poster_path}" alt="poster">
        <div class="fav_movie">
            <h5 class="movie_name"> ${title} </h5>
            <p> ${release_date} </p>
        </div>
        <span class="movie_rating"> ${vote_average} </span> 
    </div>

</div>`

        fav.insertAdjacentHTML('beforeend', favData);
    })
}

// Delete favrt movies from list
function delMovie(e) {
    if (e.target.classList.contains('del_movie')) {
        const movieDiv = e.target.closest('.fav_list_container');
        movieDiv.remove();
    }
}
