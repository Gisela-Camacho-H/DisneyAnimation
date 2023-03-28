const mongodb = require('../db/connect');
const {getAllErasFromDB} = require("../repositories/eras");
const ObjectId = require('mongodb').ObjectId;

const getAllEras = async (req, res) => {
  return getAllErasFromDB().then(
    (lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingleEra = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid era id');
    }
      const eraId = new ObjectId(req.params.id);
      const result = await mongodb
      .getDb()
      .db()
      .collection('eras')
      .find({ _id: eraId });
      result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
  });
  };
  
  const createEras = async (req, res) => {
      const era = {
        name: req.body.name,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        description: req.body.description,
        moviesInEra: req.body.moviesInEra
      };
      const response = await mongodb.getDb().db().collection('eras').insertOne(era);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the era.');
      }
    };
    
    const updateEras = async (req, res) => {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid era id to update a era');
      }
      const eraId = new ObjectId(req.params.id);
      const era = {
        name: req.body.name,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        description: req.body.description,
        moviesInEra: req.body.moviesInEra
      };
      const response = await mongodb
        .getDb()
        .db()
        .collection('eras')
        .replaceOne({ _id: eraId }, era);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the era.');
      }
    };
    
    const deleteEras = async (req, res) => {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to delete a era');
      }
      const eraId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db().collection('eras').remove({ _id: eraId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the era.');
      }
    };

module.exports = {
    getAllEras,
    getSingleEra,
    createEras,
    updateEras,
    deleteEras
}