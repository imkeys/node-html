const Factory = require('./Factory')
const PcTemplate = require('../template/PcTemplate')
const constants = require('../../../utils/constants')
const {register} = require('../index')

class PcFactory extends Factory {
    getInstance () {
        return new PcTemplate(constants.deviceType[2])
    }
}

register(constants.deviceType[2], new PcFactory())

module.exports = PcFactory