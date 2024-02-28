//this middleware will check if the user has permission

exports.hasPermission = (permissionName = "none") => {
  return function (req, res, next) {
    if (req.user.role == permissionName) {
      next();
    } else {
      
      res.status(401).json({ success: false, message: "Unauthorized access" });
    }
  };
};
