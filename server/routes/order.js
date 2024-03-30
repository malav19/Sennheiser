const { addOrder, getOrders } = require("../controllers/orderController");
const router = require("express").Router();
// Create a new order
router.post("/addOrder", addOrder);
router.get("/getOrders", getOrders);

module.exports = router;
