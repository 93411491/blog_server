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

module.exports = {
  getList,
  getDetail,
};
