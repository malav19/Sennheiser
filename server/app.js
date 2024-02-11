const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to Database...."))
  .catch((err) => console.log("db error: " + err));

app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

const port = process.env.PORT || 8081;

const server = app.listen(port, () =>
  console.log(`server is running on port ${port}`)
);
