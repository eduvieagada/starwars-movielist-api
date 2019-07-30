const express = require('express');
const moviesController = require('../controllers/moviescontroller');
const commentsController = require('../controllers/commentscontroller');
const peopleController = require('../controllers/peoplecontroller');
const router = express.Router();


router.get('/movies', moviesController.allMovies);
router.route('/comments')
    .get(commentsController.getAllComments)
    .post(commentsController.addNewComment);
router.get('/people', peopleController.getPeople);


module.exports = router;