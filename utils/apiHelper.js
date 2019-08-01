const request = require('request');

const get = (url) =>  new Promise((resolve, reject) => {
    const requestOptions = {
        url: url,
        method: 'GET',
    };

    const OK = 200;

    request(requestOptions, (err, res, body) => {
        if (res && res.statusCode != OK)
            reject(err, body);
        else
            resolve(body);
    });
});



module.exports = {
    get
}