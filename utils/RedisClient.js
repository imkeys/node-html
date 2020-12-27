const redis = require('redis')
const {Logger} = require('./logger')
class RedisClient {
    static client
    static getClientInstance () {
        if (!RedisClient.client) {
            let host = process.env.REDIS_HOST
            let port = process.env.REDIS_PORT
            if (process.env.NODE_ENV === 'development') {
                host = host || '192.168.150.131'
                port = port || '6379'
            }
            RedisClient.client = redis.createClient({
                host,
                port
            })
            RedisClient.client.on('connect', () => {
                Logger.debug(`connect to ${host}:${port} success`)
            })
            RedisClient.client.on('reconnect', () => {
                Logger.debug(`reconnect to ${host}:${port} success`)
            })
            RedisClient.client.on('error', err => {
                Logger.debug(err)
            })
        }
        return RedisClient.client
    }
}

module.exports = RedisClient