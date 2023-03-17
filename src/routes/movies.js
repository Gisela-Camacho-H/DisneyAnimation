const express = require('express');
const router = express.Router();
const app = express();

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');


router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', validation.saveMovie , moviesController.createMovies);

router.put('/:id', validation.saveMovie ,moviesController.updateMovies);

router.delete('/:id', moviesController.deleteMovies);

// Test Method GET ALL

// Test Method GET BY ID

// Test Method POST
app.use(express.json());

 const testMovies = require('../../functions/fn-post');
 
 app.post('/movies', (req, res)=>{
   const {title,promoImage,era,length,trailerLink,trivia,category,year} = req.body;
   const validpost = testMovies(title,promoImage,era,length,trailerLink,trivia,category, year);
   if (validpost) {
     res.status(201).json('good');
   } else {
       res.status(500).json('Some error occurred while creating the movie.');
     }
 });

// Test Method PUT

// Test Method DELETE


 

module.exports = router, app;