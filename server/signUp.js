const router = require("express").Router();
const User = require("./userModel");

router.post("/", Exist, signup);

async function signup(req, res) {
  const { firstName, lastName, pass } = req.body;

  try {
    const makeUser = await User.create({ firstName, lastName, pass });
    if (makeUser) {
      res.status(200).json("Account Created Successfully...");
    } else {
      res.status(500).json("error...");
    }
  } catch (e) {
    res.status(500).json(e);
  }
}

async function Exist(req, res, next) {
  const { firstName } = req.body;
  try {
    const checkUser = await User.findOne({ firstName: firstName });
    if (checkUser) {
      res.status(400).json("username taken..");
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
}

module.exports = router;
