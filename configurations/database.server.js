const mongoose = require("mongoose");
require('dotenv').config({ path: '.env' });

const turnOnMongoDBServer = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected MongoDB Database"))
    .catch((err) => console.log("failed to connect MongoDb"));
};

module.exports = { turnOnMongoDBServer };
