// api.js - API Module
const express = require('express');
const connectToDb = require('./DbConnection');
const router = express.Router();

// Add a new student
router.post('/students', async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection('students').insertOne(req.body);
    res.status(201).send({ message: 'Student added successfully', id: result.insertedId });
  } catch (err) {
    res.status(500).send({ error: 'Error adding student', details: err });
  }
});

// Get student by ID
router.get('/students/:id', async (req, res) => {
  try {
    const db = await connectToDb();
    const student = await db.collection('students').findOne({ studentid: parseInt(req.params.id) });
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.send(student);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching student', details: err });
  }
});

// Delete student by ID
router.delete('/students/:id', async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection('students').deleteOne({ studentid: parseInt(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.send({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error deleting student', details: err });
  }
});

// Update student by ID
router.put('/students/:id', async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection('students').updateOne(
      { studentid: parseInt(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.send({ message: 'Student updated successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error updating student', details: err });
  }
});

module.exports = router;
