const Patient = require('../models/Patient');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ date: -1 });
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a patient
// @route   POST /api/patients
// @access  Private
exports.addPatient = async (req, res) => {
  const { name, age, gender, contact, address, medicalHistory } = req.body;

  try {
    const newPatient = new Patient({
      name,
      age,
      gender,
      contact,
      address,
      medicalHistory,
    });

    const patient = await newPatient.save();

    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a patient
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res) => {
  const { name, age, gender, contact, address, medicalHistory, status } = req.body;

  // Build patient object
  const patientFields = {};
  if (name) patientFields.name = name;
  if (age) patientFields.age = age;
  if (gender) patientFields.gender = gender;
  if (contact) patientFields.contact = contact;
  if (address) patientFields.address = address;
  if (medicalHistory) patientFields.medicalHistory = medicalHistory;
  if (status) patientFields.status = status;

  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: patientFields },
      { new: true }
    );

    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Private
exports.deletePatient = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    await Patient.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Patient removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};