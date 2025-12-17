require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Create express app
const app = express();

// Create HTTP server (required for socket.io)
const http = require("http").createServer(app);

// Socket.io
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Attach io to every request (so controllers can emit events)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));     // fixed
app.use("/api/vitals", require("./routes/vitalRoutes"));   // fixed
app.use("/api/logs", require("./routes/logRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));



// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// PORT FIX — prevents crash when PORT undefined
const PORT = process.env.PORT || 8000;

// Start server
http.listen(PORT, () => console.log("Server running on port", PORT));
