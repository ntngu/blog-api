const Blog = require("../models/Blog");

// Gets all blog posts.
blogRouter.get("/api/blog", async (req, res) => {
  const response = await Blog.find({});
  res.status(200).json(response.data);
});

// Gets a specific blog post.
blogRouter.get("/api/blog/:id", async (req, res) => {
  const id = req.body.id;
  const response = await Blog.findById(id);
  res.status(200).json(response.data);
});

blogRouter.post("/api/")

module.exports = blogRouter;
