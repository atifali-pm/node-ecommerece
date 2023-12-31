import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from "./config/db.js";


import authRoutes from './routes/authRoute.js';
import categoyRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";


// dotenv config
dotenv.config();

connectDb();
// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/", categoyRoutes);
app.use("/api/v1/", productRoutes);
// app.use("/api/v1/transactions", require("./routes/transactionRoute"));



// app.get('/', (req, res) => {
//     res.send("<h1>POST BACKEND</h1>")
// });

// port
const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
    // console.log(process.env.MAIL_USER)
    // console.log(process.env.MAIL_PASS)

})
