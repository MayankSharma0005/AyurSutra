const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Patient', 'Revenue', 'Therapy'],
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', ReportSchema);