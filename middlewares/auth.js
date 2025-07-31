const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const { promisify } = require('util')
const { success } = require('zod')
const app = require('../app.js')

// app.use()==



const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const signUp = async (req, res, next) => {
    const { name, email, password } = req.body

    try {
        // No manual hashing - let the model handle it
        const newUser = await User.create({
            name,
            email,
            password  // Plain password - model will hash it
        })
        
        const token = signToken(newUser._id)
        return res.status(201).json({
            status: "Success",
            token,
            data: {
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            }
        })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                status: "fail",
                message: "Email already exists. Please use a different email."
            });
        }
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                status: "fail",
                message: errors.join('. ')
            });
        }

        return next(err);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    
    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide email and password"
            });
        }

        // Find user and explicitly select password field
        const user = await User.findOne({ email }).select('+password')
        
        // Check if user exists and password is correct
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                status: "fail",
                message: "Incorrect email or password"
            });
        }

        const token = signToken(user._id)
        res.status(200).json({
            status: "Success",
            token,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Something went wrong during login"
        });
    }
}


const authenticate = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "You are not logged in! Please log in to get access."
            });
        }

        const decodedPayload = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        const currentUser = await User.findById(decodedPayload.id);

        if (!currentUser) {
            return res.status(401).json({
                status: "fail",
                message: "The user belonging to this token does no longer exist."
            });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: "fail",
                message: "Invalid token. Please log in again!"
            });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: "fail",
                message: "Your token has expired! Please log in again."
            });
        }

        // Handle other errors
        return res.status(500).json({
            status: "error",
            message: "Something went wrong during authentication"
        });
    }

}

module.exports = { signUp, login, authenticate }

