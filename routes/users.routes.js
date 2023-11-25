const { Router } = require("express");
const router = Router();
const {
  createUser,
  readAllUsers,
  readUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

// const { validatePost } = require("../middlewares/validatorSimple");
// const { schema } = require("../validators/carsValidator");
const { celebrateValidatorUser } = require("../middlewares/celebrateValidator");
// const { errors } = require("celebrate");

// router.post("/", validatePost(schema), createCar); //C Create
router.post("/", celebrateValidatorUser, createUser); //C Create
router.get("/", readAllUsers); //R ReadAll
router.get("/:userId", readUser); //R Read
router.put("/:userId", updateUser); //U Update
router.delete("/:userId", deleteUser); //D Delete

// router.use(errors);

module.exports = router;
