const express = require('express')
const controller = require('../app/controller/article')

const router = express.Router()

const setResponseType = function (req, res, next){
    res.type('html')
    next()
}

router.get('/list.html', setResponseType, controller.list)

router.get('/list-:category-:page.html', controller.category)
router.get('/list-:category.html', controller.category)

router.get('/search-:title-:page.html', controller.search)
router.get('/search-:title.html', controller.search)

router.get('/detail-:id.html', controller.detail)


router.get('/filter/:category/:filter/:page.html', controller.filter)
router.get('/filter/:category/:filter.html', controller.filter)

module.exports = router