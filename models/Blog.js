const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true, minLength: 1 },
  date: { type: Date, required: true },
  author: { type: mongoose.Schema.Types.objectId, ref: "User" },
  content: { type: String, required: true, minLength: 1 },
  comments: [{ type: String }]
});

blogSchema.set("toJSON", {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
  }
})

module.exports = mongoose.model("Blog", blogSchema);