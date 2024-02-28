const create = require("./create");

const createUserController = (userModel) => {
  let userController = {};

  userController.create = (req, res) => create(userModel, req, res);

  return userController;
};

module.exports = createUserController;
