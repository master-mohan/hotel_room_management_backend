const express = require("express");
const userController = require("../controllers/user.controller/user.controller.js");
const { hasPermission } = require("../controllers/middlewares/permission");
const { catchErrors } = require("../handlers/errorHandlers.js");

const userRouter = express.Router();

//route to create users
userRouter
  .route("/admin/create")
  .post(hasPermission("admin"), catchErrors(userController.create));

module.exports = userRouter;
