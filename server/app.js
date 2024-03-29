const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
require("dotenv").config();

const app = express();
app.use(express.json());
console.log("MongoUrl ", process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to Database...."))
  .catch((err) => console.log("db error: " + err));

app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.static('uploads'));
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
const port = process.env.PORT || 8081;

const server = app.listen(port, () =>
  console.log(`server is running on port ${port}`)
);
