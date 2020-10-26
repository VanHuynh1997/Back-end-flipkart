const express = require('express')
const { adminMiddleware } = require('../common-middleware')
const { requireSigin } = require('../controllers/auth')
const { createProduct } = require('../controllers/product')
const multer  = require('multer')
const router = express.Router() 
const shortid = require('shortid')
const path = require('path')
const storage = multer.diskStorage({

    destination: function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'))
        
    },
    filename: function(req,file,cb){
        cb(null,shortid.generate() + '-' + file.originalname)
    }

})
const upload = multer({storage})

//const {  } = require('../controllers/category')
router.post('/product/create',requireSigin,adminMiddleware, upload.array('productPicture'),createProduct)
//router.get('/category/getcategory', getCategories)

module.exports = router