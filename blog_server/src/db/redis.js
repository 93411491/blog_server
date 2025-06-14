const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on("error", (err) => {
  console.error(err);
});

async function connect() {
  await redisClient.connect().then(() => {
    console.log("redis connect success");
  }).catch((err) => {
    console.error(err);
  });
}

connect();

async function set(key, val) {
  const client = redisClient;
  let tempObj = {};
  if (typeof val === "object") {
    tempObj = JSON.stringify(val);
  } else {
    tempObj = val;
  }
  await client.set(key, tempObj);
}

async function get(key) {
    try {
        const client = redisClient;
        const val = await client.get(key);
        if (!val) {
          return null;
        }
        try {
          return JSON.parse(val);
        } catch (err) {
          return val;
        }
    } catch (error) {
        throw error;        
    }
}

module.exports = { set, get };