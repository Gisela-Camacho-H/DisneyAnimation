const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllSpinoff = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('spinoffs').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    });
};

const getSingleSpinoff = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid spinoff id');
    }
      const characterId = new ObjectId(req.params.id);
      const result = await mongodb
      .getDb()
      .db()
      .collection('spinoffs')
      .find({ _id: characterId });
      result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
  });
  };
  
  const createSpinoffs = async (req, res) => {
      const spinoff = {
        title: req.body.title,
        related: req.body.related,
        type: req.body.type
      };
      const response = await mongodb.getDb().db().collection('spinoffs').insertOne(spinoff);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the spinoff.');
      }
    };
    
    const updateSpinoffs = async (req, res) => {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to update a spinoff');
      }
      const spinoffId = new ObjectId(req.params.id);
      const spinoff = {
        title: req.body.title,
        related: req.body.related,
        type: req.body.type
      };
      const response = await mongodb
        .getDb()
        .db()
        .collection('spinoffs')
        .replaceOne({ _id: spinoffId }, spinoff);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the spinoff.');
      }
    };
    
    const deleteSpinoffs = async (req, res) => {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid character id to delete a spinoff');
      }
      const spinoffId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db().collection('spinoffs').remove({ _id: spinoffId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the spinoff.');
      }
    };

module.exports = {
    getAllSpinoff,
    getSingleSpinoff,
    createSpinoffs,
    updateSpinoffs,
    deleteSpinoffs
}