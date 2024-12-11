const express = require('express');
const app = express();
const port = 3000;

// بيانات الأفلام (ممكن تكون من قاعدة بيانات)
const movies = [
    { id: 1, title: 'Movie 1', genre: 'Action' },
    { id: 2, title: 'Movie 2', genre: 'Comedy' },
    { id: 3, title: 'Movie 3', genre: 'Drama' }
];

// تقديم بيانات الأفلام عبر API
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// تقديم ملفات الـ static (HTML, CSS, JS)
app.use(express.static('public'));

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

document.getElementById('toggle-button').addEventListener('click', () => {
    const moviesList = document.getElementById('movies-list');

    // تبديل العرض/الإخفاء
    if (moviesList.classList.contains('hidden')) {
        moviesList.classList.remove('hidden');
        moviesList.classList.add('visible');
        fetchMovies();
    } else {
        moviesList.classList.remove('visible');
        moviesList.classList.add('hidden');
    }
});

// جلب بيانات الأفلام من الـ API
function fetchMovies() {
    fetch('/api/movies')
        .then(response => response.json())
        .then(data => {
            const moviesList = document.getElementById('movies-list');
            moviesList.innerHTML = ''; // مسح القائمة الحالية
            data.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = `${movie.title} - ${movie.genre}`;
                moviesList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// Toggle القائمة الرئيسية (ظهور/اختفاء)
document.getElementById('toggle-button').addEventListener('click', () => {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('hidden');
});
