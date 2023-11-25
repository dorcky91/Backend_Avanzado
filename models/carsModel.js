const { Schema, model } = require("mongoose");

const carSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Se requiere ingresar el nombre del coche."],
  },

  kilometraje: {
    type: Number,
    required: [true, "Se requiere ingresar el kilometraje del coche."],
  },

  precio: {
    type: Number,
    required: [true, "Se requiere ingresar el precio del coche."],
  },

  modelo: {
    type: String,
    required: [true, "Se requiere ingresar el modelo del coche."],
  },

  color: {
    type: String,
    required: [true, "Se requiere ingresar el color del coche."],
  },

  marca: {
    type: String,
    required: [true, "Se requiere ingresar la marca del coche."],
  },

  anio: {
    type: Number,
    required: [true, "Se requiere ingresar el año del coche."],
  },

  sku: {
    type: String,
    required: [true, "Se requiere ingresar el sku del coche."],
  },

  imagen: {
    type: String,
  },

  origen: {
    type: String,
    required: [true, "Se requiere ingresar el origen del coche."],
  },

  active: {
    type: Boolean,
    default: true,
  },
});
module.exports = model("Car", carSchema);
