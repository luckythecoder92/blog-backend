const express = require('express')
const router = express.Router()
const {createBlog, allBlog, deleteBlog, updateBlog}  = require('../controllers/post.controller.js')


router.post('/create', create)
router.post('/update', update)
router.delete('/delete', dele)


module.exports = router 