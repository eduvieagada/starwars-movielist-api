const Comment = require('../db/models/comments');

const addNewComment = (comment) => {
    return new Promise((resolve, reject) => {
        Comment.create({
            ipAddress: comment.ipAddress,
            text: comment.text,
            movieId: comment.movieId
        }).then(savedComment => resolve(savedComment))
        .catch(err => reject(err));
    });
}

module.exports = {
    addNewComment
};