require("dotenv").config();
const Database = require("./db/config");
const User = require("./models/carsModel");

const repl = require("repl");
const replServer = repl.start();
const saludar = () => {
  console.log("¿Cómo están?");
};

const database = new Database();
database.dbConnection;

replServer.context.saludar = saludar;
replServer.context.User = User;
