const db = require('../models/database');

function validateAssignmentOwnership(req, res, next) {
  const { id } = req.params;
  const user = req.user; // Assuming req.user is populated by authenticateToken middleware

  db.get('SELECT created_by FROM assignments WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row || row.created_by !== user.username) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  });
}

module.exports = validateAssignmentOwnership;
