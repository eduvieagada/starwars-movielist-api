const request = require('request');
const apiConfig = require('../config/api-config');
const commentsService = require('./commentsService');

const getAllMoviesFromApi = () => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            url: apiConfig.moviesUrl,
            method: 'GET',
        };
        request(requestOptions, (err, res, body) => {
            if (res && res.statusCode != 200)
                reject(err, body);
            else
                resolve(body);
        });
    });
    
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
                numberOfComments: commentCount === undefined ? 0 : commentCount
            }
        });

        movies = movies.sort((a, b) => {
            return new Date(a.releaseDate) > new Date(b.releaseDate);
        });

        return movies
    } catch(error) {
        console.log(error);
        throw new Error('unable to fetch data');
    }
    
}

module.exports = {
    getAllMoviesFromApi,
    getMoviesWithComments
}