const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const db = require("./db/index");
db.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});