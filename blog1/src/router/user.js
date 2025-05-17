const { isGet, isPost } = require("./util/utils");
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const method = req.method;
  if (isPost(method) && req.path === "/api/user/login") {
    const username = req.body.username;
    const password = req.body.password;

    return login(username, password).then((loginData) => {
      console.log("loginData", loginData);

      if (loginData && loginData.username) {
        return new SuccessModel();
      } else {
        return new ErrorModel("登录失败");
      }
    });
  }
};

module.exports = handleUserRouter;
