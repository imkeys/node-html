const dayjs = require('dayjs')

module.exports = {
    dateFormat (value, format = 'YYYY-MM-DD HH:mm:ss') {
        return dayjs(value).format(format)
    }
}