const express = require('express');
const router = express.Router();
const { saveContact } = require('../controllers/contactController');

// POST: submit contact form
router.post('/submit', saveContact);

module.exports = router;
