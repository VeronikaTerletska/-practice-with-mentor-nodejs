const UserModel = require("../models/userModel");

module.exports = rolesArray => {
  return async (req, res, next) => {
    // console.log(rolesArray);
    try {
      const user = await UserModel.findById(req.user.id);
      // console.log("user", user);
      // if (!user) {
      //   res.status(403).json({ code: 403, message: "Not permission" });
      // }

      let hasRole = false;
      user.roles.forEach(role => {
        if (rolesArray.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        res.status(403).json({ code: 403, message: "Not permission" });
      }

      next();
    } catch (err) {
      res
        .status(403)
        .json({ code: 403, message: "Not permission", error: err.message });
    }
  };
};
