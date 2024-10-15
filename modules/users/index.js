const Users = require("./model/users");
const express = require("express");
const app = express.Router();

app.post("/", async function (req, res) {
  try {
    const user = await Users.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    req.status(500).json({ message: error.message });
  }
});
app.get("/", async (req, res) => {
  try {
    const user = Users.find({});
    res.status(200).json(user);
  } catch (error) {
    req.status(500).json({ message: error.message });
  }
});

exports.usersRoutes = app;
