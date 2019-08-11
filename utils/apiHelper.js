const request = require('request');
const redis = require('redis');
const redisConfig = require('../config/redisConfig');

const get = (url) =>  new Promise((resolve, reject) => {
    const redisPort = redisConfig.port;
    const redisHost = redisConfig.host;

    const redisClient = redis.createClient(redisPort, redisHost);
    redisClient.on('error', err => reject(err));

    const requestOptions = {
        url: url,
        method: 'GET',
    };

    redisClient.get(url, (_err, result) => {
        if (result) {
            resolve(JSON.parse(result));
        } else {
            request(requestOptions, (err, res, body) => {
                const OK = 200;

                if (res && res.statusCode != OK)
                    reject(err, body);
                else {
                    const cacheExpiresIn = redisConfig.expiresIn;

                    redisClient.setex(url, cacheExpiresIn, JSON.stringify(body))
                    resolve(body);
                }
            });
        }
    });   
});



module.exports = {
    get
}