const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller.js')
const { authenticate } = require('../middlewares/auth.js')

// Public routes
router.get('/api/posts', postController.allPosts)
router.get('/api/posts/:postId', postController.singlePost)

// Protected routes (require authentication)
router.post('/api/posts', authenticate, postController.createPost)
router.put('/api/posts/:postId', authenticate, postController.updatePosts)
router.delete('/api/posts/:postId', authenticate, postController.deletePosts)


module.exports = router