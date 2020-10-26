const express = require('express')
const { signup, signin} = require('../controllers/auth')
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../validators/auth')

const router = express.Router()


router.post('/signup',validateSignupRequest,isRequestValidated,signup)
router.post('/signin',validateSigninRequest,isRequestValidated,signin)
// router.post('/profile',requireSigin, (req,res)=>{
//     res.status(200).json({
//         user:"profile"
//     })
// })
module.exports = router
