const env = {
    service: {
        host: process.env.HOST,
        path: process.env.PATH,
    },
    db: {
        table: process.env.TABLE,
        pk: process.env.PK
    }
}

module.exports = env;