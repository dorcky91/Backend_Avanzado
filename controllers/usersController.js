const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/usersModel");

const createUser = async (req = request, res = response) => {
  try {
    const { nombre, nombreUsuario, password, email, apellido, telefono } =
      req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      nombre,
      nombreUsuario,
      email,
      apellido,
      telefono,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({
      message: "Registro de usuario fue creado con éxito",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al dar de alta al Registro de usuario",
      error,
    });
  }
};

const readAllUsers = async (req = request, res = response) => {
  try {
    const { limit = 20 } = req.query;
    const queryParam = { active: true };
    const recordLength = await User.countDocuments();
    const user = await User.find(queryParam).limit(Number(limit));
    // .populate("order");
    res.status(200).json({
      recordLength,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al leer Registro de usuario",
      error,
    });
  }
};

const readUser = async (req = request, res = response) => {
  try {
    const { userId } = req.params;
    const userToShow = await User.findById(userId).populate("order");

    // //Opción 1
    // if (carToShow == null) {
    //   res.status(200).json({
    //     message: "Registro no existe",
    //     carToShow,
    //   });
    // } else {
    //   res.status(200).json({
    //     message: "Registro encontrado",
    //     carToShow,
    //   });
    // }

    // //Opción 2
    // let mensaje = "Registro no existe";
    // if (carToShow != null) mensaje = "Registro encontrado";

    res.status(200).json({
      //   message: mensaje, //Opcion 2
      message:
        userToShow != null ? "Registro encontrado" : "Registro no existe", //Operador ternario
      userToShow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al leer Registro de usuario",
      error,
    });
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    const { params, body } = req;
    const { userId } = params;

    await User.findByIdAndUpdate(userId, body);
    const userToShow = await User.findById(userId);
    res.status(202).json({
      message: "Registro modificado con éxito",
      userToShow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al actualizar este usuario",
      error,
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    const { userId } = req.params;
    const deleteState = { active: false };
    await User.findByIdAndUpdate(userId, deleteState);
    const userToShow = await User.findById(userId);
    res.status(403).json({
      message: "El registro de usuario se eliminó con éxito",
      userToShow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al querer eliminar al registro de usuario",
    });
  }
};

module.exports = {
  createUser,
  readAllUsers,
  readUser,
  updateUser,
  deleteUser,
};
