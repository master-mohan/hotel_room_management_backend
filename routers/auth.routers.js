const express = require("express");
const authController = require("../controllers/auth.controller/auth.controller.js");
const { catchErrors } = require("../handlers/errorHandlers.js");

const authRouter = express.Router();

// route to handle login
authRouter.route("/admin/login").post(catchErrors(authController.login));

module.exports = authRouter;
