require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(bodyParser.urlencoded({ extended: true }));

const mongoUri = "mongodb+srv://sa:as@cluster0.gqhdgld.mongodb.net/";

mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

module.exports = app;
