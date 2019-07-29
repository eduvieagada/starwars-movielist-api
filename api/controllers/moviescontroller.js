
const allMovies = (req, res) => {
    return res.status(200).json({ movies: "All movies" });
}

module.exports = {
    allMovies
}