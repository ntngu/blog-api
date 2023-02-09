const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.objectId, ref: "User" },
  date: { type: Date, required: true },
  content: { type: String, required: true, minLength: 1 }
});

module.exports = mongoose.model("Comment", commentSchema);