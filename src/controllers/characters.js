const mongodb = require('../db/connect');
const {getAllCharacters} = require("../services/characters");
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  getAllCharacters(req,res);
};

const getSingle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid characters id');
  }
    const characterId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db()
    .collection('characters')
    .find({ _id: characterId });
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
});
};

const createCharacters = async (req, res) => {
    const character = {
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,
      trivia: req.body.trivia
    };
    const response = await mongodb.getDb().db().collection('characters').insertOne(character);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the character.');
    }
  };
  
  const updateCharacters = async (req, res) => {
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
    const response = await mongodb
      .getDb()
      .db()
      .collection('characters')
      .replaceOne({ _id: characterId }, character);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the character.');
    }
  };
  
  const deleteCharacters = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid character id to delete a character');
    }
    const characterId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('characters').remove({ _id: characterId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the character.');
    }
  };
  
  module.exports = {
    getAll,
    getSingle,
    createCharacters,
    updateCharacters,
    deleteCharacters
  };