require("dotenv").config();

const MONGODB_URL =
  process.env.NODE_EMV === "test"
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL;

const PORT = process.env.PORT;
const SECRET = process.env.SECREt;

module.export = {
  MONGODB_URL,
  PORT,
  SECRET,
};
