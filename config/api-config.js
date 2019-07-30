if (process.env.NODE_ENV === 'development') {
    module.exports = {
        moviesUrl: 'https://swapi.co/api/films/'
    }
} else {
    module.exports = {
        moviesUrl: 'https://swapi.co/api'
    }
}