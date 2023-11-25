const Joi = require("joi");

const schemaUser = Joi.object().keys({
  nombre: Joi.string().required().messages({
    "string.base": "El apellido del usuario que quieres ingresar es requerido",
    "string.empty": "El campo de apellido no puede estar vacío",
    // "string.min":"El nombre del coche debe contener al menos {#limit} caracteres"
  }),
  apellido: Joi.string().required(),
  nombreUsuario: Joi.string().required(),
  email: Joi.string().email().required(),
  telefono: Joi.string(),
  password: Joi.string().required(),
  // direccion: Joi.string().required(),
});
module.exports = { schemaUser };
