const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory "database"
const classes = [{"capacity": 30,
  "subject": "Mathematics",
  "timing": "10:00 AM - 11:00 AM"},
{capacity: 40,
  subject: "history",
  timing: "11:00 AM - 12:00 PM"},
  {
    capacity: 50,
  subject: "language",
  timing: "9:00 AM - 10:00 AM"
  }
];

// POST /classes - Create a new class record
app.post('/classes', (req, res) => {
  const { capacity, subject, timing } = req.body;

  // Input validation
  if (!capacity || !subject || !timing) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (typeof capacity !== 'number' || capacity <= 0) {
    return res.status(400).json({ message: 'Capacity must be a positive number' });
  }

  // Create a new class object
  const newClass = {
    id: classes.length + 1, // Simple ID generation
    capacity,
    subject: subject.trim(),
    timing: timing.trim(),
  };

  classes.push(newClass); // Save to the "database"

  res.status(201).json(newClass); // Return the created class
});

// GET /classes - Retrieve all class records
app.get('/classes', (req, res) => {
  res.json(classes); // Return all classes
});

// GET /classes/:id - Retrieve a single class by ID
app.get('/classes/:id', (req, res) => {
  const classId = parseInt(req.params.id, 10);
  const classRecord = classes.find((cls) => cls.id === classId);

  if (!classRecord) {
    return res.status(404).json({ message: 'Class not found' });
  }

  res.json(classRecord); // Return the class
});

// PUT /classes/:id - Update a class by ID
app.put('/classes/:id', (req, res) => {
  const classId = parseInt(req.params.id, 10);
  const classRecord = classes.find((cls) => cls.id === classId);

  if (!classRecord) {
    return res.status(404).json({ message: 'Class not found' });
  }

  const { capacity, subject, timing } = req.body;

  // Input validation
  if (capacity && (typeof capacity !== 'number' || capacity <= 0)) {
    return res.status(400).json({ message: 'Capacity must be a positive number' });
  }

  // Update fields if provided
  if (capacity) classRecord.capacity = capacity;
  if (subject) classRecord.subject = subject.trim();
  if (timing) classRecord.timing = timing.trim();

  res.json(classRecord); // Return the updated class
});

// DELETE /classes/:id - Delete a class by ID
app.delete('/classes/:id', (req, res) => {
  const classId = parseInt(req.params.id, 10);
  const classIndex = classes.findIndex((cls) => cls.id === classId);

  if (classIndex === -1) {
    return res.status(404).json({ message: 'Class not found' });
  }

  classes.splice(classIndex, 1); // Remove the class from the array

  res.status(204).send(); // 204 No Content
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
