import mongoose from "mongoose";

const connectDb = async () => {
    
        console.log(process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
   
}
export default connectDb