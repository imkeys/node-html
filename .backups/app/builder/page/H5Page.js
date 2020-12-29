const Page = require('./Page')

class H5Page extends Page {
    constructor (config) {
        super(config)
        this.content = config.content
        this.themes = [
            '/static/css/h5.css'
        ]
        this.scripts = [
            'https://local-test.jingwxcx.com/lib/h5/js/jquery/jquery.min-2.1.4.js',
            'https://local-test.jingwxcx.com/lib/h5/js/TouchSlide.1.1.js',
            '/static/js/h5.js'
        ]
    }
}

module.exports = H5Page