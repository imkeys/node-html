const express = require('express')
const controller = require('../app/controller/article')

const router = express.Router()

const setResponseType = function (req, res, next){
	res.type('html')
	next()
}

router.get('/list.html', setResponseType, controller.list)

module.exports = router