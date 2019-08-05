require('dotenv').config();
const sequelize = require('../db/sequelizeConfig');
sequelize.sync().then(() => 'Database synced successfully');
const assert = require('assert');
const CommentService = require('../services/commentService');
const MovieService = require('../services/movieService');
const PeopleService = require('../services/peopleService');
const debug = require('debug');

describe('Comment Service', () => {
    describe('addNewComment', () => {
        it('should save new comment without errors', async () => {
            try {
                const comment = await CommentService.addNewComment({
                    ipAddress: '127.0.0.1',
                    text: 'test text',
                    movieId: '2'
                });
                assert.notEqual(comment, undefined)
            } catch (err) {
                console.log(err);
                assert.fail();
            }
        }).timeout(10000);
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
    });

    describe('getAllComments', () => {
        it('should get all comments', async () => {
            try {
                const comments = await CommentService.getAllComments();
                assert.notEqual(comments, undefined);
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
            
        }).timeout(10000);
    });

    describe('getMoviesWithComments', () => {
        it('it should return a list of movies with number of comments', async () => {
            try {
                const movies = await MovieService.getMoviesWithComments();
                assert.notEqual(movies, undefined);
            } catch(error) {
                console.log('Error: ', error);
                assert.fail();
            }
        }).timeout(10000);
    });

    describe('getMovieById', () => {
        it('it should return a movie with an id that matches the id passed', async () => {
            try {
                const movie = await MovieService.getMovieById(4);
                assert.notEqual(movie, undefined);
            } catch(error) {
                console.log(error);
                assert.fail();
            }
        }).timeout(10000);
    });
});

describe('People Service', () => {
    describe('getPeople', () => {
        it('it should return a list of people with metadata', async () => {
            try {
                const people = await PeopleService.getPeople();
                assert.notEqual(people, undefined);
            } catch(error) {
                console.log(error);
                assert.fail();
            }
        }).timeout(100000);
    });
});