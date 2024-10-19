const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const { usersRoutes } = require("./modules/users/index");
const { productsRoute } = require("./modules/products/index");

app.use(express.json());
const PORT = 9000;

app.use("/users", usersRoutes);
app.use("/products", productsRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("Mongodb connected"));
app.listen(PORT, () => console.log(`sever run on ${PORT}`));
