const article = require('./article')
const product = require('./product')

module.exports = [
	{
		path: '/product',
		router: product
	},
	{
		path: '/article',
		router: article
	}
]