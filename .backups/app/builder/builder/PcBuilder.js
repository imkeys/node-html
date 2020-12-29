const Builder = require('./Builder')
const constants = require('../../../utils/constants')
const Page = require('../page/PcPage')
const {factory} = require('../../template/index')
const {register} = require('./index')


class PcBuilder extends Builder {
    constructor (config) {
        super()
        this.page = new Page(config)
        this.template = factory(constants.deviceType[2]).getInstance()
        this.globalTemplate = this.template.getGlobalTemplate()
    }

    buildBody () {
        this.bodyHtml = this.compileComponent({
            ...this.page.page,
            navigationsHtml: this.buildNavigations(),
            tops: this.buildTops(),
            contents: this.buildContent(),
            bottoms: this.buildBottoms(),
            floaters: this.buildFloaters()
        }, 'page')

        // body 的在最后面，需要拿到最前面来
        this.styles.unshift(this.styles.pop())
        this.javascripts.unshift(this.javascripts.pop())

    }

    buildFloaters () {
        return this.page.floaters.map(item => {
            return this.compileComponent(item, item.type)
        }).join('\n')
    }

    buildNavigations () {
        return this.page.navigations.map(item => {
            if (item.layout === 2) {
                item.childHtml = item.permutation.map(it => {
                    this.compileComponent(it, it.type)
                }).join('\n')
            }
            return this.compileComponent(item, item.type)
        }).join('\n')
    }


    buildContent () {
        return this.page.content.map(item => {
            return this.compileComponent(item, item.type)
        }).join('\n')
    }

    buildBottoms () {
        return this.page.bottoms.map(item => {
            return this.compileComponent(item, item.type)
        }).join('\n')
    }
}

module.exports = PcBuilder

register(constants.deviceType[2], PcBuilder)