const express = require('express');
const router = express.Router();

const erasController = require('../controllers/eras');

router.get('/', erasController.getAll);

// Add other routes here

module.exports = router;