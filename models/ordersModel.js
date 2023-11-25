const { Schema, model } = require("mongoose");

const orderSchema = Schema({
  usuario_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Se requiere ingresar tu nombre de usuario."],
  },
  coche_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Se requiere ingresar el producto que deseas comprar."],
  },

  cantidad: {
    type: Number,
    required: [true, "Se requiere ingresar la cantidad que deseas comprar."],
    default: 1,
  },

  fecha: {
    type: Date,
    default: new Date(),
  },
});
module.exports = model("Order", orderSchema);
