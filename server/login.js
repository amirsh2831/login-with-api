const express = require("express");
const User = require("./userModel");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/", Login);

async function Login(req, res) {
  const { firstName, pass } = req.body;
  try {
    const login = await User.findOne({ firstName: firstName });
    if (login) {
      if (login.pass == pass) {
        const token = jwt.sign({ id: login._id }, process.env.SEC_KEY, {
          expiresIn: "1d",
        });
        const { pass, ...others } = login._doc;
        res.status(200).json({ ...others, token });
      } else {
        res.status(403).json("user credentials is wrong");
      }
    } else {
      res.status(404).json("user credentials is wrong");
    }
  } catch (e) {
    res.status(500).json("something went wrong");
  }
}

module.exports = router;
