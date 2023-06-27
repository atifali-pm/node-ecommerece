const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('colors');
const connectDb = require('./db/Database');


// dotenv config
dotenv.config();

connectDb();
// rest object
const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("dev"))

//routes
app.use("/api/v1/users", require("./routes/userRoute"));
// app.use("/api/v1/transactions", require("./routes/transactionRoute"));


app.get('/', (req, res) => {
    res.send("<h1>POST BACKEND</h1>")
});

// port
const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})