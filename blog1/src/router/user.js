const { isGet, isPost } = require("./util/utils");
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const method = req.method;
  if (isGet(method) && req.path === "/api/user/login") {
    // const username = req.body.username;
    // const password = req.body.password;

    const { username, password } = req.query;

    return login(username, password).then((loginData) => {
      console.log("loginData", loginData);

      if (loginData && loginData.username) {

        req.session.username = loginData.username;
        req.session.realname = loginData.realname;
        
        console.log("login req.session", req.session);
        

        return new SuccessModel();
      } else {
        return new ErrorModel("登录失败");
      }
    });
  }

  //登录验证测试
  if (isGet(method) && req.path === "/api/user/login-test") {
    console.log("handleUserRouter req.session", req.session);

    if (req.session.username) {
      return Promise.resolve(new SuccessModel(req.session));
    }

    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

module.exports = handleUserRouter;
