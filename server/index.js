const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const User = require("./models/User")
const Seat = require("./models/Seat")
const { Server } = require('socket.io')
const http = require("http")

const seatRoutes = require("./routes/seatRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET","POST"]
  }
});

let connectedClients = 0;

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  connectedClients++;

  socket.on('changeColor', (id) => {
    io.emit('colorChanged', (id));
  });

  console.log(connectedClients)
  socket.on("disconnect", () => {
    connectedClients--;
    console.log("User Disconnected", socket.id);
  });
})



dotenv.config()
const PORT = process.env.PORT

app.use("/api", seatRoutes)
app.use("/user", userRoutes)

server.listen(PORT,() => console.log("Connected to port:", PORT))
