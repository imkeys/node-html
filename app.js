const express = require('express')
const path = require('path')
const app = express()

const indexRouter = require('./router/home')
const routers = require('./router/index')
const ejs = require('./utils/ejs')

const host = 'localhost'
const port = 3000

app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({
  extended: false
}))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', true)
  req.method.toUpperCase() === 'OPTIONS' ? res.sendStatus(200) : next()
})

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

// app.use('', require('./public/'))
// app.use('/api/user', require('./api/user'))
// app.use('/api/weixin', require('./api/weixin'))

// app.use('/api/plan', require('./api/plan'))
// app.use('/api/patient', require('./api/patient'))
// app.use('/api/cases', require('./api/cases'))
// app.use('/api/treatments', require('./api/treatments'))

app.listen(port, host, () => console.log('Example app listening at http://%s:%s', host, port))

















// const indexRouter = require('./router/home')
// const router = require('./router/')
// const app = require('express')()
// indexRouter(app)
// // app.use(router)
// app.listen(9304, () => {
// 	console.log('开启服务: http://localhost:9304')
// })










// const preview = require('./router/preview')
// 
// const { Logger } = require('./utils/logger')
// const path = require('path')

// const bodyParser = require('body-parser')
// const {factory} = require('./app/template/index')
// const interceptors = require('./app.interceptors')
// const ejs = require('./utils/ejs')
// const cssMiddleware = require('./app/middleware/css')
// require('./app/template/factory/H5Factory')
// require('./app/template/factory/PcFactory')


// global.serviceName = 'cms_render_v1'
// Logger.setServiceName(global.serviceName)
// Logger.setLogLeave(process.env.NODE_ENV === 'development' ? '0' : '1')

// 开发环境，第一次没有模板的时候，从redis获取模板
// if (process.env.NODE_ENV === 'development') {
// 	Logger.info('load template end')
// }

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))

// 请求拦截
// Object.keys(interceptors).forEach(key => {
// 	app.use(interceptors[key])
// })

// 静态文件目录
// app.use('/static', express.static(
// 	path.resolve(__dirname, './static')
// ))

// 根路由
// indexRouter(app)

// app.use(cssMiddleware)

// 模板预览和商铺预览
// app.use('/:sceneId(\\d+)', (req, res, next) => {
// 	req.sceneId = req.params.sceneId
// 	next()
// }, preview)

// 普通路由
// routers.forEach(item => {
// 	app.use(item.path, item.router)
// })

// app.get('*', (req, res) => {
// 	res.sendFile(path.resolve('./static/html/404.html'))
// })

// app.use((err, req, res, next) => {
// 	res.sendFile(path.resolve('./static/html/500.html'))
// })

