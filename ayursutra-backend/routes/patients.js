// routes/patients.js
const express = require('express');
const router = express.Router();

// Get all patients (dummy data for now)
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: "Patient One", age: 30 },
    { id: 2, name: "Patient Two", age: 45 }
  ]);
});

// Add a patient
router.post('/', (req, res) => {
  const { name, age } = req.body;
  res.json({ message: "Patient added successfully", patient: { name, age } });
});

module.exports = router;
