
if (process.env.NODE_ENV === 'development') {
    module.exports = {
        database: 'MovieList',
        username: 'sa',
        password: 'password@1',
        host: 'localhost',
        dialect: 'mssql'
    }
} else {
    module.exports = {
        database: '',
        username: '',
        password: '',
        host: '',
        dialect: ''
    }
}