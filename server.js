const express = require('express');
const session = require('express-session');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Set local variables for use in views
app.use((req, res, next) => {
    res.locals.loggedIn = !!req.session.userId;
    res.locals.username = req.session.username || null;
    next();
});

const productRoutes = require('./routes/products');
app.use('/product', productRoutes);
const { router: authRouter, requireLogin } = require('./routes/auth');
app.use('/auth', authRouter);
const db = require('./data/db');

const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');

app.use('/user', userRoutes);
app.use('/cart', cartRoutes);

const pages = ['index', 'login', 'register', 'faq', 'about'];


pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.render(page);
    });
});


app.get('/', (req, res) => {
    res.render('index');
});




app.listen(3000, () => console.log('Server running on http://localhost:3000'));
