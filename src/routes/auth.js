const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models/database');

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Mock login route(dummy)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Mock authentication - accepts any username/password(As mentioned in the Assignment)
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '100h' });
  res.json({ token });
});

module.exports = router;
