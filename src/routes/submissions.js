const express = require('express');
const db = require('../models/database');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Submit an assignment with the middleware authentication of every user that's logging in
router.post('/submissions', authenticateToken, (req, res) => {
  const { assignment_id, content } = req.body;
  const user = req.user;

  db.run(`INSERT INTO submissions (assignment_id, student_id, submission_date, content) VALUES (?, (SELECT id FROM users WHERE username = ?), datetime('now'), ?)`, [assignment_id, user.username, content], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;
