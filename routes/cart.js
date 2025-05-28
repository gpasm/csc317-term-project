const express = require('express');
const router = express.Router();
const { requireLogin } = require('./auth');

router.post('/add', (req, res) => {
    const { id, name, price, image_url } = req.body;

    if(!req.session.cart) {
        req.session.cart = [];
    }

    
    const existingItem = req.session.cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        req.session.cart.push({ id, name, price: parseFloat(price), image_url, quantity: 1 });
    }

    req.flash('success_msg', `${name} added to cart!`);
    // res.redirect(req.get('Referer') || '/product'); //so it can stay on products page
    res.sendStatus(200);

})

router.get('/', requireLogin, (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    res.render('cart', {cart, total });
});

router.post('/delete', (req, res) => {
    const { id } = req.body;
  
    if (req.session.cart) {
      req.session.cart = req.session.cart.filter(item => item.id !== id);
    }
  
    res.redirect('/cart');
  });
  

module.exports = router;
