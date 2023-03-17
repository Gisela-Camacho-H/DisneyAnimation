const express = require('express');
const router = express.Router();
const app = express();

const spinoffController = require('../controllers/spinoff');
const validation = require('../middleware/validate');

router.get('/', spinoffController .getAllSpinoff);

router.get('/:id', spinoffController .getSingleSpinoff);

router.post('/', validation.saveSpinoff, spinoffController .createSpinoffs);

router.put('/:id', validation.saveSpinoff, spinoffController .updateSpinoffs);

router.delete('/:id', spinoffController .deleteSpinoffs);

// Test Method GET ALL

// Test Method GET BY ID

// Test Method POST

// Test Method PUT

// Test Method DELETE


module.exports = router, app;