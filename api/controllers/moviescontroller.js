const movieService = require('../../services/movieService')


const allMovies = (req, res) => {
    movieService.getMoviesWithComments().then(movies => {
        if (movies) {
            return res.status(200).json(movies);
        } else {
            return res.status(404);
        }
    }).catch(error => {
        debug(error);
        return res.status(500);
    });    
}

module.exports = {
    allMovies
}