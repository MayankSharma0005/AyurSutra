const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const appointmentController = require('../controllers/appointmentController');

router.post('/', auth, role(['patient']), appointmentController.createAppointment); // patient books
router.get('/me', auth, appointmentController.getMyAppointments); // patient or doctor
router.get('/', auth, role(['doctor','admin']), appointmentController.getAllAppointments);
router.put('/:id/status', auth, role(['doctor']), appointmentController.updateStatus);

module.exports = router;
