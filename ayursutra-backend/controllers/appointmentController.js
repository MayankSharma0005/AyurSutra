const Appointment = require('../models/Appointment');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name')
      .populate('therapy', 'name')
      .populate('therapist', 'name')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get appointments by date
// @route   GET /api/appointments/date/:date
// @access  Private
exports.getAppointmentsByDate = async (req, res) => {
  try {
    const appointments = await Appointment.find({ date: req.params.date })
      .populate('patient', 'name')
      .populate('therapy', 'name')
      .populate('therapist', 'name')
      .sort({ time: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add an appointment
// @route   POST /api/appointments
// @access  Private
exports.addAppointment = async (req, res) => {
  const { patient, therapy, therapist, date, time, notes, room } = req.body;

  try {
    const newAppointment = new Appointment({
      patient,
      therapy,
      therapist,
      date,
      time,
      notes,
      room,
    });

    const appointment = await newAppointment.save();

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
  const { patient, therapy, therapist, date, time, status, notes, room } = req.body;

  // Build appointment object
  const appointmentFields = {};
  if (patient) appointmentFields.patient = patient;
  if (therapy) appointmentFields.therapy = therapy;
  if (therapist) appointmentFields.therapist = therapist;
  if (date) appointmentFields.date = date;
  if (time) appointmentFields.time = time;
  if (status) appointmentFields.status = status;
  if (notes) appointmentFields.notes = notes;
  if (room) appointmentFields.room = room;

  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: appointmentFields },
      { new: true }
    );

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

    await Appointment.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Appointment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};