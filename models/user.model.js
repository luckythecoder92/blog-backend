const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const {z}    = require('zod')
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,  
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
      posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },]

},
{
   timestamps: true
})

userSchema.pre("save",async(next)=>{
    this.password = await bcrypt.hash(this.password,12)
    next();
})

userSchema.methods.validPassword = async function (currentPassword, storedPassword) {
    return await bcrypt.compare(currentPassword,storedPassword)
}


const User = mongoose.model('User',userSchema)

module.exports = User