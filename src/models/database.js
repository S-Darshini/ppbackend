const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../db/sqlite.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    due_date TEXT,
    created_by TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignment_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    submission_date TEXT,
    content TEXT,
    FOREIGN KEY(assignment_id) REFERENCES assignments(id),
    FOREIGN KEY(student_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    submission_id INTEGER NOT NULL,
    teacher_id INTEGER NOT NULL,
    score INTEGER,
    feedback TEXT,
    FOREIGN KEY(submission_id) REFERENCES submissions(id),
    FOREIGN KEY(teacher_id) REFERENCES users(id)
  )`);
});

module.exports = db;
