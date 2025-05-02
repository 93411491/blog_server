const { getList, getDetail, newBlog,updateBlog } = require("../controller/blog");
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
    const data = getDetail(id);
    return new SuccessModel(data);
  }
  if (isPost(method) && req.path === "/api/blog/new") {
    const data = newBlog(req.body);
    console.log(`new blog data , ${data}`);

    return new SuccessModel(data);
  }
  if (isPost(method) && req.path === "/api/blog/update") {
    const data = updateBlog(req.body);
    return new SuccessModel(data);
  }
  if (isPost(method) && req.path === "/api/blog/del") {
    const data = delBlog(req.body);
    if (data) {
      return new SuccessModel(data);
    } else {
      return new ErrorModel("删除失败");
    }
  }
};

module.exports = handBlogRouter;
