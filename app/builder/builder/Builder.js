const ejs = require('ejs')
const crypto = require('crypto')
const CleanCSS = require('clean-css');
const format = require('../../../utils/format')
const {Logger} = require('../../../utils/logger')
const client = require('../../../utils/RedisClient')
const constants = require('../../../utils/constants')



class Builder {
    constructor () {
        this.styles = []
        this.javascripts = []
        this.metasHtml = ''
        this.themesHtml = ''
        this.scriptsHtml = ''
        this.stylesHtml = ''
        this.pluginsHtml = ''
        this.bodyHtml = ''
    }
    buildMetas () {
        this.metasHtml = Object.keys(this.page.metas).map(key => {
            return `<meta name="${key}" content="${this.page.metas[key]}" />`
        }).join('\n')
    }
    buildThemes () {
        this.themesHtml = this.page.themes.map(item => {
            return `<link rel="stylesheet" href="${item}">`
        }).join('\n')
    }
    buildScripts () {
        this.scriptsHtml = this.page.scripts.map(item => {
            return `<script src="${item}"></script>`
        }).join('\n')
    }
    buildTops () {
        return this.page.tops.map(item => {
            return this.compileComponent(item, item.type)
        }).join('\n')
    }
    buildStyles () {
        /**
         * 1. css压缩
         * 2. 计算md5
         * 3. 存到redis
         */
        this.stylesHtml = this.styles.join('\n')
        const css = new CleanCSS().minify(this.stylesHtml).styles
        const hash = crypto.createHash('md5')
        hash.update(css)
        const value = hash.digest('hex')
        const redis = client.getClientInstance()
        redis.set(`${constants.redis.css}${value}`, css, err => {
            if (err) {
                Logger.error(`redis写入css样式错误，md5值为:${value}`, err)
            }
        })
        redis.expire(`${constants.redis.css}${value}`, 300)
        this.themesHtml += `<link rel="stylesheet" href="/css?v=${value}">`
    }
    buildPlugins () {
        this.pluginsHtml = this.page.plugins.join('\n')
    }
    buildBody () {}
    buildJavascripts () {
        this.javascriptsHtml = this.javascripts.join('\n')
    }
    buildPage () {
        const template = ejs.compile(this.globalTemplate)
        return template({
            metas: this.metasHtml,
            themes: this.themesHtml,
            styles: this.stylesHtml,
            body: this.bodyHtml,
            javascripts: this.javascriptsHtml,
            plugins: this.pluginsHtml,
            scripts: this.scriptsHtml,
            ...this.page.global
        })
    }
    compileComponent (data = {}, type, options = {}) {
        this.styles.push(this.compileCss(data, type, options))
        this.javascripts.push(this.compileJavascript(data, type, options))
        data.childHtml = ''
        console.log('渲染组件：', data.type)
        if (data.child && data.child.length) {
            data.childHtml = data.child.map(item => {
                return this.compileComponent(item, item.type, options)
            }).join('\n')
        }
        return this.compile(data, 'html', type, options)
    }
    compileCss (data = {}, type, options = {}) {
        return this.compile(data, 'css', type, options)
    }
    compileJavascript (data = {}, type, options = {}) {
        return this.compile(data, 'js', type, options)
    }
    compile (data = {}, fileType, templateName, options) {
        data.dateFormat = format.dateFormat
        try {
            const template = ejs.compile(global.templates[this.template.type][templateName][fileType], {
                cache:false,
                ...options,
            })
            return template(data)
        } catch (e) {
            Logger.error(`编译模板出错：${this.template.type}/${templateName}/${fileType}`)
            console.log(e)
            return ''
        }
    }
}

module.exports = Builder