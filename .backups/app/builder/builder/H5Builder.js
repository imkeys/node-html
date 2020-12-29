const Builder = require('./Builder')
const Page = require('../page/H5Page')
const constants = require('../../../utils/constants')
const {factory} = require('../../template/index')
const {register} = require('./index')


class H5Builder extends Builder {
    constructor (config) {
        super()
        this.page = new Page(config)
        this.template = factory(constants.deviceType[1]).getInstance()
        this.globalTemplate = this.template.getGlobalTemplate()
    }
    buildBody () {
        this.bodyHtml = this.compileComponent({
            tops: this.buildTops(),
            contents: this.buildContent(),
            ...this.page.page
        }, 'page')

        // body 的在最后面，需要拿到最前面来
        this.styles.unshift(this.styles.pop())
        this.javascripts.unshift(this.javascripts.pop())
    }

    buildContent () {
        return this.page.content.map(item => {
            return this.compileComponent(item, item.type)
        }).join('\n')
    }
}

module.exports = H5Builder

register(constants.deviceType[1], H5Builder)