// server/routes/character.js
const express = require('express');
const axios = require('axios');
const db = require('../config/database');
const router = express.Router();

const openaiApiKey = 'YOUR_OPENAI_API_KEY';

router.post('/generate-character', async (req, res) => {
  try {
    const chatResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a creative assistant.' },
        { role: 'user', content: 'Create a fictional character.' }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const characterInfo = chatResponse.data.choices[0].message.content;

    const imageResponse = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt: 'a young man named John Doe, 25 years old, software engineer, with a friendly smile and casual attire',
      n: 1,
      size: '512x512'
    }, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const imageUrl = imageResponse.data.data[0].url;

    const query = 'INSERT INTO characters (info, image_url) VALUES (?, ?)';
    db.query(query, [characterInfo, imageUrl], (err, result) => {
      if (err) throw err;
      res.json({ characterInfo, imageUrl });
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
