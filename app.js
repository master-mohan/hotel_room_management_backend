const express = require("express");
const corsOptions = require("./configurations/cors.config");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routers/auth.routers");
const userRouter = require("./routers/user.routers");
const isValidAuthToken = require("./handlers/validateToken");
const cookieParser = require('cookie-parser');
const roomRouters = require("./routers/room.routers");

// secure HTTP headers setting middleware
//app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// allow cross-origin resource sharing
app.use(cors());

app.use(express.json());
app.use(cookieParser());
// sets application API's routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", isValidAuthToken, userRouter);
app.use("/api/v1",isValidAuthToken,roomRouters);
module.exports = app;
