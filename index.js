const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const app = express();

app.use(cors());

app.get('/helloworld', (req, res) => {
    res.json({ msg: 'Hello, World!' });
});

app.get('/attractions', (req, res) => {
    pool.query('SELECT * FROM attractions', (error, results, fields) => {
         if (error) {
             console.error(error);
             res.status(500).json({ error: 'Internal Server Error' });
         } else {
             res.json(results);
         }
     });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});