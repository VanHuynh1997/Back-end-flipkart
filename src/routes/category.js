const express = require('express')
const { requireSigin } = require('../controllers/auth')

const router = express.Router() 

const { createCategory, getCategories } = require('../controllers/category')
router.post('/category/create',requireSigin,createCategory)
router.get('/category/getcategory', getCategories)

module.exports = router