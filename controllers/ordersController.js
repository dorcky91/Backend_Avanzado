const { request, response } = require("express");
const Order = require("../models/ordersModel");
const User = require("../models/usersModel");

const createOrder = async (req = request, res = response) => {
  try {
    const { body } = req;
    const { usuario_id } = body;

    //verificar usuario
    const usuario = await User.findById(usuario_id);
    //Si existe guardar pedido
    if (usuario != null) {
      const order = new Order(body);
      await order.save();

      //Luego update los pedidos del usuario en cuestión
      await User.findByIdAndUpdate(usuario_id, {
        // $push: { order: order._id },
        $push: {
          order: order,
        },
      }),
        res.status(201).json({
          message: "Pedido exitoso",
          order,
        });
    }
    //Si no existe el usuario mostrar mensaje de error
    else {
      res.status(404).json({
        message: "Error al generar el pedido, usuario no existe",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Se detectó un problema al realizar tu pedido",
      error,
    });
  }
};

const readAllOrders = async (req = request, res = response) => {
  try {
    // const queryParam = { active: true };
    const recordLength = await Order.countDocuments();
    const order = await Order.find();
    res.status(200).json({
      recordLength,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Se detectó un problema al consultar tu pedido",
      error,
    });
  }
};

const readAllOrdersAdmin = async (req = request, res = response) => {
  try {
    const recordLength = await Order.countDocuments();
    const order = await Order.aggregate([
      {
        $lookup: {
          from: "cars",
          foreignField: "_id",
          localField: "coche_id",
          as: "carDetails",
        },
      },
      {
        $unwind: "$carDetails",
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "usuario_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      // {
      //   $project: {
      //     "carDetails.nombre": 1,
      //     "userDetails.nombre": 1,
      //   },
      // },
    ]);

    res.status(200).json({
      recordLength,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Se detectó un problema al consultar tu pedido",
      error,
    });
  }
};

const readOrder = async (req = request, res = response) => {
  try {
    const { orderId } = req.params;
    const orderToShow = await Order.findById(orderId);

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
        orderToShow != null ? "Registro encontrado" : "Registro no existe", //Operador ternario
      orderToShow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al consultar tu pedido",
      error,
    });
  }
};

const updateOrder = async (req = request, res = response) => {
  try {
    const { params, body } = req;
    const { orderId } = params;
    await Order.findByIdAndUpdate(orderId, body);
    const orderToShow = await Order.findById(orderId);
    res.status(202).json({
      message: "Actualización de pedido con éxito",
      orderToShow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al actualizar tu pedido",
      error,
    });
  }
};

const deleteOrder = async (req = request, res = response) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    const orderToShow = await Order.findById(orderId);
    res.status(403).json({
      message: "Tu pedido ha sido eliminado con éxito",
      orderToShow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al querer eliminar tu pedido",
    });
  }
};

module.exports = {
  createOrder,
  readAllOrders,
  readAllOrdersAdmin,
  readOrder,
  updateOrder,
  deleteOrder,
};
