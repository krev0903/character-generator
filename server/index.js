// server/index.js
const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQLデータベース接続設定
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

// Middleware
app.use(express.json());

// ルートハンドラー
app.get('/', (req, res) => {
  res.send('Welcome to the Character Generator API');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
