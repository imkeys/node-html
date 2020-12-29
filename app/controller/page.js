const ejs = require('../../utils/ejs')
const path = require('path')

exports.index = (req, res) => {
	res.type('html')
	res.send(
		ejs.render(
			path.resolve(__dirname, '../../public/index.html')
		)
	)
}

exports.sitemap = async (req, res) => {
	const data = {
		result: [
			{
				url: 'http://www.domain.com/',
				date: '2020-12-18T14:12:13+00:00'
			},
			{
				url: 'http://www.domain.com/about.html',
				date: '2020-12-18T14:12:13+00:00'
			},
			{
				url: 'http://www.domain.com/contact.html',
				date: '2020-12-18T14:12:13+00:00'
			},
			{
				url: 'http://www.domain.com/article/list.html',
				date: '2020-12-18T14:12:13+00:00'
			},
			{
				url: 'http://www.domain.com/article/detail.html',
				date: '2020-12-18T14:12:13+00:00'
			},
			{
				url: 'http://www.domain.com/product/list.html',
				date: '2020-12-18T14:12:13+00:00'
			},
			{
				url: 'http://www.domain.com/product/detail.html',
				date: '2020-12-18T14:12:13+00:00'
			}
		]
	}
	res.type('application/xml')
	res.send(ejs.render(path.resolve(__dirname, '../../public/sitemap.xml'), data))
}