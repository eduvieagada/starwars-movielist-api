require('dotenv').config();
const sequelize = require('../db/sequelize-config');
sequelize.sync().then(() => 'Database synced successfully');
const assert = require('assert');
const CommentService = require('../services/commentsService');
const MovieService = require('../services/movieService');

describe('Comment Service', () => {
    describe('addNewComment', () => {
        it('should save new comment without errors', async () => {
            try {
                const comment = await CommentService.addNewComment({
                    ipAddress: '127.0.0.1',
                    text: 'test text',
                    movieId: '0'
                });
                assert.notEqual(comment, undefined)
            } catch (error) {
                assert.fail();
            }
        });
    });

    describe('getCommentCountPerMovie', () => {
        it('should get list of movie ids and their comment count', async () => {
            try {
                const moviesAndCommentCounts = await CommentService.getCommentCountPerMovie();
                assert.notEqual(moviesAndCommentCounts.length, 0);
            } catch (error) {
                assert.fail();
            }
        })
    })
});

describe('Movie Service', () => {
    describe('getAllMoviesFromApi', () => {
        it('it should return list of movies from the API', async () => {
            try {
                const movies = await MovieService.getAllMoviesFromApi();
                assert.notEqual(movies, undefined);
            } catch(error) {
                console.log('Error', error);
                assert.fail();
            }
            
        });
    });
});