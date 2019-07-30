const request = require('request');

const get = (url) =>  new Promise((resolve, reject) => {
    const requestOptions = {
        url: url,
        method: 'GET',
    };

    request(requestOptions, (err, res, body) => {
        if (res && res.statusCode != 200)
            reject(err, body);
        else
            resolve(body);
    });
});



module.exports = {
    get
}