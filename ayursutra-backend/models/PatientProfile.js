const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: Number,
  gender: String,
  allergies: [String],
  conditions: [String],
  address: String,
  notes: String
});

module.exports = mongoose.model('PatientProfile', profileSchema);
