const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', validation.saveMovie , moviesController.createMovies);

router.put('/:id', validation.saveMovie ,moviesController.updateMovies);

router.delete('/:id', moviesController.deleteMovies);

module.exports = router;