const ejs = require('ejs')
const fs = require('fs')

const render = (file, data = {}, options = {}) => {
    const content = fs.readFileSync(file, 'utf-8')
    return ejs.compile(content, options)(data)
}


module.exports = {
    render: render
}