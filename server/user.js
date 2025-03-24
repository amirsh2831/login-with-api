const express = require("express");
const User = require("./userModel");
const router = require("express").Router();

router.get("/", getUsers);
router.post("/new", newUser);

async function newUser(req, res) {
  const { firstName, lastName, pass } = req.query;
  try {
    const newUsers = await User.create({
      firstName: firstName,
      lastName: lastName,
      pass: pass,
    });
    if (newUsers) {
      res.status(200).json("user created....");
    } else {
      res.status(201).json("not enough queries");
    }
  } catch (e) {
    res.status(500).json("Server Error ....");
  }
}

async function getUsers(req, res) {
  // res.send("list of users")
  // const { name } = req.query;
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json("no user found");
    }
  } catch (e) {
    res.status(500).json("server Error...");
  }
}



module.exports = router;
