const handBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const querystring = require("querystring");
const { isGet } = require("./src/router/util/utils");

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (isGet(req.method)) {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandler = (req, res) => {
  res.setHeader("Content-type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);

  getPostData(req).then((postData) => {
    const blogData = handBlogRouter(req, res);

    if (blogData) {
      blogData.then((blogData) => {
        console.log("blogData", blogData);
        res.end(JSON.stringify(blogData));
      });
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
  });
};

module.exports = serverHandler;
