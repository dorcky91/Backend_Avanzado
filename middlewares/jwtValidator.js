const jwt = require("jsonwebtoken");

const validateToken = (secret) => {
  return (req, res, next) => {
    console.log(req.headers);

    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    const payload = jwt.verify(token, secret);

    console.log(payload);
    const isAdmin = payload.admin;
    if (isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "El usuario no es un administrador",
      });
    }
  };
};
module.exports = validateToken;
