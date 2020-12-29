const Factory = require('./Factory')
const H5Template = require('../template/H5Template')
const constants = require('../../../utils/constants')
const {register} = require('../index')

class H5Factory extends Factory {
    getInstance () {
        return new H5Template(constants.deviceType[1])
    }
}

register(constants.deviceType[1], new H5Factory())

module.exports = H5Factory