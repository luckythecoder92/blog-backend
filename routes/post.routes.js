const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller.js')

const authController = require('../middlewares/auth.js')
router.get('/api/posts', allPosts)
router.post('/api/posts', createPost)
router.put('/api/posts/:postId', updatePosts)
router.put('/api/posts/:postId', deletePosts)
router.get('/api/posts/:postId',singlePost)


module.exports = router