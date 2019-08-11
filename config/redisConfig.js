
if (process.env.NODE_ENV === 'development') {
    module.exports = {
        port: 6379,
        expiresIn: 604800,
    }
} else {
    module.exports = {
        port: process.env.REDIS_PORT,
        expiresIn: process.env.REDIS_EXPIRY
    }
}