const express = require('express');
const moviesController = require('../controllers/moviescontroller');
const commentsController = require('../controllers/commentscontroller');
const router = express.Router();


router.get('/movies', moviesController.allMovies);
router.route('/comments')
    .get(commentsController.getAllComments)
    .post(commentsController.addNewComment);


module.exports = router;