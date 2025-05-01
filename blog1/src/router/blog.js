const { isGet, isPost } = require("./util/utils");
const handBlogRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split("?")[0];
  const query = url.split("?")[1];

  console.log(`method :${method} , url : ${url} , path : ${path} , query : ${query}`);
  

  if (isGet(method) && path === "/api/blog/list") {
    return {
      msg: "get blog list",
    };
  }

  if (isGet(method) && path === "/api/blog/detail") {
    return {
      msg: "get blog detail",
    };
  }
  if (isPost(method) && path === "/api/blog/new") {
    return {
      msg: "new blog",
    };
  }
  if (isPost(method) && path === "/api/blog/update") {
    return {
      msg: "update blog",
    };
  }
  if (isPost(method) && path === "/api/blog/del") {
    return {
      msg: "delete blog",
    };
  }
};

module.exports = handBlogRouter;
