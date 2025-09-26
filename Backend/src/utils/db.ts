import mongoose from "mongoose"
import config from "../config/config";
export const db =async()=>{
    try {
        await mongoose.connect(config.mongo_uri as string);
        console.log("mongodb Database connected");
        
    } catch (error) {
        console.log("Error connecting to mongodb:", error);

    }
} 