const serverHandler = (req, res) => {
  res.setHeader("Content-type", "application/json");

  const resData = {
    name: "wangzhirui",
    site: "blog",
    env: process.env.NODE_ENV
  };

  res.end(JSON.stringify(resData));
};

module.exports = serverHandler;
