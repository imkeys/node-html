const controller = require('../app/controller/index')
const setResponseType = function (req, res, next) {
	res.type('html')
	next()
}

module.exports = function (app) {
	app.get('/', setResponseType, controller.index)
}