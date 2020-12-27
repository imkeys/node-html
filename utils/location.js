const constants = require('./constants')
const qs = require('querystring')

//灰度 192.168.150.131:7000
//测试 192.168.151.130:8000

const HOST = process.env.CMS_SERVICE_HOST
const PATH = constants.location.normal

module.exports = {
    get(path, params) {
        let query = qs.encode(params)
        query = query ? `?${query}` : ''
        return `http://${HOST}${path || PATH}${query}`
    },   
    post (path) {
        return `http://${HOST}${path || PATH}`
    }
}