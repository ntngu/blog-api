const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(express.json());
  app.use("/api", routes);
  app.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT}`);
  });
});
