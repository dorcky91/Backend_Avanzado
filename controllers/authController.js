const { request, response } = require("express");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LLAVE_SECRETA = process.env.LLAVE_SECRETA;

const registerUser = async (req = request, res = response) => {
  try {
    const {
      nombre,
      nombreUsuario,
      password,
      email,
      apellido,
      telefono,
      isAdmin,
    } = req.body;
    const user = await User.findOne({ nombreUsuario });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = new User({
        nombre,
        nombreUsuario,
        email,
        apellido,
        telefono,
        password: hashedPassword,
        isAdmin,
      });
      await user.save();

      res.status(201).json({
        message: "El usuario fue creado con éxito",
      });
    } else {
      res.status(403).json({
        message: "El nombre de usuario ya existe",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al crear usuario",
      error,
    });
  }
};

const loginUser = async (req = request, res = response) => {
  const { nombreUsuario, password } = req.body;
  const user = await User.findOne({ nombreUsuario });

  if (!user) {
    return res.status(403).json({
      message: "El usuario no fue encontrado",
    });
  }

  const correctPassword = bcrypt.compareSync(password, user.password);
  if (correctPassword) {
    const token = jwt.sign(
      { id: user._id, nombreUsuario: user.nombreUsuario, admin: user.isAdmin },
      LLAVE_SECRETA
    );
    res.status(200).json({
      token,
      usuario_id: user._id,
    });
  } else {
    res.status(403).json({
      message: "La contraseña no es correcta",
    });
  }
};

module.exports = { registerUser, loginUser };
