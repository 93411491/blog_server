const { isGet } = require("./util/utils");
const { loginCheck } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const method = req.method;
  if (isGet(method) && req.path === "/api/user/login") {
    const username = req.body.username;
    const password = req.body.password;

    if (loginCheck(username, password)) {
      return new SuccessModel("登录成功");
    } else {
      return new ErrorModel("等于失败");
    }
  }
};

module.exports = handleUserRouter;
