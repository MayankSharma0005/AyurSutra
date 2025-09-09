const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  therapyType: String,
  date: Date,             // full date-time or separate fields as you prefer
  status: { type: String, enum: ['scheduled','completed','cancelled'], default: 'scheduled' },
  room: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
