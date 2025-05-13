const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
const productRoutes = require('./routes/products');
app.use('/product', productRoutes);
const db = require('./data/db');




const pages = ['index', 'login', 'register',     'user', 'faq', 'about'];


pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.render(page);
    });
});


app.get('/', (req, res) => {
    res.render('index');
});




app.listen(3000, () => console.log('Server running on http://localhost:3000'));
