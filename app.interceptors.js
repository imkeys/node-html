const {Logger} = require('./utils/logger')
const constants = require('./utils/constants')
const {factory} = require('./app/template/index')
const cache = require('./utils/cache')
const Director = require('./app/builder/index')
const uuid = require('uuid')
const path = require('path')

// 模板参数
const params = (req, res, next) => {
    // 手机或者pc
    const device = req.headers["user-agent"]
    req.isMobileDevice = /iphone|ipod|ipad|android/i.test(device)
    req.deviceType = req.isMobileDevice ? constants.deviceType[1] : constants.deviceType[2]

    // 商铺预览和模板预览，刷新缓存
    switch (req.get('host')) {
        case process.env.SHOP_BROWSE_HOST:
            req.scene = constants.scene.shop;
            break;
        case process.env.TEMPLATE_BROWSE_HOST:
            req.scene = constants.scene.template;
            break;
        default:
            req.scene = constants.scene.website;
    }

    if (process.env.NODE_ENV === 'development') {
        // 本地调试不同环境专用
        req.scene = constants.scene.shop
        // req.scene = constants.scene.template
    }
    next()
}
// 模板缓存
const template = (req, res, next) => {
    /**
        {
            h5: {
                page: {
                    js: '',
                    css: '',
                    html: ''
                }
            },
            pc: {
                'ui-aritcle-list': {
                    js: '',
                    css: '',
                    html: ''
                }
            }
        }
    */
   global.templates = cache.template
   if (req.scene !== constants.scene.website) {
        global.templates = cache.template
   }
   next()
}
// 日志
const log = (req, res, next) => {
    req.rpcId = 0
    req.startTime = Date.now()
    res.once('close', () => {
        const userId = req.get('user-id') || 'null'
        const traceId = req.get('trace-id') || uuid.v4()
        const userAgent = req.get('user-agent') || 'null'
        const status = res.statusCode
        const time = Date.now() - req.startTime || 0
        const size = res.get('content-length') || 0
        const referer = req.get('referer') || 'null'
        const rpcId = req.get('rpc-id') || 0
        Logger.info(`${userId} ${traceId} ${rpcId} "HTTP/1.1" ${req.method} ${req.originalUrl} ${userAgent} ${status} ${time}ms ${size} ${referer}`)
    })
    next()
}
const handlerRequest = (req, res, params, config = {}) => {
    return factory(req.deviceType).getInstance().getTemplateData(req, {
        IP: req.ip.match(/(?<=:)\d+(\.\d+){3}$/g)[0],
        isMobileDevice: req.isMobileDevice,
        localPath: req.originalUrl,
        domain: req.scene === constants.scene.website ? req.get('host') : '',
        scene: req.scene,
        sceneId: req.sceneId,
        ...params
    }, config)
}
const director = new Director()
const handlerTemplateRequest = async (req, res, params) => {
    let data = await handlerRequest(req, res, params)
    if (data.code === 20301) {
        res.redirect(301, data.error);
    } else {
        // 将数据写到本地json，缺少属性的时候，修改本地json，以便继续完成开发
        // 读
        // data = factory(req.deviceType).getInstance().getJson(true)
        // 写
        // factory(req.deviceType).getInstance().getJson(false, JSON.stringify(data))
        res.send(director.render(req.deviceType, data.result))
    }
}
const handlerAjaxRequest = async (req, res, params, config) => {
    let data = await handlerRequest(req, res, params, config)
    res.json(data)
}
const templateRequest = (req, res, next) => {
    // 页面模板请求
    req.handlerTemplateRequest = (params) => {
        handlerTemplateRequest(req, res, params).catch(e => {
            console.log('templateError:', e)
            Logger.error(e)
            res.sendFile(path.resolve('./static/html/500.html'))
        })
    }
    // ajax请求
    req.handlerAjaxRequest = (params, config = {}) => {
        handlerAjaxRequest(req, res, params, config).catch(e => {
            console.log('ajaxError:', e)
            Logger.error(e)
            res.status(500).send('500')
        })
    }
    // 其他模板请求
    req.handlerOtherRequest = async (params, config = {}) => {
        let data = await handlerRequest(req, res, params, config)
        return data
    }
    next()
}

module.exports = {
    params,
    template,
    log,
    templateRequest
}