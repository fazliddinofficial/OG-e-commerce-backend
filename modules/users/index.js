const Users = require("./model/users");
const express = require("express");
const { validateCreatedUser } = require("./validation/users");
const app = express.Router();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is users page");
});

app.post("/", async function (req, res) {
  try {
    const { error, value } = validateCreatedUser(req.body);
    if (error) {
      return res.status(400).send("Error during creating user");
    }
    const createdUser = await Users.create(value);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateCreatedUser(req.body);
    if (error) {
      return res.status(400).send("User not found");
    }
    await Users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send("User successfully updated");
  } catch (error) {
    res.status(500).send("Error on server");
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await Users.find({});
    if (!users) {
      res.status(404).send("Users not found");
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.delete("/", async (req, res) => {
  try {
    const user = req.body;
    const foundUser = await Users.findOneAndDelete(user);
    if (!foundUser) {
      res.status(404).send("User not found!");
      return;
    }
    res.status(200).send("User successfully deleted!");
  } catch (error) {
    res.status(400).send(error);
  }
});

exports.usersRoutes = app;
