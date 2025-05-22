const express = require('express');
const router = express.Router();
const { requireLogin } = require('./auth');

router.post('/add', (req, res) => {
    const { id, name, price, image_url } = req.body;

    if(!req.session.cart) {
        req.session.cart = [];
    }

    //Checking if item is already in cart?
    const existingItem = req.session.cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        req.session.cart.push({ id, name, price: parseFloat(price), image_url, quantity: 1 });
    }

    res.redirect(req.get('Referer') || '/product'); //so it can stay on products page

})

router.get('/', requireLogin, (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    res.render('cart', {cart, total });
});

module.exports = router;
