const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // below will give us the host that we are connected to...
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`${error.message}`.red.underline.bold)
        process.exit(1)
    }
}



module.exports = connectDB