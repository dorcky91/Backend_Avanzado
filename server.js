const express = require("express");
const cors = require("cors");
const Database = require("./db/config");
const { errors } = require("celebrate");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.database = new Database();
    this.carsPath = "/api/v1/cars";
    this.usersPath = "/api/v1/users";
    this.ordersPath = "/api/v1/orders";
    this.authPath = "/api/v1/auth";
    this.middlewares();
    this.dbConnection();
    this.router();
  }

  async dbConnection() {
    await this.database.dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static("public"));
  }

  router() {
    this.app.use(this.carsPath, require("./routes/cars.routes"), errors());
    this.app.use(this.usersPath, require("./routes/users.routes"), errors());
    this.app.use(this.ordersPath, require("./routes/orders.routes"));
    this.app.use(this.authPath, require("./routes/auth.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Esta aplicación está corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
