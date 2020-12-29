const express = require('express')
const path = require('path')
const app = express()

const indexRouter = require('./router/page')
const routers = require('./router/index')
const ejs = require('./utils/ejs')

const host = 'localhost'
const port = 3000

app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({
  extended: false
}))

// 静态文件目录
app.use('/static', express.static(path.resolve(__dirname, './static')))

// 根路由
indexRouter(app)

// 普通路由
routers.forEach(item => {
	app.use(item.path, item.router)
})

// 404
app.get('*', (req, res) => {
	res.type('html')
	res.send(
		ejs.render(
			path.resolve(__dirname, './public/404.html'),
			{
				url: '/'
			}
		)
	)
})

// 500
app.use((err, req, res, next) => {
	res.sendFile(
		path.resolve('./public/500.html')
	)
})

app.listen(port, host, () => console.log('Example app listening at http://%s:%s', host, port))

