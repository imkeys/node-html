const express = require('express')
const routers = require('./index')
const indexRouter = require('./home')
const router = express.Router()

routers.forEach(item => {
    router.use(item.path, item.router)
})

indexRouter(router)

module.exports = router

