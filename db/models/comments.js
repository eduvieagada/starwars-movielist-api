const Sequelize = require('sequelize');
const sequelizeConfig = require('../sequelize-config');

const Model = Sequelize.Model;
class Comment extends Model {}

Comment.init({
    ipAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    movieId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelizeConfig,
    modelName: 'Comment'
});


module.exports = Comment;
