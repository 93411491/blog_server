const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel } = require("../model/resModel");
const { isGet, isPost } = require("./util/utils");
const handBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  if (isGet(method) && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword | "";
    return getList(author, keyword).then((listData) => {
      return new SuccessModel(listData);
    });
  }

  if (isGet(method) && req.path === "/api/blog/detail") {
    // const id = req.query.id;
    // const data = getDetail(id);
    // return new SuccessModel(data);
    return getDetail(req.query.id).then((detailData) => {
      return new SuccessModel(detailData);
    });
  }
  if (isPost(method) && req.path === "/api/blog/new") {
    console.log("req.body", req.body);

    return newBlog(req.body).then((newBlogData) => {
      return new SuccessModel(newBlogData);
    });
  }
  if (isPost(method) && req.path === "/api/blog/update") {
    return updateBlog(id, req.body).then((val) => {
      if (val) {
        return new SuccessModel();
      }
      return new ErrorModel("更新失败");
    });
  }
  if (isPost(method) && req.path === "/api/blog/del") {
    const author = "张三";
    return delBlog(id, author).then((val) => {
      if (val) {
        return new SuccessModel();
      }
      return new ErrorModel("删除失败");
    });
  }
};

module.exports = handBlogRouter;
