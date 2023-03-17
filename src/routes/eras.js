const express = require('express');
const router = express.Router();
const app = express();

const erasController = require('../controllers/eras');
const validation = require('../middleware/validate');

router.get('/', erasController.getAllEras);

router.get('/:id', erasController.getSingleEra);

router.post('/', validation.saveEra , erasController.createEras);

router.put('/:id', validation.saveEra , erasController.updateEras);

router.delete('/:id', erasController.deleteEras);


// Test Method GET ALL

// Test Method GET BY ID

// Test Method POST

// Test Method PUT

// Test Method DELETE


module.exports = router, app;