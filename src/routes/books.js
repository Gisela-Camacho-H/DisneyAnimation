const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post('/', validation.saveBook , booksController.createBooks);

router.put('/:id', validation.saveBook ,booksController.updateBooks);

router.delete('/:id', booksController.deleteBooks);

module.exports = router;