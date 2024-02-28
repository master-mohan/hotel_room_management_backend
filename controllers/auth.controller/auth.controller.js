const { userModel } = require("../../models/helpers/user.crud.definition.js");
const createAuthController = require("./middlewares/index.js");

const authController = createAuthController(userModel);

module.exports = authController;