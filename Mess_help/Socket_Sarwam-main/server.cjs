const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors()); 
app.use(express.static('uploads')); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed!'));
    }
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
  io.emit('active-users', activeUsers); 

  socket.on('new-user-joined', (name) => {
    socket.name = name; 
    socket.broadcast.emit('user-joined', name); 
  });

  socket.on('send', ({ message, name }) => {
    socket.broadcast.emit('received', { message, name }); 
  });

  socket.on('disconnect', () => {
    if (socket.name) { 
      activeUsers--;
      io.emit('active-users', activeUsers); 
      socket.broadcast.emit('left', socket.name); 
    }
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  res.json({ fileUrl });
});

const PORT = 8010;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
