// Conectarse con la base de datos

// Se conecta a través de mongoose
const mongoose = require("mongoose");

// Se crea una clase para hacer la conección
class Database {
  constructor() {
    this.connection = process.env.MONGO_CNN_DEV;
  }

  async dbConnection() {
    try {
      await mongoose.connect(this.connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Estás conectado a la base de datos");
    } catch (error) {
      console.log(error);
      throw new Error("Error a la hora de conectarse a la base de datos");
    }
  }
}

module.exports = Database;
