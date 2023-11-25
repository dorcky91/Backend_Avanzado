const { request, response } = require("express");
const Car = require("../models/carsModel");

const createCar = async (req = request, res = response) => {
  try {
    const { body } = req;
    const car = new Car(body);
    await car.save();
    res.status(201).json({
      message: "Registro de coche creado con éxito",
      car,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al Registrar coche",
      error,
    });
  }
};

const readAllCars = async (req = request, res = response) => {
  try {
    const { limit = 20 } = req.query;
    const queryParam = { active: true };
    const recordLength = await Car.countDocuments();
    const car = await Car.find(queryParam).limit(Number(limit));
    res.status(200).json({
      recordLength,
      car,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al leer Registro de coche",
      error,
    });
  }
};

const readCar = async (req = request, res = response) => {
  try {
    const { carId } = req.params;
    const carToShow = await Car.findById(carId);

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
      message: carToShow != null ? "Registro encontrado" : "Registro no existe", //Operador ternario
      carToShow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al leer Registro de coche",
      error,
    });
  }
};

const updateCar = async (req = request, res = response) => {
  try {
    const { params, body } = req;
    const { carId } = params;
    await Car.findByIdAndUpdate(carId, body);
    const carToShow = await Car.findById(carId);
    res.status(202).json({
      message: "Registro modificado con éxito",
      carToShow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al actualizar este coche",
      error,
    });
  }
};

const deleteCar = async (req = request, res = response) => {
  try {
    const { carId } = req.params;
    const deleteState = { active: false };
    await Car.findByIdAndUpdate(carId, deleteState);
    const carToShow = await Car.findById(carId);
    res.status(403).json({
      message: "El registro de coche se eliminó con éxito",
      carToShow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo ocurrió al querer eliminar al registro de coche",
    });
  }
};

module.exports = {
  createCar,
  readAllCars,
  readCar,
  updateCar,
  deleteCar,
};
