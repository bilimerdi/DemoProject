const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

const routes = express.Router();

routes.post("/signup", async (req, res) => {
  const { TC, name, surname, doctorName, illness } = req.body;
  try {
    const user = new User({ TC, name, surname, doctorName, illness });
    await user.save();
    res.send("ok");
  } catch (err) {
    console.error("Error creating user:", err.message);
    return res.status(422).send(err.message);
  }
});

routes.get("/find/:name/:surname", async (req, res) => {
  const { name, surname } = req.params;
  const user = await User.findOne({ name, surname });
  res.json(user);
});

routes.get("/findAll", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

routes.delete("/delete/:TC", async (req, res) => {
  const TC = req.params.TC;
  await User.findOneAndDelete({ TC });
  res.json({ message: "User deleted successfully" });
});

module.exports = routes;
