const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('books').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid book id');
  }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db()
    .collection('books')
    .find({ _id: userId });
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
});
};

const createBooks = async (req, res) => {
    const contact = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      imagePath: req.body.imagePath,
      details: req.body.details,
      aboutAuthor: req.body.aboutAuthor,
      categories: req.body.categories,
      imageAuthor: req.body.imageAuthor,
      price: req.body.price
    };
    const response = await mongodb.getDb().db().collection('books').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  };
  
  const updateBooks = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid book id to update a book');
    }
    const userId = new ObjectId(req.params.id);
    const contact = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      imagePath: req.body.imagePath,
      details: req.body.details,
      aboutAuthor: req.body.aboutAuthor,
      categories: req.body.categories,
      imageAuthor: req.body.imageAuthor,
      price: req.body.price
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };
  
  const deleteBooks = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid book id to delete a book');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('books').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };
  
  module.exports = {
    getAll,
    getSingle,
    createBooks,
    updateBooks,
    deleteBooks
  };