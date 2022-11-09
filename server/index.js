const expess = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

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
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
  })
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
})
