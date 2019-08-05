const Sequelize = require('sequelize');
const sequelizeConfig = require('../sequelizeConfig');

const Model = Sequelize.Model;
class Comment extends Model {}

Comment.init({
    ipAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING(500),
        allowNull: false,
        validate: {
            len: [1, 500]
        }
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
