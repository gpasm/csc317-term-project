const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});