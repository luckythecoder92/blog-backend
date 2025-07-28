
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
const registerUser= (req, res)=>{

    

}

const loginUser = (req, res)=>{

}

const getUserProfile = (req, res)=>{

}

const updateUserProfile = (req, res)=>{

}

const getAllUsers = (req, res)=>{  // (Admin only) get all the registered users

}

module.exports = { getAllPosts,registerUser, loginUser, getUserProfile, updateUserProfile, getAllUsers}

