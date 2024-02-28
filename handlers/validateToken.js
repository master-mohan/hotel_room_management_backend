const jwt = require("jsonwebtoken");
const { userModel } = require("../models/helpers/user.crud.definition");

//It is to validate the token, whether the users contain valid token or not
const isValidAuthToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization.split(" ");
    const token = authHeader[1];

    if (!token || authHeader[0] !== "BookingRoom")
      return res.status(401).json({
        success: false,
        result: null,
        message: "No authentication token, authorization denied.",
        jwtExpired: true,
      });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.status(401).json({
        success: false,
        result: null,
        message: "Token verification failed, authorization denied.",
        jwtExpired: true,
      });

    const user = await userModel.findOne({
      _id: verified.id,
      isDeleted: false,
    });

    if (!user)
      return res.status(401).json({
        success: false,
        result: null,
        message: "User doens't Exist, authorization denied.",
        jwtExpired: true,
      });

    const userToken = user.token;

    if (!userToken.includes(token))
      return res.status(401).json({
        success: false,
        result: null,
        message: "User is already logout try to login, authorization denied.",
        jwtExpired: true,
      });
    else {
      const reqUserName = user?.name?.toLowerCase();
      req.user = user;
      next();
    }
  } catch (error) {
    error.expiredAt = new Date(error.expiredAt.getTime() + 5.5 * 3600 * 1000);
    return res.status(503).json({
      success: false,
      result: null,
      message: error.message,
      error: error,
      controller: "isValidAuthToken",
    });
  }
};

module.exports = isValidAuthToken;
