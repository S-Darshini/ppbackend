const express = require('express');
const db = require('../models/database');
const authenticateToken = require('../middleware/authenticateToken');
const validateAssignmentOwnership = require('../middleware/validateAssignmentOwnership');

const router = express.Router();

// Create a new assignment
router.post('/assignments', authenticateToken, (req, res) => {
  const { title, description, due_date } = req.body;
  const user = req.user;

  db.run(`INSERT INTO assignments (title, description, due_date, created_by) VALUES (?, ?, ?, ?)`, [title, description, due_date, user.username], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// Get all assignments with filtering and sorting
router.get('/assignments', authenticateToken, (req, res) => {
  const { filter, sort } = req.query; // e.g., ?filter=due_date&sort=asc

  let query = `SELECT * FROM assignments`;
  if (filter) {
    query += ` ORDER BY ${filter}`;
    if (sort) {
      query += ` ${sort}`;
    }
  }

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update an assignment(Additional middleware ensuring the creator of assignment should only amend it)
router.put('/assignments/:id', authenticateToken, validateAssignmentOwnership, (req, res) => {
  const { title, description, due_date } = req.body;
  const { id } = req.params;

  db.run(`UPDATE assignments SET title = ?, description = ?, due_date = ? WHERE id = ?`, [title, description, due_date, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// Delete an assignment(Additional middleware ensuring the creator of assignment should only delete it)
router.delete('/assignments/:id', authenticateToken, validateAssignmentOwnership, (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM assignments WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

module.exports = router;
