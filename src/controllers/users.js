const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('booksusers').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    });
};

const getSingle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id');
  }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db()
    .collection('booksusers')
    .find({ _id: userId });
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
});
};

const createUsers = async (req, res) => {
    const contact = {
      name: req.body.name,
      last_name: req.body.last_name,
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      birthday: req.body.birthday,
    };
    const response = await mongodb.getDb().db().collection('booksusers').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  };
  
  const updateUsers = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to update a user');
    }
    const userId = new ObjectId(req.params.id);
    const contact = {
        name: req.body.name,
        last_name: req.body.last_name,
        nickname: req.body.nickname,
        password: req.body.password,
        phone: req.body.phone,
        birthday: req.body.birthday,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('booksusers')
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };
  
  const deleteUsers = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to delete a user');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('booksusers').remove({ _id: userId }, true);
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
    createUsers,
    updateUsers,
    deleteUsers
  };