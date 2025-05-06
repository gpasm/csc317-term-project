const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const pages = ['index', 'login', 'register', 'product', 'user', 'faq', 'about'];

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.render(page);
    });
});

// Home Page
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));