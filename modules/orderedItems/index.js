const Products = require("./model/orderedItem");
const express = require("express");
const { validateOrderedItems } = require("./validation/index");
const app = express.Router();

app.get("/", (req, res) => {
  res.send("you are on ordered items page");
});

app.post("/create", async (req, res) => {
  const { error, value } = validateOrderedItems(req.body);
  try {
    if (error) {
      return res.status(400).send("Error during creating ordered item");
    }
    await Products.create(value);
    res.status(201).send("Ordered item has been created");
  } catch (error) {
    res.status(500).send("error on server");
  }
});

app.get("/:id", async (req, res) => {
  try {
    const foundProduct = await Products.findById(req.params.id);
    if (!foundProduct) {
      return res.status(404).send("not found");
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const { error, value } = validateOrderedItems(req.body);
    if (error) {
      return res.status(400).send("Error during updating");
    }
    const changedOrderedItem = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(changedOrderedItem);
  } catch (error) {
    res.status(500).send("Something is wrong with server");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = validateOrderedItems(req.body);
    if (error) {
      return res.status(400).send("Error during deleting!");
    }
    await Products.findByIdAndDelete(value);
    res.status(200).send("Ordered item successfully deleted!");
  } catch (error) {
    res.status(500).send("Error on server!");
  }
});

exports.orderedItemsRoutes = app;
