const express = require('express');
const router = express.Router();
const { db } = require('../data/db');

router.get('/', (req, res) => {
    const search = req.query.search || '';                    // search bar
    let query = "SELECT * FROM products";
    let params = [];

    if (search) {
        query += " WHERE name LIKE ? OR description LIKE ?";
        const keyword = `%${search.toLowerCase()}%`;
        params.push(keyword, keyword);
    }

    console.log("Running query:", query, params);

    // db.all("SELECT * FROM products", (err, rows) => { //original code, edited below
    db.all(query, params, (err, rows) => {
        if (err) {
            console.log("Error fetching products:", err.message);
            return res.send("Error fetching products");
        }

        res.render('product', { products: rows, search, successId: req.query.success });  //added search
    });
});

router.get('/:id', (req, res) => {
    const productid = req.params.id;
    db.get("SELECT * FROM products WHERE id=?", [productid], (err, rows) => {
        if (err) {
            console.log("Error fetching products:", err.message);
            return res.send("There's been an Error");
        }
        res.render('product-detail', {
            product: rows,
            search: ''
        });
    });
});



module.exports = router;

