const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    pass: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "users");
