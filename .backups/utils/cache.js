const {factory} = require('../app/template/index')
const constants = require('./constants')

const EXPIRE = 5 * 60 * 1000

class Cache {
    constructor (expire = 5 * 60 * 1000) {
        this.expire = expire
        this._template = null
    }

    get template () {
        if (!this._template || Date.now() >= global.templates.expire) {
            this._template = {
                expire: Date.now() + EXPIRE,
                [constants.deviceType[1]]: factory(constants.deviceType[1]).getInstance().getTemplateToCache(),
                [constants.deviceType[2]]: factory(constants.deviceType[2]).getInstance().getTemplateToCache()
            }
        }
        return this._template
    }
}

const cache = new Cache()

module.exports = cache