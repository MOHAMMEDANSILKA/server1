const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory "databases"
const classes = [{
    classId:1,
    capacity: 30,
    subject: "Mathematics",
    timing: "10:00 AM - 11:00 AM"},
  {
    classId:1,capacity: 40,
    subject: "history",
    timing: "11:00 AM - 12:00 PM"},
    {
        classId:1,
      capacity: 50,
    subject: "language",
    timing: "9:00 AM - 10:00 AM"
    }];
const students = [{
    studentId:1,
    name: "John Doe",
    isActive: true
  },{
    studentId:2,
    name: "ansil",
    isActive: false
  }];
const attendance = [{
    studentId: 1,
    classId: 1
  }];

// POST /students - Add a new student
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

// GET /students - Retrieve all students
app.get('/students', (req, res) => {
  res.json(students);
});

// POST /attendance - Mark attendance
app.post('/attendance', (req, res) => {
  const { studentId, classId } = req.body;

  if (!studentId || !classId) {
    return res.status(400).json({ message: 'Missing required fields: studentId, classId' });
  }

  const student = students.find((s) => s.id === studentId);
  const classRecord = classes.find((c) => c.id === classId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  if (!student.isActive) {
    return res.status(400).json({ message: 'Attendance cannot be marked for inactive students' });
  }

  if (!classRecord) {
    return res.status(404).json({ message: 'Class not found' });
  }

  const currentAttendance = attendance.filter((a) => a.classId === classId).length;

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

// GET /attendance - Retrieve all attendance records
app.get('/attendance', (req, res) => {
  const enrichedAttendance = attendance.map((record) => {
    const student = students.find((s) => s.id === record.studentId);
    const classRecord = classes.find((c) => c.id === record.classId);

    return {
      id: record.id,
      student: student ? student.name : 'Unknown',
      class: classRecord ? classRecord.subject : 'Unknown',
      timestamp: record.timestamp,
    };
  });

  res.json(enrichedAttendance);
});

// Helper API for creating classes (from Milestone #1)
app.post('/classes', (req, res) => {
  const { capacity, subject, timing } = req.body;

  if (!capacity || !subject || !timing) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (typeof capacity !== 'number' || capacity <= 0) {
    return res.status(400).json({ message: 'Capacity must be a positive number' });
  }

  const newClass = {
    id: classes.length + 1,
    capacity,
    subject: subject.trim(),
    timing: timing.trim(),
  };

  classes.push(newClass);
  res.status(201).json(newClass);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
