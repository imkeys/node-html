const express = require('express')
// const controller = require('../app/controller/index')

const setResponseType = function (req, res, next){
    res.type('html')
    next()
}

module.exports = function (app) {
    
    app.get('/', setResponseType, controller.index)

    app.post('/ly-submit', controller.lySubmit)
    
    app.post('/form-submit', controller.formSubmit)
    
    app.post('/product-data-page', controller.productDataPage)
    
    app.post('/article-data-page', controller.articleDataPage)

    // 文章阅读量
    app.post('/view', controller.view)
    
    app.get('/sitemap.xml', controller.sitemap)

    // 内联样式
    app.get('/css', controller.css)

    // 短信验证码
    app.post('/sms', controller.sms)
    
    // 自定义页面
    app.get('/:assumedName.html', controller.custom)

}