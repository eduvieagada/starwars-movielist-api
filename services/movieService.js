const request = require('request');

const getAllMoviesFromApi = () => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            url: '',
            method: 'GET',
        };
        request(requestOptions, (err, res, body) => {
            console.log("response", res);
            if (res && res.statusCode != 200)
                reject(err, body);
            else
                resolve(body);
        });
    });
    
}

module.exports = {
    getAllMoviesFromApi
}