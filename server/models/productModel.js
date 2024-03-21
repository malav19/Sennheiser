const mongoose = require("mongoose");


// Added product schema for adding it to the Database
// Define Product schema
const productSchema = new mongoose.Schema({
    productNumber:Number,
    productName: String,
    price: Number,
    date: String,
    status: String,
  });
  
  const Products=mongoose.model("Product",productSchema);
  module.exports=Products;
  // ending here the functionality for adding the data to the database