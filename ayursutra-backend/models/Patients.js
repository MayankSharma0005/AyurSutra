const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  contact: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  address: {
    type: String,
  },
  medicalHistory: {
    type: String,
  },
  lastVisit: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'In Treatment'],
    default: 'Active',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Patient', PatientSchema);