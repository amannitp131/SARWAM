import express from "express";
import http from "http";
import { loadEnv } from "../config/dotenv.config";
import { Server } from "socket.io";
import { setupChat } from "./chat.help";

const app = express();
loadEnv();

export function socketConnection() {
  try {
    const server = http.createServer(app);

    if (!process.env.FRONTEND_URL) {
      console.error("FRONTEND_URL is not defined in .env file");
      process.exit(1);
    }

    const io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    setupChat(io);

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
    // function startSocketIOServer(port:number) {
//   const app = express();
//   const server = http.createServer(app);
//   const io = new Server(server, {
//       cors: {
//           origin: process.env.FRONTEND_URL,
//           // methods: ["GET", "POST"],
//           // credentials: true,
//       },
//       // path: '/socket.io',
//   });
//   let activeUsers = 0;

// io.on('connection', (socket:any) => {
//   activeUsers++;
//   // console.log("a user is no",activeUsers)
//   io.emit('active-users', activeUsers);

//   socket.on('new-user-joined', (name:string) => {
//     socket.name = name;
//     // socket.broadcast.emit('user-joined', name);
//   });

//   socket.on('send', (data: { message: string; name: string }) => {
//     const { message, name } = data;
//     // console.log('message',message,'data',data)
//     socket.broadcast.emit('received', { message, name });
//   });
  
//   socket.on('disconnect', () => {
//     if (socket.name) {
//       activeUsers--;
//       io.emit('active-users', activeUsers);
//       // socket.broadcast.emit('left', socket.name);
//     }
//   });
// });

  

//   server.listen(port, () => {
//       console.log(`Listening on port ${port}`);
//   });
// }

// startSocketIOServer(7000);

  } catch (e) {
    console.log("An error occurred during socket connection", e);
  }
}
