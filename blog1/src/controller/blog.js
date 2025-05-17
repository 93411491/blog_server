const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;
  return exec(sql);
};

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((rows) => {
    console.log("rows", rows);
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  console.log("newBlog blogData", blogData);
  const title = blogData.title;
  const content = blogData.content;
  const author = "张三";
  const createTime = Date.now();
  const sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', '${createTime}')`;
  return exec(sql).then((insertData) => {
    console.log("insertData", insertData);
    return {
      id: insertData.insertId,
    };
  });
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
