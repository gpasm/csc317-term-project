const express = require('express');
const router = express.Router();
const { requireLogin } = require('./auth');

router.get('/', requireLogin, (req, res) => {
    res.render('user', { username: req.session.username });
});

module.exports = router;
