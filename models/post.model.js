const mongoose = require('mongoose')
// const { required } = require('zod/mini')

const PostSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, "A Blog Post must have a title"],
     
    },
    description: {
        type:String,
        required:[true, "A Blog Post must have a description"],
    },
    tags:{
        type:String
    },
    readCount: {
      type: Number,
      default: 0,
    },
      author: {
      type: String,
      required: true,
    },
     authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    body:{
        type:String,
        required:[true,"A Blog Post must contain a body" ]
    },
 readTime: {
      type: String,
    },
},{
    timestamps: true
}
)

const Post = mongoose.Schema("Post", PostSchema)

module.exports = Post