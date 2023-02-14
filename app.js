const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const blogsRouter = require("./controllers/blogController");
const usersRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController");
const config = require("./utils/config");
const errorHandler = require("./utils/error_handler");
const tokenHandler = require("./utils/token_handler");
const userHandler = require("./utils/user_handler");

mongoose.connect(config.MONGODB_URL);

app.use(cors());
app.use(express.json());
app.use(tokenHandler);
app.use("/api/blogs", userHandler, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);

module.exports = app;
