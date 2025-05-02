const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      author: "张三",
      createTime: 1546666666666,
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      author: "李四",
      createTime: 1546666666667,
    },
  ];
};

const getDetail = (id) => {
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
  };
};

const newBlog = (blogData = {}) => {
  return {
    id: 3,
  };
};

const updateBlog = (id, blogData = {}) => {
  console.log(` 更新 blog`);
  
  return {
    id: 1,
  };
};

const delBlog = (id) => {
  console.log(` 删除 blog`);
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
