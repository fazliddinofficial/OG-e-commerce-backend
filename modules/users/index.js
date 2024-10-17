const Users = require("./model/users");
const express = require("express");
const app = express.Router();

app.use(express.json());

app.post("/users", async function (req, res) {
  try {
    const user = req.body;
    if (!user) {
      res.status(404).send("error during creating user");
    }
    const createdUser = await Users.create(user);
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    req.status(500).send(error);
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const user = Users.findById(id);
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    req.status(500).send(error);
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = Users.find({});
    if (!users) {
      res.status(404).send("Users not found");
    }
    res.status(200).json(users);
  } catch (error) {
    req.status(500).send(error);
  }
});
app.delete("/users/user", async (req, res) => {
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
