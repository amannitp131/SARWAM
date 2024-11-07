import { Server, Socket } from 'socket.io';

let activeUsers = 0;

interface MessagePayload {
  message: string;
  name: string;
}

interface SocketWithName extends Socket {
  name?: string;
}

export function setupChat(io: Server) {
    io.on('connection', (socket: SocketWithName) => {
      console.log(`A user connected with ID: ${socket.id}`);
      activeUsers++;
      console.log(activeUsers, 'active users');
  
      io.emit('active-users', activeUsers);
  
      socket.on('new-user-joined', (name: string) => {
        console.log(`${name} has joined the chat`);
        socket.name = name;
        socket.broadcast.emit('user-joined', name);
      });
  
      socket.on('send', ({ message, name }: MessagePayload) => {
        console.log(`Message from ${name}: ${message}`);
        socket.broadcast.emit('received', { message, name });
      });
  
      socket.on('disconnect', () => {
        if (socket.name) {
          activeUsers--;
          io.emit('active-users', activeUsers);
          socket.broadcast.emit('left', socket.name);
          console.log(`${socket.name} has left the chat`);
        }
      });
    });
  }
  
