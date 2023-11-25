const { Router } = require("express");
const router = Router();
const {
  createOrder,
  readAllOrders,
  readAllOrdersAdmin,
  readOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController");

router.post("/", createOrder); //C Create
router.get("/", readAllOrders); //R ReadAll
router.get("/admin/", readAllOrdersAdmin); //R ReadAll
router.get("/:orderId", readOrder); //R Read
router.put("/:orderId", updateOrder); //U Update
router.delete("/:orderId", deleteOrder); //D Delete

module.exports = router;
