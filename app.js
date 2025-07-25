const express = require('express')
const blogRoutes = require("./routes/post.routes")
const userRoutes = require("./routes/user.routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/blog',blogRoutes)
app.use('/user', userRoutes)





module.exports ={ app}