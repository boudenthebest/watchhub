// app.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            const moviesList = document.getElementById('movies-list');
            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `<h3>${movie.title}</h3><p>${movie.genre}</p>`;
                moviesList.appendChild(movieElement);
            });
        });
});

function toggleMenu() {
    const menu = document.getElementById("side-menu");
    menu.classList.toggle("open");
}
