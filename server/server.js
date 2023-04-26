require("dotenv").config();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const portfolioRoutes = require("./routes/portfolio");
const musicianRoutes = require("./routes/musician");
const organizerRoutes = require("./routes/organizer");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");
const eventRoutes = require("./routes/event");

// express app
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express MuseConnect API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/", (req, res) => {
  res.json({ mess: "Welcome to muse-connect server!" });
});
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/musician", musicianRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/event", eventRoutes);

// connect to database
const PORT = process.env.PORT || 4000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    const server = app.listen(PORT, () => {
      console.log("connected to db & listening on port", PORT);
    });
    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        //origin: "http://localhost:3000",
        //origin : "https://sec33-group3-muse-connect-5kdwszn2t-pacharawin.vercel.app"
        origin : '*'
      },
    });

    io.on("connection", (socket) => {
      // connection check
      console.log(`User Connected: ${socket.id}`);

      socket.on("send-message", (userData, room) => {
        if (room === "") {
          console.log("Please enter room");
          // socket.broadcast.emit('receive-message', userData);
        } else {
          console.log("send message to room:", room);
          socket.to(room).emit("receive-message", userData);
        }
      });

      socket.on("join-room", (room) => {
        // console.log("Your are in room", room);
        socket.join(room);
      });

      // socket.on("disconnect", (userData) => {
      //   console.log(userData, socket)
      //   console.log(`User Disconnected: ${userData.id}`);
      // })
    });
  })
  .catch((error) => {
    console.log(error);
  });
