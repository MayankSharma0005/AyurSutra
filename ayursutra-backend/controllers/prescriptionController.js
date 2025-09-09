const Prescription = require('../models/Prescription');

exports.uploadPrescription = async (req, res) => {
  try {
    // req.file.path gives local file path (use S3 for production)
    const p = await Prescription.create({
      patient: req.body.patientId,
      doctor: req.user.id,
      medicines: JSON.parse(req.body.medicines || '[]'),
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null
    });
    res.json(p);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
