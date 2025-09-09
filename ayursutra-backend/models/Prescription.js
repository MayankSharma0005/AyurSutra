const mongoose = require('mongoose');
const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medicines: [{ name: String, dose: String, instructions: String }],
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Prescription', prescriptionSchema);
