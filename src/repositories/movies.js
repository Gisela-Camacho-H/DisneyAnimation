const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

function getCollection() {
    return mongodb.getCollection('movies')
}

const getallMoviesFromDB = async () => {
    const result = await getCollection().find({});
    return result;
};

const getSingle = async (req) => {
    const movieId = new ObjectId(req.params.id);
    const result = await getCollection().findOne({'_id': movieId});
    return result;
};

const createMovie = async (movie) => {
    const response = await getCollection().insertOne(movie);
    return response.acknowledged;
};

const updateMovie = async (updateOption) => {
    const response = await getCollection().replaceOne(updateOption.id, updateOption.movie);
    return response;
};

const deleteMovie = async (movieId) => {
    const response = await getCollection().remove({'_id': movieId});
    return response.deletedCount > 0;
};

module.exports = {
    getCollection,
    getallMoviesFromDB,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
}