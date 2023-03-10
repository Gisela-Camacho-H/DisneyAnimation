const express = require('express');
const router = express.Router();

const booksController = require('../controllers/users');
const validation = require('../middleware/validate');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post('/', validation.saveUser,  booksController.createUsers);

router.put('/:id', validation.saveUser, booksController.updateUsers);

router.delete('/:id', booksController.deleteUsers);

module.exports = router;