const login = require("./login");

const createAuthController = (userModel) => {
  let authController = {};
  authController.login = (req, res) => login(userModel, req, res);
  return authController;
};

module.exports = createAuthController;
