import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { loadEnv } from "./config/dotenv.config";
import { allowedCors } from "./config/origin.config";
import { connectDatabase } from "./config/db.config";
import cloudinary from "./config/cloudinary.config";
import { socketConnection } from "./sockets/socket";
import { image } from "./route/image.router";
import { home } from "./route/home.route";
import cors from 'cors'
import crypto from 'crypto'
import { auth } from "./route/auth.route";
import { Server } from "socket.io";
import { Socket } from "socket.io-client";
import { StudentRouter } from "./route/student.route";
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
loadEnv();
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
// allowedCors();
try{
  // const frontend=process.env.FRONTEND_URL;
  // app.use(cors({origin:frontend}))
  app.use(cors());
}catch(e){
  console.log("Cors issue : ",e);
}

connectDatabase();
// socketConnection();
// const io = new Server(server, {
//   cors: {
//       origin: process.env.FRONTEND_URL, 
//       methods: ["GET", "POST"],
//       credentials: true,
//   },
//   path: '/socket.io' 
// });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const secret = crypto.randomBytes(64).toString('hex');
app.get("/", (req, res) => {
  res.send(`Server is listening on the Port${port}`);
});

//apis

app.use("/image",image.getImageUrl());
app.use("/home", home.home());
app.use('/api/v1',auth.auth());
app.use("/api/student",StudentRouter.student());
app.listen(port, () => {
  console.log(`server is listening to the port ${port}`);
});
