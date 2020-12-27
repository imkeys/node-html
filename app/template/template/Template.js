const path = require('path')
const fs = require('fs')
const RedisClient = require('../../../utils/RedisClient')
const constants = require('../../../utils/constants')
const request = require('../../../utils/request')
const location = require('../../../utils/location')

class Template {
    constructor (type) {
        this.type = type
        this.numberType = constants.deviceType.findIndex(item => {
            return this.type === item
        })
        this.client = RedisClient.getClientInstance()
    }

    toFile (name, content) {
        return fs.writeFileSync(name, content, 'utf8')
    }

    // 调试的时候才用
    getJson(read = true, data) {
        if (read) {
            return JSON.parse(fs.readFileSync('./test.json', 'utf-8'))
        } else {
            this.toFile('./test.json', data)
        }
    }

    getTemplatesToFiles () {
        this.getTemplatesFromRedis()
        this.getPageTemplateFromRedis()

        // 本地ejs模板，已经有了则不在重新生成
        if (!fs.existsSync('./ejs-template')) {
            this.getTemplatesFromRedis(true)
            this.getPageTemplateFromRedis(true)
        }
    }

    getTemplateDir (templateName, ejs) {
        const result = `./${ejs ? 'ejs-' : ''}template/${this.type}/${templateName}`

        if (fs.existsSync(result)) {
            return result
        }

        let dirs = result.split('/')
        let i = 0
        let dir = '.'
        while (i < dirs.length - 1) {
            dir += `/${dirs[++i]}`
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
        }

        return result
    }

    getTemplatesFromRedis (ejs) {
        this.client.hgetall(`view:${this.numberType}:control`, (err, res) => {
            res = Object.values(res).map(item => {
                return JSON.parse(item)
            })
            res.forEach(item => {
                const dir = this.getTemplateDir(item.code, ejs)
                for (let key in item) {
                    if (/css|html/.test(key)) {
                        this.toFile(`${dir}/index.${key}`, item[key])
                    }
                    if (/javascript/.test(key)) {
                        this.toFile(`${dir}/index.js`, item[key])
                    }
                }
            })
        })
    }

    getPageTemplateFromRedis (ejs) {
        this.client.hget('view:party', this.type.toUpperCase(), (err, res) => {
            const item = JSON.parse(res)
            const dir = this.getTemplateDir('page', ejs)
            for (let key in item) {

                if (/css|html/.test(key)) {
                    this.toFile(`${dir}/index.${key}`, item[key])
                }
                if (/javascript/.test(key)) {
                    this.toFile(`${dir}/index.js`, item[key])
                }
            }
        })
    }

    getTemplateToCache () {
        if (process.env.NODE_ENV === 'production') {
        }
        return this.getTemplateFromLocal()
    }

    getTemplateFromLocal () {
        const dir = `./ejs-template/${this.type}`
        const result = {}
        fs.readdirSync(dir, 'utf8').reduce((obj, name) => {
            const js = fs.readFileSync(`${dir}/${name}/index.js`, 'utf8')
            const css = fs.readFileSync(`${dir}/${name}/index.css`, 'utf8')
            const html = fs.readFileSync(`${dir}/${name}/index.html`, 'utf8')
            
            obj[name] = {
                js,
                css,
                html
            }
            return obj
        }, result)
        return result
    }

    getGlobalTemplate () {
        return fs.readFileSync(path.resolve('./assets/template/index.html'), 'utf8')
    }

    getTemplateData (req, params = {}, config = {}) {
        return request[req.method.toLowerCase()](req, req.rpcId++, location[req.method.toLowerCase()](config.location, params), params)
    }

    getTemplateByName (name) {
        return global.templates[this.type][name]
    }
}

module.exports = Template