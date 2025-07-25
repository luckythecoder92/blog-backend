const dotenv  = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const db = require("./db/index")
db.config()

const port = process.env.PORT





app.get('/', (req, res) => {
    res.send("The server is running");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});