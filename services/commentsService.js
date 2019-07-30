const Comment = require('../db/models/comments');
const sequelize = require('../db/sequelize-config');

const addNewComment = (comment) => {
    return new Promise((resolve, reject) => {
        if (!comment)
            reject(new Error("null comment"));

        Comment.create({
            ipAddress: comment.ipAddress,
            text: comment.text,
            movieId: comment.movieId
        }).then(savedComment => resolve(savedComment))
        .catch(err => reject(err));
    });
};

const getCommentCountPerMovie = () => {
    return new Promise((resolve, reject) => {
        Comment.findAll({
            attributes: ['movieId', [sequelize.fn('COUNT', sequelize.col('movieId')), 'count']],
            group: ['movieId'],
            raw: true
        }).then(comments => resolve(comments))
            .catch(err => reject(err));
    });
}

const getAllComments = async () => {
    try {
        const comments = await Comment.findAll({ raw: true, order: [['createdAt', 'DESC']]});
        return comments
    } catch (error) {
        throw error;
    }
    
}

module.exports = {
    addNewComment,
    getCommentCountPerMovie,
    getAllComments
};