const Product = require("../models/productModel");

// Functionality to upload and store the image in mongo
const multer = require("multer");

// Route to handle form submission and the functionality for adding the data to the database for products.
module.exports.addProducts = async (req, res) => {
  try {
    // const storage = multer({ storage: storage });
    const { productNumber, productName, price, status, description, features, image } = req.body;
    console.log("Product number in controller", req.body);
    // const product = new Product({ productNumber,productName,date, price, status });
    // await product.save();
    // Check if image file was uploaded
    if (!req.file) {
      console.log("req.file ", req.file.filename);
      return res.status(400).json({ message: 'No image uploaded', status: false });
    }

    // Access the filename of the uploaded image
    const img = req.file.filename;
    console.log("img ", img);
    const data = await Product.create({
      productNumber,
      productName,
      image: img,
      price,
      status,
      description,
      features
    });
    console.log("data in controller", data);
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