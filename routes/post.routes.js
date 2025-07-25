const express = require('express')
const router = express.Router()
const {createPost,allPosts,updatePosts,deletePosts,singlePost}  = require('../controllers/post.controller.js')

router.get('/api/posts', allPosts)
router.post('/api/posts', createPost)
router.put('/api/posts/:postId', updatePosts)
router.put('/api/posts/:postId', deletePosts)
router.get('/api/posts/:postId',singlePost)


module.exports = router