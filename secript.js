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

// إعداد الـ Modal
const modal = document.getElementById("loginModal");
const googleLoginBtn = document.getElementById("googleLoginBtn");
const closeModal = document.getElementById("closeModal");
const loginWithEmail = document.getElementById("loginWithEmail");

// فتح نافذة الـ Modal
googleLoginBtn.onclick = () => {
  modal.style.display = "block";
};

// غلق نافذة الـ Modal
closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Google Login API
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  alert("Login Successful! Token: " + response.credential);
}

// إعداد Google Client ID
// تهيئة Google Identity Services
google.accounts.id.initialize({
  client_id: "1072787701159-0mtjiarec329rqrmmfabttv9qe8b4vaj.apps.googleusercontent.com", // حط Client ID الخاص بك هنا
  callback: handleCredentialResponse // الدالة إلي تعالج بيانات تسجيل الدخول
});

// عند الضغط على الزر يظهر نافذة اختيار الحساب
document.getElementById("loginWithEmail").onclick = () => {
  google.accounts.id.prompt(); // نافذة تسجيل الدخول
};

// دالة معالجة البيانات بعد اختيار الحساب
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);

  // فك تشفير الـ JWT Token لعرض البيانات
  const userDetails = decodeJwt(response.credential);
  document.getElementById("userDetails").innerHTML = `
    <h3>Welcome, ${userDetails.name}!</h3>
    <p>Email: ${userDetails.email}</p>
    <img src="${userDetails.picture}" alt="Profile Picture" style="border-radius: 50%;"/>
  `;
}

// دالة فك تشفير JWT Token
function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
