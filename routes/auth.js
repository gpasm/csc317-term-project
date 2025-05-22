const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../data/db');

// Registration Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  const existingUser = await db.getUserByUsername(username);
  if (existingUser) {
    return res.status(400).render('register', { error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.createUser(username, hashedPassword);
  res.redirect('/login');
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await db.getUserByUsername(username);
  if (!user) {
    return res.status(400).render('login', { error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render('login', { error: 'Invalid credentials' });
  }

  req.session.userId = user.id;
  res.redirect('/index');
});

// Logout Route
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Require Login Middleware
function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

// Export both the routes and the middleware
module.exports = { router, requireLogin };
