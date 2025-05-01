const { isGet } = require("./util/utils");

const handleUserRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split("?")[0];
  const query = url.split("?")[1];
  console.log(`method :${method} , url : ${url} , path : ${path} , query : ${query}`);


  if (isGet(method) && path === "/api/user/login") {
    return {
      msg: "这是登录接口",
    };
  }
};

module.exports = handleUserRouter;
