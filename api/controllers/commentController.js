const commentService = require('../../services/commentService');
const movieService = require('../../services/movieService');


const addNewComment = async (req, res) => {
    try {
        const comment = req.body;
        const result = validateInput(comment);

        if (!result.isValid) {
            return res.status(400).json(result);
        }

        const movieId = comment.movieId;
        const movie = await movieService.getMovieById(movieId);

        if (!movie)
            return res.status(400).json({ error: 'movie does not exist' });

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        comment["ipAddress"] = ip;

        const savedComment = await commentService.addNewComment(comment);

        return res.status(201).json(savedComment);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();

        return comments ? res.status(200).json(comments) : res.status(404);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const validateInput = (comment) => {
    if (!comment || !comment.text || !comment.movieId)
        return { isValid: false, error: "Empty entries not allowed"};
    if (comment.text.length > 500)
        return { isValid: false, error: "comment exceeded the maximum length. Maximum size is 500 characters"};

    return { isValid: true };
}

module.exports = {
    addNewComment,
    getAllComments
}