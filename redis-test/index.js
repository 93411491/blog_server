const redis = require("redis");

const redisClient = redis.createClient(6379, "127.0.0.1");

redisClient.on("error", (err) => {
  console.error(err);
});

async function test() {
    try {
        await redisClient.connect();
        await redisClient.set("mykey", "myvalue");
        const val = await redisClient.get("mykey");
        console.log("val", val);
    } catch (error) {
        console.error(error);
    } finally {
        await redisClient.quit();
    }
}

test();