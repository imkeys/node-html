const ejs = require('../../utils/ejs')
const client = require('../../utils/RedisClient')
const path = require('path')
const constants = require('../../utils/constants')

const PAGE_MODEL_TYPE = constants.pageModelType.index

exports.index = (req, res) => {
    req.handlerTemplateRequest({
        pageModelType: PAGE_MODEL_TYPE,
        pageType: constants.pageType.unlimited,
    })
}

exports.custom = (req, res) => {
    req.handlerTemplateRequest({
        pageModelType: constants.pageModelType.custom,
        pageType: constants.pageType.unlimited,
        assumedName: req.params.assumedName
    })
}

exports.lySubmit = (req, res) => {

}

exports.formSubmit = (req, res) => {
    req.handlerAjaxRequest({
        ...req.body
    }, {
        location: constants.location.message
    })
}

exports.productDataPage = (req, res) => {
    req.handlerAjaxRequest({
        ...req.body
    }, {
        location: constants.location.productSearch
    })
}

exports.articleDataPage = (req, res) => {
    req.handlerAjaxRequest({
        ...req.body
    }, {
        location: constants.location.articleSearch
    })
}
exports.view = (req, res) => {
    req.handlerAjaxRequest({
        ...req.body,
        pageModelType: constants.pageModelType.article,
        pageType: constants.pageType.detail
    }, {
        location: constants.location.view
    })
}
exports.sms = (req, res) => {
    req.handlerAjaxRequest({
        ...req.body,
    }, {
        location: constants.location.sms
    })
}

exports.sitemap = async (req, res) => {
    let data = await req.handlerOtherRequest({}, {
        location: constants.location.sitemap,
    })
    res.type('application/xml')
    res.send(ejs.render(path.resolve(__dirname, '../../assets/template/sitemap.xml'), data))
}

exports.css = (req, res) => {
    const hash = req.query.v
    const redis = client.getClientInstance()
    redis.get(`${constants.redis.css}${hash}`, (err, reply) => {
        res.type('text/css')
        res.send(reply)
    })
}
