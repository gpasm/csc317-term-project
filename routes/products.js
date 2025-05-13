const express = require('express');
const router = express.Router();
const db = require('../data/db');



router.get('/', (req, res) => {
    db.all("SELECT * FROM products", (err, rows) => {
        if (err) {
            console.log("Error fetching products:", err.message);
            return res.send("Error fetching products");
        }
        
        res.render('product', { products: rows });
    });
});




router.get('/:id',(req,res)=>{
    const productid=req.params.id;
    db.get("SELECT * FROM products WHERE id=?",[productid], (err, rows) => {
        if (err){
            console.log("Error fetching Products",err.message);
            return res.send("Theres been an Error");
        }
        res.render('product-detail',{product:rows});
        });
});
module.exports = router;

