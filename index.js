const express = require("express");
const mongoose = require("mongoose");
const routes = require("./controllers/blogController");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(compression());
  app.use(helmet());
  app.use("/api", routes);
  app.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT}`);
  });
});
