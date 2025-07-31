const { success } = require('zod');
const Post = require('../models/post.model.js')
const User = require('../models/user.model.js')

const createPost = async (req, res) => {
    try {
        const { title, description, tags, body } = req.body

        const wpm = 225;
        const numberOfWords = body.trim().split(/\s+/)
        const readTime = Math.ceil(numberOfWords / wpm)

        let { name } = req.user
        let author = name
        let authorId = req.user._id
        const post = await Post.create({
            title,
            description,
            tags,
            body,
            author,
            authorId,
            readTime
        })
        let user = await User.findById(req.user._id)
        user.posts.push(post._id)
        await user.save()

        res.status(201).json({
            status: "success",
            post
        })
    } catch (error) {
        throw error
    }
}

const allPosts = async (req, res) => {
    try {
        const posts = await Post.find({ state: "published" })
        res.status(200).json({
            status: "success",
            posts
        })
    } catch (error) {
        throw error
    }
}

const deletePosts = async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.postId, {
            authorId: req.user.id
        })
        if (!post) return res.status(401).json({
            success: "Fail",
            message: 'Post with given Id not found'
        })

        if (post.authorId.toString() !== req.user.id) {
            return res.status(401).json({
                status: "Fail",
                message: `You can only delete a post you created!`,
            });

        }

        const postByUser = await User.findById(req.user._id);
        postByUser.posts.pull(post._id)
        await postByUser.updateOne({ posts: postByUser.posts })
        res.status(200).json({
            status: "success",
            message: "Post deleted successfully",
        });
    } catch (error) {
        throw error
    }

}

const updatePosts = async (req, res) => {
    const { state, body } = req.body
    try {
        const post = await Post.findByIdAndUpdate(req.params.postId, {
            $set: {
                state,
                body
            }
        }, { new: true })

        if (post.authorId.toString() !== req.user.id) {
            return res.status(401).json({
                success: "Fail",
                message: `You can only update a post you created!`
            })
        }

        res.status(201).json({
            status: "Success",
            post
        })
    } catch (error) {
        throw error
    }

}

const singlePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.postId).where("state").eq("published")

        if (!post) {
            return res.status(404).json({
                staus: "Failed",
                message: "the post is not found!"
            })
        }
        else {
            post.readCount === 0 ? post.readCount++ : post.readCount++;
            await post.save()
        }

        res.status(200).json({
            status: "success",
            post,
        });

    } catch (error) {
        throw error
    }

};

module.exports = { createPost, allPosts, deletePosts, updatePosts, singlePost }