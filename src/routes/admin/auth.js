const express = require('express')
const { signup, signin } = require('../../controllers/admin/auth')
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../../validators/auth')

const router = express.Router()

router.post('/admin/signin',validateSigninRequest,isRequestValidated,signin)
router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup)
// router.post('/profile',requireSigin, (req,res)=>{
//     res.status(200).json({
//         user:"profile"
//     })
// })
module.exports = router
