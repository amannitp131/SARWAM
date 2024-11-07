import cors from "cors"
import { loadEnv } from "./dotenv.config"
import express from 'express';
const app=express();
export function allowedCors() {
    loadEnv();
    try{
        const frontend = process.env.FRONTEND_URL;
    if (!frontend) {
        console.error('FRONTEND_URL is not defined in .env file');
        return;
    }
    app.use(cors({ origin: frontend }));
    }catch(e){
        console.log("An error occured while dealing with cors : ",e);
    }
}