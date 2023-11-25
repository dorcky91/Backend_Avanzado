const Joi = require("joi");

const schemaCar = Joi.object().keys({
  nombre: Joi.string().required().messages({
    "string.base": "El nombre del caro que quieres ingresar es requerido",
    "string.empty": "El campo de nombre no puede estar vacío",
    // "string.min":"El nombre del coche debe contener al menos {#limit} caracteres"
  }),
  kilometraje: Joi.number().required(),
  precio: Joi.number().required(),
  modelo: Joi.string().required(),
  color: Joi.string().required(),
  marca: Joi.string().required(),
  precio: Joi.number().required(),
  anio: Joi.number().required(),
  sku: Joi.string().required(),
  imagen: Joi.string().required(),
  origen: Joi.string().required(),
});
module.exports = { schemaCar };
