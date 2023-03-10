const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/movies', require('./movies'))
router.use('/characters', require('./characters'))
router.use('/eras', require('./eras'))
router.use('/spinoffs', require('./spinoff'))

module.exports = router;