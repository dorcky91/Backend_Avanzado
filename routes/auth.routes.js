const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const validateToken = require("../middlewares/jwtValidator");

const router = Router();

router.post(
  "/register",
  validateToken(process.env.LLAVE_SECRETA),
  registerUser
);
router.post("/login", loginUser);

module.exports = router;
