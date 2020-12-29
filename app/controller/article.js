const constants = require('../../utils/constants')

exports.list = (req, res) => {
	res.type('html')
	res.send(
		ejs.render(
			path.resolve(__dirname, '../../public/index.html')
		)
	)
}
