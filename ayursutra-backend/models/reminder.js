// models/Reminder.js
const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  message: { type: String, required: true },
  dateTime: { type: Date, required: true },
  sent: { type: Boolean, default: false }
});

module.exports = mongoose.model('Reminder', reminderSchema);
