const Comment = require('../db/models/comment');
const sequelize = require('../db/sequelizeConfig');

const addNewComment = async (comment) => {
    try {        
        return await Comment.create({
            ipAddress: comment.ipAddress,
            text: comment.text,
            movieId: comment.movieId
        });
    } catch(err) {
        console.log(err);
        throw err;
    }
};

const getCommentCountPerMovie = async () => {
    try {
        return await Comment.findAll({
            attributes: ['movieId', [sequelize.fn('COUNT', sequelize.col('movieId')), 'count']],
            group: ['movieId'],
            raw: true
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getAllComments = async () => {
    try {
        const comments = await Comment.findAll({ raw: true, order: [['createdAt', 'DESC']]});
        return comments
    } catch (err) {
        console.log(err);
        throw err;
    }
    
}

module.exports = {
    addNewComment,
    getCommentCountPerMovie,
    getAllComments
};