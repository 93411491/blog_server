const { getList } = require("../controller/blog");
const { SuccessModel } = require("../model/resModel");
const { isGet, isPost } = require("./util/utils");
const handBlogRouter = (req, res) => {
  const method = req.method;

  if (isGet(method) && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword | "";
    const data = getList(author, keyword);
    return new SuccessModel(data);
  }

  if (isGet(method) && req.path === "/api/blog/detail") {
    const id = req.query.id;
    const data = getDetail(req.query.id);
    return new SuccessModel(data);
  }
  if (isPost(method) && req.path === "/api/blog/new") {
    return {
      msg: "new blog",
    };
  }
  if (isPost(method) && req.path === "/api/blog/update") {
    return {
      msg: "update blog",
    };
  }
  if (isPost(method) && req.path === "/api/blog/del") {
    return {
      msg: "delete blog",
    };
  }
};

module.exports = handBlogRouter;
