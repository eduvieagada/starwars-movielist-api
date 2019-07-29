const express = require('express');
const moviesController = require('../controllers/moviescontroller');
const router = express.Router();


router.get('/movies', moviesController.allMovies);


module.exports = router;