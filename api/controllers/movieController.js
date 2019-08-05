const movieService = require('../../services/movieService');

const allMovies = async (_req, res) => {
    try {
        const movies = await movieService.getMoviesWithComments();
        return movies ? res.status(200).json(movies) : res.status(404);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message});
    }   
}

module.exports = {
    allMovies
}