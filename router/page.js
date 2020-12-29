const controller = require('../app/controller/page')
const setResponseType = function (req, res, next) {
	res.type('html')
	next()
}

module.exports = function (app) {
	app.get('/', setResponseType, controller.index)
	app.get('/sitemap.xml', controller.sitemap)
}