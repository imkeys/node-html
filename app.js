const indexRouter = require('./router/home')
const router = require('./router/')
const app = require('express')()


indexRouter(app)
// app.use(router)

app.listen(9304, () => {
	console.log('开启服务: http://localhost:9304')
})




































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

