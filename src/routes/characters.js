const express = require('express');
const router = express.Router();

const charactersController = require('../controllers/characters');
const validation = require('../middleware/validate');

router.get('/', charactersController.getAll);

router.get('/:id', charactersController.getSingle);

router.post('/', validation.saveCharacter,  charactersController.createCharacters);

router.put('/:id', validation.saveCharacter, charactersController.updateCharacters);

router.delete('/:id', charactersController.deleteCharacters);

module.exports = router;