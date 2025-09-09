// routes/auth.js
const express = require('express');
const router = express.Router();

// Example login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: add real authentication
  res.json({ message: 'Login API working', email });
});

// Example register route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // TODO: save to DB
  res.json({ message: 'Register API working', name, email });
});

module.exports = router;
