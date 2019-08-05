const express = require('express');
const movieController = require('../controllers/movieController');
const commentController = require('../controllers/commentController');
const peopleController = require('../controllers/peopleController');
const router = express.Router();


router.get('/movies', movieController.allMovies);
router.route('/comments')
    .get(commentController.getAllComments)
    .post(commentController.addNewComment);
router.get('/people', peopleController.getPeople);


module.exports = router;