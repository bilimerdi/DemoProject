const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  TC: {
    type: "string",
    unique: true,
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  surname: {
    type: "string",
    required: true,
  },
  doctorName: {
    type: "string",
    required: true,
  },
  illness: {
    type: "string",
    required: true,
  },
});

mongoose.model("User", userSchema);
