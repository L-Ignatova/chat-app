const expess = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  USER_STARTED_TYPING,
  USER_STOPPED_TYPING,
  USER_IS_TYPING,
  USER_IS_NOT_TYPING,
  ON_CONNECTION
} = require("../src/utils/constants.js");

const app = expess();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

// this starts running when someone starts using the server
io.on(ON_CONNECTION, (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on(SEND_MESSAGE, ({author, message}) => {
    io.emit(RECEIVE_MESSAGE, { author, message });
  });

  socket.on(USER_STARTED_TYPING, () => {
    socket.broadcast.emit(USER_IS_TYPING);
  });
  socket.on(USER_STOPPED_TYPING, () => {
    socket.broadcast.emit(USER_IS_NOT_TYPING);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
})
