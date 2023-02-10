require("dotenv").config();

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


// express app
const app = express();

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
  res.json({ mess: "main!" });
});
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/musician", musicianRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// connect to database
const PORT = process.env.PORT || 4000;
mongoose.set("strictQuery", false); 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log("connected to db & listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
