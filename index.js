const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT}`);
  });
});
