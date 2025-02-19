const { Router } = require("express");
const Product = require("./model/product");
const { validateCreatedProduction } = require("./validation/index");

const productsRoute = Router();

productsRoute.post("/", async (req, res) => {
  try {
    const { error, value } = validateCreatedProduction(req.body);
    if (error) {
      res.status(400).send(error);
      return;
    }
    const product = await Product.create(value);
    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during creating the product");
  }
});

productsRoute.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = validateCreatedUser(req.body);
    if (error) {
      return res.status(400).send(error);
    }
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(value);
    if (!product) {
      return res.status(404).send("Product not found!");
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

productsRoute.get("/", async (req, res) => {
  try {
    const foundProduct = await Product.find({});
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(404).send("not found");
  }
});

productsRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.status(200).json(foundProduct);

  } catch (error) {
    res.status(404).send("Product not found");
  }
});

productsRoute.delete("/", async (req, res) => {
  try {
    const product = req.body;
    const foundProduct = await Product.findOneAndDelete(product);

    if (!foundProduct) {
      return res.status(404).send("product not found");
    }

    res.status(200).send("deleted successfully");
  } catch (error) {
    res.status(400).send("error during deleting the product");
  }
});

productsRoute.get("/", (req, res) => {
  res.send("you are main page");
});

exports.productsRoute = productsRoute;
