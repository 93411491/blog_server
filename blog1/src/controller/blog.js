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
  console.log("updateBlog id", id, "blogData", blogData);
  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blogs set title='${title}', content='${content}' where id='${id}'`;
  return exec(sql).then((updateData) => {
    console.log("updateData", updateData);
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then((delData) => {
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
