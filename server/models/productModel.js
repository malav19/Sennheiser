const mongoose = require("mongoose");

// Added product schema for adding it to the Database
// Define Product schema
const productSchema = new mongoose.Schema({
  product: {
    productNumber: Number,
    productName: String,
    price: Number,
    image: String,
    status: String,
    description: String,
    features: [String],
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
// ending here the functionality for adding the data to the database
