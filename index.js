const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const path = require('path');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pijarcamp',
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

app.get('/api', (req, res) => {
    const { nama, jumlah } = ["erick", 100]
    const sql = `SELECT * FROM produk`;
    db.query(sql, [nama, jumlah], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'layouts', 'index.html');
    res.sendFile(htmlFilePath);
});

// Create a new record
app.post('/api/create', (req, res) => {
    const { nama, keterangan, harga, jumlah } = req.body;
    const sql = 'INSERT INTO produk (nama, keterangan, harga, jumlah) VALUES (?, ?, ?, ?)';
    db.query(sql, [nama, keterangan, harga, jumlah], (err, result) => {
        if (err) throw err;
        res.send('User created successfully');
    });
});

// Read all records
app.get('/api/read', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update a record
app.put('/api/update/:id', (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE users SET name=?, email=? WHERE id=?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) throw err;
        res.send('User updated successfully');
    });
});

// Delete a record
app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id=?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});