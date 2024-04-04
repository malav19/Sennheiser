const Product = require("../models/productModel");

// Functionality to upload and store the image in mongo
const multer = require("multer");

// Route to handle form submission and the functionality for adding the data to the database for products.
module.exports.addProducts = async (req, res) => {
  try {
    // const storage = multer({ storage: storage });
    const { productNumber, productName, price, status, description, image } = req.body;
    console.log("add products body", req.body);
    // const product = new Product({ productNumber,productName,date, price, status });
    // await product.save();
    // Check if image file was uploaded
    if (!req.file) {
      // console.log("req.file ", req.file.filename);
      return res.status(400).json({ message: 'No image uploaded', status: false });
    }

    // Access the filename of the uploaded image
    const img = req.file.filename;
    console.log("img ", img);
    const data = await Product.create({
      product: {
        productNumber,
        productName,
        image: img,
        price,
        status,
        description
      }
    });
    console.log("data", data);
    if (data) return res.json({ message: 'Product saved successfully', status: true });
    else return res.json({ msg: "Failed to add message to the database", status: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    // console.log("in get products funciton");
    const products = await Product.find();
    // console.log("In get products ", products);
    return res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports.deleteProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the entire req.body object
    const productId = req.body.productId; // Assuming the product ID is sent in the request body
    console.log("Product ID", productId);
    const deletedProduct = await Product.findByIdAndDelete(productId);
    // Use findByIdAndRemove directly without {} findByIdAndRemove({ _id: req.body._id });
    if (!deletedProduct) {
      // Product not found with the given ID
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    console.log("Product deleted:", deletedProduct); // Log deleted product for debugging
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error("Error deleting product:", err); // Log error for debugging
    res.status(500).json({ success: false, error: err.message });
  }
};


// Route to handle form submission and the functionality for adding the data to the database for products.
module.exports.updateProduct = async (req, res) => {
  try {
    console.log("here in update product");
    const { _id, ...product } = req.body;
    console.log("update products body", product, _id);
    // if (!req.file) {
    //   // console.log("req.file ", req.file.filename);
    //   return res.status(400).json({ message: 'No image uploaded', status: false });
    // }

    // Access the filename of the uploaded image
    const img = req.file?.filename;
    console.log("img ", img);
    const finalProduct = { ...product, image: img };
    console.log("final Product ", finalProduct);

    // const data = await Product.updateOne({ product });
    const data = await Product.findByIdAndUpdate(
      { _id },
      { $set: { "product": finalProduct } });
    // .updateOne({ _id: product._id }, product);
    console.log("data", data);
    if (data) return res.json({ message: 'Product updated successfully', status: true, data });
    else return res.json({ msg: "Failed to update product to the database", status: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};