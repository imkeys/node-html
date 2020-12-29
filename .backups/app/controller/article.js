const constants = require('../../utils/constants')

function handerRequest (req, res, params = {}) {
    req.handlerTemplateRequest({
        pageModelType: constants.pageModelType[req.originalUrl.match(/(\/\d+)?\/(?<type>article|product)/).groups.type],
        pageType: constants.pageType.list,
        ...params  
    })
}

function search (req, res) {
    handerRequest(req, res, {
        title: req.params.title,
        page: req.params.page || 1
    })
}


function category (req, res) {
    handerRequest(req, res, {
        category: req.params.category,
        page: req.params.page || 1
    })
}

exports.list = (req, res) => {
    handerRequest(req, res, {
        page: 1
    })
}

exports.detail = (req, res) => {
    handerRequest(req, res, {
        pageType: constants.pageType.detail,
        id: req.params.id
    })
}
exports.filter = (req, res) => {
    handerRequest(req, res, {
        filter: req.params.title,
        category: req.params.category,
        page: req.params.page || 1
    })
}

exports.category = category
exports.search = search


