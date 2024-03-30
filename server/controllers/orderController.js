// Controller file
const Order = require("../models/orderModel");

module.exports.addOrder = async (req, res) => {
  try {
    const orders = req.body;

    const savedOrders = [];
    for (const orderData of orders) {
      const { userId, username, productName, price, quantity } = orderData;

      const order = await Order.create({
        userId,
        username,
        productName,
        price,
        quantity,
      });

      // const savedOrder = await order.save();
      // savedOrders.push(savedOrder);
    }

    res.status(201).json(savedOrders);
  } catch (error) {
    console.error("Error adding orders:", error);
    res
      .status(500)
      .json({ message: "Error adding orders", error: error.message });
  }
};

module.exports.getOrders = async (req, res) => {
  try {
    // console.log("in get orders funciton");
    const orders = await Order.find();
    // console.log("In get orders ", orders);
    return res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
