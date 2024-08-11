const express = require('express');
const db = require('../models/database');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Grade submission
router.post('/grades', authenticateToken, (req, res) => {
  const { submission_id, score, feedback } = req.body;
  const user = req.user;

  db.run(`INSERT INTO grades (submission_id, teacher_id, score, feedback) VALUES (?, (SELECT id FROM users WHERE username = ?), ?, ?)`, [submission_id, user.username, score, feedback], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// Get student reports
router.get('/reports/:student_id', authenticateToken, (req, res) => {
  const { student_id } = req.params;

  db.all(`
    SELECT a.title, s.submission_date, g.score, g.feedback
    FROM assignments a
    JOIN submissions s ON a.id = s.assignment_id
    LEFT JOIN grades g ON s.id = g.submission_id
    WHERE s.student_id = ?`, [student_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
