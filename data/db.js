const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'website.db'), (err) => {
    if (err) {
        console.log('Failed to connect to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');

        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                price REAL NOT NULL,
                image_url TEXT NOT NULL
            );
        `, (err) => {
            if (err) {
                console.log('Error creating table:', err.message);
            } else {
                console.log('Table created or already exists.');

                
                const products = [
                    { name: 'Green Blouse & Skirt', description: 'A green blouse and skirt set', price: 50.00, image_url: 'https://images.pexels.com/photos/9770969/pexels-photo-9770969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
                    { name: 'Sage Sweater', description: 'A sage green sweater', price: 20.00, image_url: 'https://images.pexels.com/photos/19592493/pexels-photo-19592493/free-photo-of-model-in-a-mint-green-sweatshirt-and-a-golden-mini-skirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
                    { name: 'Navy Set', description: 'A navy blue top and shorts set', price: 60.00, image_url: 'https://images.pexels.com/photos/8050052/pexels-photo-8050052.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load' },
                    { name: 'Pink Long Sleeve', description: 'A pink long sleeve top', price: 15.00, image_url: 'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                    { name: 'Denim Jacket', description: 'Oversized Denim Jacket', price: 50.00, image_url: 'images/pexels-cottonbro-6770908.jpg' },
                    { name: 'White Cube Tank top', description: 'White Cube Tank top', price: 20.00, image_url: 'images/pexels-ogproductionz-17243502.jpg' },
                    { name: 'Black Sleeveless Tubetop', description: 'Black Sleeveless Tubetop ', price: 60.00, image_url: 'images/pexels-ogproductionz-17243567.jpg' },
                    { name: 'Orange Orioles Baseball Jersey', description: 'Orange Orioles Baseball Jersey', price: 15.00, image_url: 'images/pexels-ogproductionz-17243659.jpg' },
                    { name: 'Pink Floyd Longsleeve', description: 'Pink Floyd Longsleeve', price: 50.00, image_url: 'images/pexels-ogproductionz-17244554.jpg' },
                    { name: 'Denim Skirt', description: 'Light Wash Denim Skirt', price: 20.00, image_url: 'images/pexels-ogproductionz-17245477.jpg' },
                    { name: 'Speedracer Jacket', description: 'Black and white Leather Jacket', price: 60.00, image_url: 'images/sp3d.webp' },
                    { name: 'Purple Set', description: 'Light Purple Set', price: 15.00, image_url: 'images/pexels-weezy-mie-276311990-12928822.jpg' }
                ];

                products.forEach(product => {
                    db.run(`
                        INSERT INTO products (name, description, price, image_url) 
                        VALUES (?, ?, ?, ?)`,
                        [product.name, product.description, product.price, product.image_url],
                        function (err) {
                            if (err) {
                                console.log('Error inserting product:', err.message);
                            } else {
                                console.log('Product inserted with ID:', this.lastID);
                            }
                        });
                });
            }
        });
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        `, (err) => {
            if (err) {
                console.log('Error creating users table:', err.message);
            } else {
                console.log('Users table created or already exists.');
            }
        });
    }
});

// Exporting both the database instance and helper functions
module.exports = {
    db,  // Keep the original db reference
    getUserByUsername: function (username) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    createUser: function (username, hashedPassword) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO users (username, password) VALUES (?, ?)`,
                [username, hashedPassword],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID, username });
                });
        });
    }
};
