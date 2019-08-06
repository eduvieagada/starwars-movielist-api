const apiConfig = require('../config/apiConfig');
const commentsService = require('./commentService');
const apiHelper = require('../utils/apiHelper');
const debug = require('debug');

const getAllMoviesFromApi = async () => {
    try {
        return await apiHelper.get(apiConfig.moviesUrl);
    } catch (error) {
        throw error;
    }    
}

const isNumber = num => !isNaN(parseFloat(num)) && isFinite(num);

const getMovieById = async id => {
    try {
        console.log(typeof(id));
        if (!id || !isNumber(id))
            throw new Error('invalid id passed');

        const { results } = JSON.parse(await getAllMoviesFromApi());

        const moviesById = results.filter(m => m.episode_id === parseInt(id));

        if (moviesById.length < 1)
            throw new Error('movie does not exist');

        return moviesById[0];

    } catch(error) {
        console.log(error);
        debug(error);
        throw new Error('unable to fetch data');
    }
}

const getMoviesWithComments = async () => {
    try {
        const { results } = JSON.parse(await getAllMoviesFromApi());
        const movieAndCommentCount = await commentsService.getCommentCountPerMovie();
        let movies = results.map(m => {
            const commentCount = movieAndCommentCount.filter(x => x.movieId === m.episode_id)[0];
            return {
                openingCrawl: m.opening_crawl,
                title: m.title,
                director: m.director,
                producer: m.producer,
                releaseDate: m.release_date,
                numberOfComments: commentCount === undefined ? 0 : commentCount.count,
                movieId: m.episode_id
            }
        });

        movies = movies.sort((a, b) => {
            return new Date(a.releaseDate) > new Date(b.releaseDate);
        });

        return movies;
    } catch(error) {
        debug(error);
        throw new Error('unable to fetch data');
    }    
}



module.exports = {
    getAllMoviesFromApi,
    getMoviesWithComments,
    getMovieById
}