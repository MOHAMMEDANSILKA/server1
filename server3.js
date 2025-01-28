const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const students = [
  { id: 1, name: 'ansil', grade: 'A' },
  { id: 2, name: 'kushal', grade: 'B' },
  { id: 3, name: 'rishi', grade: 'C' }
];

app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});