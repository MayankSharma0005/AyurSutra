const Report = require('../models/Report');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Therapy = require('../models/Therapy');

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Generate patient report
// @route   POST /api/reports/patient
// @access  Private
exports.generatePatientReport = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ date: -1 });
    const reportData = {
      totalPatients: patients.length,
      activePatients: patients.filter(p => p.status === 'Active').length,
      inTreatmentPatients: patients.filter(p => p.status === 'In Treatment').length,
      inactivePatients: patients.filter(p => p.status === 'Inactive').length,
      patients,
    };

    const newReport = new Report({
      type: 'Patient',
      data: reportData,
      generatedBy: req.user.id,
    });

    const report = await newReport.save();

    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Generate revenue report
// @route   POST /api/reports/revenue
// @access  Private
exports.generateRevenueReport = async (req, res) => {
  try {
    // For simplicity, we'll calculate revenue from completed appointments
    const appointments = await Appointment.find({ status: 'Completed' })
      .populate('therapy', 'price');

    let totalRevenue = 0;
    appointments.forEach(appointment => {
      totalRevenue += appointment.therapy.price;
    });

    const reportData = {
      totalRevenue,
      completedAppointments: appointments.length,
      appointments,
    };

    const newReport = new Report({
      type: 'Revenue',
      data: reportData,
      generatedBy: req.user.id,
    });

    const report = await newReport.save();

    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Generate therapy report
// @route   POST /api/reports/therapy
// @access  Private
exports.generateTherapyReport = async (req, res) => {
  try {
    const therapies = await Therapy.find();
    const appointments = await Appointment.find({ status: 'Completed' })
      .populate('therapy');

    // Count appointments per therapy
    const therapyCounts = {};
    therapies.forEach(therapy => {
      therapyCounts[therapy.name] = 0;
    });

    appointments.forEach(appointment => {
      if (appointment.therapy) {
        therapyCounts[appointment.therapy.name] += 1;
      }
    });

    const reportData = {
      therapies,
      therapyCounts,
      appointments,
    };

    const newReport = new Report({
      type: 'Therapy',
      data: reportData,
      generatedBy: req.user.id,
    });

    const report = await newReport.save();

    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};