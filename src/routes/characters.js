const express = require('express');
const router = express.Router();
const app = express();

const charactersController = require('../controllers/characters');
const validation = require('../middleware/validate');

router.get('/', charactersController.getAll);

router.get('/:id', charactersController.getSingle);

router.post('/', validation.saveCharacter,  charactersController.createCharacters);

router.put('/:id', validation.saveCharacter, charactersController.updateCharacters);

router.delete('/:id', charactersController.deleteCharacters);


// Test Method GET ALL

// Test Method GET BY ID

// Test Method POST

// Test Method PUT

// Test Method DELETE

module.exports = router, app;