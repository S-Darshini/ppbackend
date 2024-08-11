const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const assignmentRoutes = require('./routes/assignments');
const submissionRoutes = require('./routes/submissions');
const gradingRoutes = require('./routes/grading');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', assignmentRoutes);
app.use('/api', submissionRoutes);
app.use('/api', gradingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
