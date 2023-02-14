const Blog = require("../models/Blog");
const User = require("../models/User");
const blogRouter = require("express").Router();

// Gets all blog posts.
blogRouter.get("/", async (req, res) => {
  const response = await Blog.find({});
  res.status(200).json(response.data);
});

// Gets a specific blog post.
blogRouter.get("/:id", async (req, res) => {
  const id = req.body.id;
  const response = await Blog.findById(id);
  res.status(200).json(response);
});

blogRouter.delete("/:id", async (req, res) => {
  const { id } = req.body;
  const user = req.user;

  const blog = await Blog.findById(id);
  if (blog === null) {
    return res.status(404).json({ error: "not found" });
  }
  if (blog.user.toString() !== user.id.toString()) {
    return res.status(400).json({ error: "not authorized" });
  }

  const result = await Blog.deleteOne(req.body);
  user.blogs.pull(id);
  const deleteResult = await user.save();
  res.status(200).json(result);
});

blogRouter.post("/", async (req, res, next) => {
  const { title, content } = req.body;
  const user = req.user;
  const blog_post = new Blog({
    title: title,
    date: new Date(),
    user: user,
    content: content,
  });
  blog_post.save((err) => {
    if (err) {
      next(err);
    }
  });
  user.blogs = user.blogs.concat(blog_post._id);
  await user.save();
  res.status(201).json(blog_post);
});

blogRouter.put("/:id", async (req, res, next) => {
  const { title, content, id } = req.body;
  const user = req.user;
  let blog = await Blog.findById(id);
  if (blog === null) {
    return res.status(404).json({ error: "not found" });
  }
  if (blog.user.toString() !== user.id.toString()) {
    return res.status(400).json({ error: "not authorized" });
  }

  blog = {
    title: title,
    content: content,
  };

  const result = await Blog.updateOne(blog);
  return res.status(200).json(result);
});

module.exports = blogRouter;
