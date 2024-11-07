import mongoose from "mongoose";
import { loadEnv } from "./dotenv.config";
import { resetDailyCoupons } from "../utils/scheduler.coupon";
export function connectDatabase(){
    try{
        loadEnv();
    mongoose.connect(process.env.MONGO_URL as string).then(
        ()=>{
            // console.log(`MongoDB connected with server : ${mongoose.connection.host}`);
            // resetDailyCoupons();
        }
    ).catch((error)=>{
        console.log(`Error connecting to MongoDB: ${error}`)
    })
    }catch(e){
        console.log("Error occured connecting to the mongo db : ",e)
    }
}