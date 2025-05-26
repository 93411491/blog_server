const handBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const querystring = require("querystring");
const { isGet } = require("./src/router/util/utils");

const SESSION_DATA = {};

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (isGet(req.method)) {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
    console.log("getPostData postData:", postData);
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandler = (req, res) => {
  res.setHeader("Content-type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);

  //Cookie 解析
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }
    const [key, value] = item.split("=");
    req.cookie[key.trim()] = value.trim();
  });
  console.log("req.cookie", req.cookie);

  //session 解析
  let userId = req.cookie.userid;
  let needSetCookie = false;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
    needSetCookie = true;
  }
  req.session = SESSION_DATA[userId];


  getPostData(req).then((postData) => {
    req.body = postData;
    const blogData = handBlogRouter(req, res);

    if (blogData) {
      blogData.then((blogData) => {
        console.log("getPostData blogData", blogData);
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly;`);
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    const userData = handleUserRouter(req, res);
    if (userData) {
      userData.then((userData) => {
        console.log("getPostData userData", userData);
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly;`);
        } 
        res.end(JSON.stringify(userData));
      });
      return;
    }

    res.writeHead(404, {
      "Content-type": "text/plain",
    });
    res.write("404 not found\n");
    res.end();
  });
};

module.exports = serverHandler;
