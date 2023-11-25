const { Schema, model } = require("mongoose");

const AddressSchema = Schema({
  calle: {
    type: String,
  },
  numero: {
    type: Number,
  },

  colonia: {
    type: String,
  },
  ciudad: {
    type: String,
  },

  estado: {
    type: String,
  },
});

// const orderSchema = Schema({
//   coche_id: {
//     type: Schema.Types.ObjectId,
//     required: [true, "Se requiere ingresar el producto que deseas comprar."],
//   },

//   cantidad: {
//     type: Number,
//     required: [true, "Se requiere ingresar la cantidad que deseas comprar."],
//   },

//   fecha: {
//     type: Date,
//     default: new Date(),
//   },
// });

const userSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Se requiere ingresar el nombre del usuario."],
  },

  apellido: {
    type: String,
    required: [true, "Se requiere ingresar el apellido del usuario."],
  },

  nombreUsuario: {
    type: String,
    required: [true, "Se requiere ingresar el nombre de usuario."],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Se requiere ingresar el email de usuario."],
    unique: true,
  },

  telefono: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "Se requiere ingresar la contraseña del usuario."],
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  active: {
    type: Boolean,
    default: true,
  },

  // order: [orderSchema],
  order: {
    type: Array,
    ref: "Order",
  },

  // Embedido
  direccion: {
    type: AddressSchema,
  },
});
module.exports = model("User", userSchema);
