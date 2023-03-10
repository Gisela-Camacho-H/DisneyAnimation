const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('movies').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id');
  }
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db()
    .collection('movies')
    .find({ _id: movieId });
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
});
};

const createMovies = async (req, res) => {
    const movie = {
      title: req.body.title,
      promoImage: req.body.promoImage,
      year: req.body.year,
      era: req.body.era,
      length: req.body.length,
      trailerLink: req.body.trailerLink,
      trivia: req.body.trivia,
      category: req.body.category
    };
    const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the movie.');
    }
  };
  
  const updateMovies = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to update a movie');
    }
    const movieId = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      promoImage: req.body.promoImage,
      year: req.body.year,
      era: req.body.era,
      length: req.body.length,
      trailerLink: req.body.trailerLink,
      trivia: req.body.trivia,
      category: req.body.category
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .replaceOne({ _id: movieId }, movie);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the movie.');
    }
  };
  
  const deleteMovies = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to delete a movie');
    }
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('movies').remove({ _id: movieId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
    }
  };
  
  module.exports = {
    getAll,
    getSingle,
    createMovies,
    updateMovies,
    deleteMovies
  };