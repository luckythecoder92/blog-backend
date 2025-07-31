
const Post = require('../models/post.model.js');

const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find({
        authorId: req.user._id,
      })
      res.status(200).json({
        status: 'success',
        posts,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch posts',
        error: err.message
      });
            
    }
  };

module.exports = { getAllPosts}

