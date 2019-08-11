
if (process.env.NODE_ENV === 'development') {
    module.exports = {
        database: 'MovieList',
        username: 'root',
        password: 'password@1',
        host: 'localhost',
        dialect: 'mysql'
    }
} else {
    module.exports = {
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        dialect: process.env.SEQUELIZE_DIALECT
    }
}