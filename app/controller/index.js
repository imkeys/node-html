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
