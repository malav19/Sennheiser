const Product = require("../models/productModel");

// Route to handle form submission and the functionality for adding the data to the database for products.
module.exports.addProducts = async (req, res) => {
  try {
    const { productNumber, productName, date, price, status } = req.body;
    console.log("Product number in controller", productNumber);
    // const product = new Product({ productNumber,productName,date, price, status });
    // await product.save();

    const data = await Product.create({
      productNumber: productNumber,
      productName: productName,
      date: date,
      price: price,
      status: status,
    });
    if (data) return res.json({ message: 'Product saved successfully', status: true });
    else return res.json({ msg: "Failed to add message to the database", status: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    console.log("in get products funciton");
    const products = await Product.find();
    console.log("In get products ", products);
    return res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};