// server/config/database.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'character_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

module.exports = db;
