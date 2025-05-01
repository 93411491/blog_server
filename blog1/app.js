const handBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const serverHandler = (req, res) => {
  res.setHeader("Content-type", "application/json");

  const blogData = handBlogRouter(req, res);
  console.log("blogData",blogData);

  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  const userData = handleUserRouter(req, res);
  console.log("userData",userData);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  res.writeHead(404, {
    "Content-type": "text/plain",
  });
  res.write("404 not found\n");
  res.end()
};

module.exports = serverHandler;
