const Page = require('./Page')

class PcPage extends Page {
    constructor (config) {
        super(config)
        this.navigations = config.navigations
        this.floaters = config.floaters
        this.content = config.content
        this.bottoms = config.bottoms
        this.themes = [
            '/static/css/jquery.video.css',
            '/static/css/pc.css'
        ]
        this.scripts = [
            'http://mps.jwyun.net/mps_collection/v1/visit/cms?d=192.168.150.131:9011',
            'https://s.jingwxcx.com/static/jquery/jquery-1.11.3.min.js',
            'https://s.jingwxcx.com/static/SuperSlide/jquery.SuperSlide.2.1.3.js',
            'https://s.jingwxcx.com/static/script/2020/03/28/jquery.video.js',
            '/static/js/pc.js?v=20201102',
            '/static/js/animateModule.js?v=20201102',
            'http://api.map.baidu.com/getscript?v=3.0&ak=E89f64004eda8895cd6d4214e5b7328d&services=&t=20200918142623'
        ]
    }
}

module.exports = PcPage