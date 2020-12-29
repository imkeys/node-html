// redis 模板取值
exports.deviceType = [
    '',
    'h5',
    'pc'
]

/**
 * 场景
 * 0 客户网站
 * 1 店铺预览
 * 2 模板预览
 */
exports.scene = {
    website: 0,
    shop: 1,
    template: 2
}   

/**
 * 页面业务模型类型
 * 0 自定义
 * 100 首页
 * 1 产品
 * 2 文章
 */
exports.pageModelType = {
    custom: 0,
    index: 100,
    product: 1,
    article: 2
}

/**
 * 页面类型
 * 0 不限制
 * 1 列表页
 * 2 详情页
 */

 exports.pageType = {
    unlimited: 0,
    list: 1,
    detail: 2
 }

/**
 * 接口地址类型
 * normal 常规页面
 * message 提交留言
 * code 发送验证码
 * scan 产品详情浏览量
 */
exports.location = {
    normal: '/gateway/core/web/v3/shop.web.render.page.view/list',
    message: '/gateway/core/web/v1/api.shop.custom.form.record.submit',
    code: '/gateway/core/web/v1/api.shop.custom.form.sms',
    sitemap: '/gateway/core/web/v1/shop.web.page.sitemap/action',
    sms: '/gateway/core/web/v1/api.shop.custom.form.sms',
    view: '/gateway/core/web/v1/shop.web.refresh.scan',
    productSearch: '/gateway/core/web/v1/shop.web.product.search.page/list',
    articleSearch: '/gateway/core/web/v1/shop.web.article.search.page/list',
}

/**
 * redis常量
 */

 exports.redis = {
     css: 'cmsrender:css:'
 }