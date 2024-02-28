const { generate: uniqueId } = require("shortid");
const { CRUD } = require("../../../models/crud.model");
const bcrypt = require('bcryptjs');

const create = async (userModel, req, res) => {
  // const User = mongoose.model(userModel);
  // const UserPassword = mongoose.model(userModel + 'Password');

  let { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      result: null,
      message: "Email or password fields they don't have been entered.",
    });

  const existingUser = await CRUD.findOne(userModel, { email: email });

  if (existingUser)
    return res.status(400).json({
      success: false,
      result: null,
      message: "An account with this email already exists.",
    });

  if (password.length < 8)
    return res.status(400).json({
      success: false,
      result: null,
      message: "The password needs to be at least 8 characters long.",
    });

  const salt = await bcrypt.genSalt(8);
  const passwordHash = await bcrypt.hash(password, salt);

  req.body.password = passwordHash;
  req.body.isDeleted = false;

  const result = await CRUD.create(userModel, req.body);

  if (!result) {
    return res.status(403).json({
      success: false,
      result: null,
      message: "document couldn't save correctly",
    });
  }

  return res.status(200).send({
    success: true,
    result: {
      _id: result._id,
      email: result.email,
      name: result.name,
      surname: result.surname,
      //photo: result.photo,
      role: result.role,
    },
    message: "User document save correctly",
  });
};

module.exports = create;
