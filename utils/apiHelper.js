const request = require('request');
const cacheHelper = require('./cacheHelper');

const get = (url) =>  new Promise((resolve, reject) => {
    const requestOptions = {
        url: url,
        method: 'GET',
    };

    cacheHelper.get(url).then(result => {
        if (result) {
            resolve(JSON.parse(result));
        } else {
            request(requestOptions, (err, res, body) => {
                const OK = 200;

                if (res && res.statusCode != OK)
                    reject(err, body);
                else {
                    cacheHelper.save(url, body);
                    resolve(body);
                }
            });
        }
    })
    .catch(err => reject(err));  
});



module.exports = {
    get
}