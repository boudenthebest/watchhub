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

// Toggle عرض القائمة الرئيسية (ظهور/اختفاء)
document.getElementById('toggle-button').addEventListener('click', () => {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('hidden');
});

// Toggle عرض الأفلام
document.getElementById('toggle-button-movies').addEventListener('click', () => {
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

const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const bodyParser = require('body-parser');

const app = express();
const CLIENT_ID = '1072787701159-0mtjiarec329rqrmmfabttv9qe8b4vaj.apps.googleusercontent.com';  // استبدلها بـ Client ID الخاص بك
const client = new OAuth2Client(CLIENT_ID);

app.use(bodyParser.json());

app.post('/auth/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // تأكد من أن الـ Client ID هو نفسه في الواجهة الخلفية
        });
        const payload = ticket.getPayload();
        const userId = payload['sub'];
        console.log(payload);

        // يمكنك الآن تخزين بيانات المستخدم في قاعدة البيانات
        res.json({ success: true, user: payload });
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
