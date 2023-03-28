const mongodb = require('../db/connect');
const {getAllCharactersFromDB, getSingle, createOneCharacter, updateOneCharacter, deleteCharacter} = require("../repositories/characters");
const ObjectId = require('mongodb').ObjectId;


const getAllCharacters = async (req, res) => {
    return getAllCharactersFromDB().then(
        (lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
};

const getSingleCharacter = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid characters id');
    }
    const characterId = new ObjectId(req.params.id);
    getSingle(characterId).then(single => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(single);
    });
};

const createCharacter = async (req, res) => {
    const character = {
        name: req.body.name,
        role: req.body.role,
        description: req.body.description,
        trivia: req.body.trivia
    };
    let response = await createOneCharacter(character);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the character.');
    }
};

const updateCharacter = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to update a characters');
    }
    const characterId = new ObjectId(req.params.id);
    const character = {
        name: req.body.name,
        role: req.body.role,
        description: req.body.description,
        trivia: req.body.trivia
    };
    const response = await updateOneCharacter({"id": characterId, "character": character});

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the character.');
    }
};

const deleteCharacter = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid character id to delete a character');
    }
    const characterId = new ObjectId(req.params.id);
    const response = deleteCharacter(characterId);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the character.');
    }
};

module.exports = {
    getAllCharacters,
    getSingleCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
};