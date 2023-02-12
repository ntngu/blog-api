const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const config = require("./utils/config");
const errorHandler = require("./utils/error_handler");
const tokenHandler = require("./utils/token_handler");
const userHandler = require("./utils/user_handler");

const blogRouter = require("./controllers/blogController");
const loginRouter = require("./controllers/loginController");
const userRouter = require("./controllers/userController");


mongoose.connect(config.MONGO_DB);

app.use(cors);
app.use(express.json());
app.use(compression);
app.use(helmet);
app.use(tokenHandler);
app.use("/api/blogs", userHandler, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(userHandler);
app.use(errorHandler);

module.exports = app;
