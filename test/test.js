require('dotenv').config();
const sequelize = require('../db/sequelize-config');
sequelize.sync().then(() => 'Database synced successfully');
const assert = require('assert');
const CommentService = require('../services/commentsService');

describe('Comment Service', () => {
    describe('addNewComment', () => {
        it('should save new comment without errors', () => {
            CommentService.addNewComment({
                ipAddress: '127.0.0.1',
                text: 'test text',
                movieId: '0'
            })
            .then(comment => assert.notEqual(comment, undefined))
            .catch(err => {
                console.log(err);
                assert.fail();
            });
        });
    });
});