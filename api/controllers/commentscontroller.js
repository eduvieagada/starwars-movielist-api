const commentService = require('../../services/commentsService');


const addNewComment = (req, res) => {
    const comment = req.body;

    // validate request
    if (!comment || !comment.ipAddress || !comment.text || !comment.movieId)
        return res.status(400).json({ error: "Empty entries not allowed"});
    if (comment.text.length > 500)
        return res.status(400).json({ error: "comment exceeded the maximum length. Maximum size is 500 characters"});
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    comment["ipAddress"] = ip;
    commentService.addNewComment(comment)
        .then(savedcomment => res.status(201).json(savedcomment))
        .catch(error => {
            console.log(error);
            res.status(500);
        });
};

const getAllComments = (req, res) => {
    commentService.getAllComments()
        .then(comments => res.status(200).json(comments))
        .catch(error => {
            console.log(error);
            res.status(500);
        });
}

module.exports = {
    addNewComment,
    getAllComments
}