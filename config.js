const config = {
    PORT: process.env.PORT || 7010,
    REDIS: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1', 
        password: 'Muriel021107!!'
    },
    QUEUES: process.env.QUEUES
}

if (process.env.REDIS_PASSWORD) {
    config.REDIS.password = process.env.REDIS_PASSWORD
}

module.exports = config