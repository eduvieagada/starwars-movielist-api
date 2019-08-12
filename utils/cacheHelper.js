const redis = require('redis');
const {promisify} = require('util');
const redisConfig = require('../config/redisConfig');


const redisClient = redis.createClient({
    port: redisConfig.port,
    host: redisConfig.host,
    password: redisConfig.password
});

const get = async (url) => {

    try {
        redisClient.on('error', err => reject(err));
    
        const getAsync = promisify(redisClient.get).bind(redisClient);

        return await getAsync(url);
    } catch (error) {
        console.log(error);
        throw error;
    }
    
};

const save = async (url, data) => {
    redisClient.setex(url, redisConfig.expiresIn, JSON.stringify(data));
};

module.exports = {
    get, save
};