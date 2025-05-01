const handBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const querystring = require("querystring");

const serverHandler = (req, res) => {
  res.setHeader("Content-type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);

  const blogData = handBlogRouter(req, res);
  console.log("blogData", blogData);

  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  const userData = handleUserRouter(req, res);
  console.log("userData", userData);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  res.writeHead(404, {
    "Content-type": "text/plain",
  });
  res.write("404 not found\n");
  res.end();
};

module.exports = serverHandler;
