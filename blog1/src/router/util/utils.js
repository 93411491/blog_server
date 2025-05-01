function isGet(method) {
  return method === "GET";
}

function isPost(method) {
  return method === "POST";
}

module.exports = {
  isGet,
  isPost,
};
