const mongoose = require('mongoose');

require('colors');

//ConnectDB function

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error.message}`.bgRed)
        process.exit(1)
    }
}


module.exports = connectDb;