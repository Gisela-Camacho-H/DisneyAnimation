const mongodb = require('../db/connect');
const repositoryControls = require('../repositories/movies');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res) => {
    return repositoryControls.getallMoviesFromDB().then(
        (lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists)
        }
    )
}

const getSingleMovie = async (req, res, next) => {
    return repositoryControls.getSingle(req).then(
        (lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        }
    );
};

const createMovie = async (req, res) => {
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
    const response = repositoryControls.createMovie(movie);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occured while creating the movie entry. Please try again.')
    }
}