const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,  
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ]
}, {
    timestamps: true
})

// FIXED: Changed arrow function to regular function
userSchema.pre("save", async function(next) {
    // Only hash if password is modified or new
    if (!this.isModified('password')) return next();
    
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        next(error);
    }
});

// FIXED: Method name and logic
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema)

module.exports = User