const Comment = require('../db/models/comments');
const sequelize = require('../db/sequelize-config');

const addNewComment = async (comment) => {
    try {
        return await Comment.create({
            ipAddress: comment.ipAddress,
            text: comment.text,
            movieId: comment.movieId
        });
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const getCommentCountPerMovie = async () => {
    try {
        return await Comment.findAll({
            attributes: ['movieId', [sequelize.fn('COUNT', sequelize.col('movieId')), 'count']],
            group: ['movieId'],
            raw: true
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllComments = async () => {
    try {
        const comments = await Comment.findAll({ raw: true, order: [['createdAt', 'DESC']]});
        return comments
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

module.exports = {
    addNewComment,
    getCommentCountPerMovie,
    getAllComments
};