const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
//const sendMail = require('./sendMail');
const { CRUD } = require("../../../models/crud.model");

// Custom validator for phone numbers
function isValidPhoneNumber(value, helpers) {
  if (!/^\d{10}$/.test(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}

// Joi schema with custom phone number validation
const objectSchema = Joi.object({
  phone: Joi.string()
    .required()
    .custom(isValidPhoneNumber, "custom phone validation"),
  password: Joi.string().required(),
});

const login = async (userModel, req, res) => {
  //console.log("(((((())))))", userModel, req.body);
  const { username: phone, password } = req.body;

  const { error, value } = objectSchema.validate({ phone, password });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: "Invalid/Missing credentials.",
      errorMessage: error.message,
    });
  }

  const user = await CRUD.findOne(userModel, {
    phone: phone,
    isDeleted: false,
  });

  if (!user)
    return res.status(404).json({
      success: false,
      result: null,
      message: "No account with this phone number has been registered.",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(403).json({
      success: false,
      result: null,
      message: "Invalid credentials.",
    });

  // if (!user.phoneIsVerified) {
  //   const appEmail = "";
  //   await sendMail({ email: user.email, name: user.name });
  //   return res.status(403).json({
  //     success: false,
  //     result: null,
  //     message: "your email account is not verified , check your email inbox",
  //   });
  // }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: req.body.remember ? "365d" : "1h",
      algorithm: "HS256",
    }
  );

  await CRUD.findOneAndUpdate(
    userModel,
    { _id: user._id },
    { $push: { loggedSessions: token }, $set: { token: token } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    result: {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      role: user.role,
      email: user.email,
      photo: user.photo,
      token: token,
    },
    message: "Successfully login user",
  });
};

module.exports = login;
