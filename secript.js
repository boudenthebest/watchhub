const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// إعداد الجلسات
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// إعداد Google OAuth
passport.use(new GoogleStrategy({
    clientID: '1072787701159-0mtjiarec329rqrmmfabttv9qe8b4vaj.apps.googleusercontent.com',       // حط الـ Client ID متاعك
    clientSecret: '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', // حط الـ Client Secret متاعك
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// تخزين معلومات المستخدم
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Login Page</h1><a href="/auth/google">Login with Google</a>');
});

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.send(`Hello ${req.user.displayName}, Logged in with Google!`);
    }
);

// تشغيل السيرفر
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
