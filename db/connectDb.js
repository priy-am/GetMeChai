import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MonogDB connect :- ${connect.connection.host}`)
    } catch (error) {
        console.log(`Network error :- ${error}`)
    }
}

export default connectDB