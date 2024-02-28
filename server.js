const app = require("./app");
const { turnOnMongoDBServer } = require("./configurations/database.server");
require('dotenv').config({ path: '.env' });

//It will connect MongoDB database server
turnOnMongoDBServer();

//Turn on express server for request and response
app.listen(process.env.PORT, () => {
  console.log("listening on server http://localhost:", process.env.PORT);
});
