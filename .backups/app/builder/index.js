require('./builder/PcBuilder')
require('./builder/H5Builder')
const constants = require('../../utils/constants')
const {factory} = require('./builder/index')


class Director {
    render (type, data) {
        let params = {}
        switch (type) {
            case constants.deviceType[1]:
                params = {
                    page: {
                        header: data.header.conf,
                        footer: data.footer,
                        tabbar: data.tabbar,
                        nav: data.nav,
                        ...data.conf
                    },
                    global: {
                        favicon: data.conf.favicon,
                        title: data.conf.title
                    },
                    plugins: data.plugins,
                    metas: data.conf.meta,
                    tops: data.header.controls, 
                    // navigations: data.floatLayer.filter(item => item.type === 'ui-navigation'), //pc
                    // floaters: data.floatLayer.filter(item => item.type === 'ui-float'), //pc
                    content: data.body, 
                    bottoms: data.footer.controls, 
                }
                break;
            case constants.deviceType[2]:
                params = {
                    page: {
                        header: data.header.conf,
                        footer: data.footer.conf,
                        toolLayer: data.toolLayer,
                        ...data.conf
                    },
                    global: {
                        favicon: data.conf.favicon,
                        title: data.conf.title
                    },
                    plugins: data.plugins,
                    metas: data.conf.meta,
                    tops: data.header.controls, 
                    navigations: data.floatLayer.filter(item => item.type === 'ui-navigation'), //pc
                    floaters: data.floatLayer.filter(item => item.type === 'ui-float'), //pc
                    content: data.body, 
                    bottoms: data.footer.controls, 
                }
                break;
        }


        const builder = this.getBuilder(type, params)
        return this.build(builder)
    }
    build (builder) {
        builder.buildMetas()
        builder.buildThemes()
        builder.buildBody()
        builder.buildStyles()
        builder.buildJavascripts()
        builder.buildPlugins()
        builder.buildScripts()
        return builder.buildPage()
    }
    getBuilder (type, data) {
        return factory(type).getInstance(data)
    }
}

module.exports = Director