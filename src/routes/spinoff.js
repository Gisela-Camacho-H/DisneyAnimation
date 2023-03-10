const express = require('express');
const router = express.Router();

const spinoffController = require('../controllers/spinoff');

router.get('/', spinoffController.getAll);

// Add other routes here

module.exports = router;