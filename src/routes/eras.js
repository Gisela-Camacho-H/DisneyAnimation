const express = require('express');
const router = express.Router();

const erasController = require('../controllers/eras');
const validation = require('../middleware/validate');

router.get('/', erasController.getAllEras);

router.get('/:id', erasController.getSingleEra);

router.post('/', validation.saveEra , erasController.createEras);

router.put('/:id', validation.saveEra , erasController.updateEras);

router.delete('/:id', erasController.deleteEras);

module.exports = router;