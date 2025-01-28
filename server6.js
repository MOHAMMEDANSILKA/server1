const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Corrected in-memory databases
const students = [{
  id: 1,
  name: "John Doe",
  isActive: true
}];

const classes = [{
  id: 1,
  capacity: 2,
  subject: "Mathematics",
  timing: "10:00 AM - 11:00 AM"
}];

const attendance = [{
  id: 1,
  studentId: 1,
  classId: 1,
  timestamp: new Date().toISOString()
}];

// POST /students - Add new student
app.post('/students', (req, res) => {
  const { name, isActive } = req.body;

  if (!name || typeof isActive !== 'boolean') {
    return res.status(400).json({ message: 'Missing required fields: name, isActive' });
  }

  const newStudent = {
    id: students.length + 1,
    name: name.trim(),
    isActive,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// GET /students - Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// POST /attendance - Mark attendance
app.post('/attendance', (req, res) => {
  const { studentId, classId } = req.body;

  if (!studentId || !classId) {
    return res.status(400).json({ message: 'Missing required fields: studentId, classId' });
  }

  const student = students.find(s => s.id === studentId);
  const classRecord = classes.find(c => c.id === classId);

  if (!student) return res.status(404).json({ message: 'Student not found' });
  if (!classRecord) return res.status(404).json({ message: 'Class not found' });
  if (!student.isActive) return res.status(400).json({ message: 'Inactive students cannot be marked present' });

  const currentAttendance = attendance.filter(a => a.classId === classId).length;
  if (currentAttendance >= classRecord.capacity) {
    return res.status(400).json({ message: 'Class capacity exceeded' });
  }

  const newAttendance = {
    id: attendance.length + 1,
    studentId,
    classId,
    timestamp: new Date().toISOString(),
  };

  attendance.push(newAttendance);
  res.status(201).json(newAttendance);
});

// GET /attendance - Get all attendance records
app.get('/attendance', (req, res) => {
  const enrichedRecords = attendance.map(record => {
    const student = students.find(s => s.id === record.studentId);
    const classInfo = classes.find(c => c.id === record.classId);

    return {
      id: record.id,
      studentName: student ? student.name : 'Unknown',
      className: classInfo ? classInfo.subject : 'Unknown',
      timestamp: record.timestamp
    };
  });

  res.json(enrichedRecords);
});

// POST /classes - Create new class
app.post('/classes', (req, res) => {
  const { capacity, subject, timing } = req.body;

  if (!capacity || !subject || !timing) {
    return res.status(400).json({ message: 'Missing required fields: capacity, subject, timing' });
  }

  if (typeof capacity !== 'number' || capacity <= 0) {
    return res.status(400).json({ message: 'Capacity must be a positive number' });
  }

  const newClass = {
    id: classes.length + 1,
    capacity,
    subject: subject.trim(),
    timing: timing.trim()
  };

  classes.push(newClass);
  res.status(201).json(newClass);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});