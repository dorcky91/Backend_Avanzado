const { celebrate, Segments } = require("celebrate");
const { schemaCar } = require("../validators/carsValidator");
const { schemaUser } = require("../validators/usersValidator");

const celebrateValidatorCar = celebrate({ [Segments.BODY]: schemaCar });
const celebrateValidatorUser = celebrate({ [Segments.BODY]: schemaUser });
module.exports = { celebrateValidatorCar, celebrateValidatorUser };
