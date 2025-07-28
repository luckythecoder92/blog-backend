const express = require('express')
const router = express.Router()
const authController = require('../middlewares/auth.js')
const userController = require('../controllers/user.controller.js')


router.get('/author', authController.authenticate, userController.getAllPosts)
router.post('/auth/signup',authController.signUp)
router.post('/auth/login', authController.login)


module.exports = router 