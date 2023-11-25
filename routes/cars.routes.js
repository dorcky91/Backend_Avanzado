const { Router } = require("express");
const router = Router();
const {
  createCar,
  readAllCars,
  readCar,
  updateCar,
  deleteCar,
} = require("../controllers/carsController");

// const { validatePost } = require("../middlewares/validatorSimple");
// const { schema } = require("../validators/carsValidator");
const { celebrateValidatorCar } = require("../middlewares/celebrateValidator");
// const { errors } = require("celebrate");

// router.post("/", validatePost(schema), createCar); //C Create
router.post("/", celebrateValidatorCar, createCar); //C Create
router.get("/", readAllCars); //R ReadAll
router.get("/:carId", readCar); //R Read
router.put("/:carId", updateCar); //U Update
router.delete("/:carId", deleteCar); //D Delete

// router.use(errors);

module.exports = router;
