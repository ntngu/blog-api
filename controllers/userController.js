const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/User");

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users.data);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length < 3) {
    res.status(400).json({ error: "password length is too short" });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: username,
      name: name,
      passwordHash: passwordHash,
    });

    user.save((err) => {
      if (!err) {
        res.status(200).json(user);
      } else {
        next(err);
      }
    })
  }
});

module.exports = userRouter;