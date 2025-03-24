const router = require("express").Router();
const userRouter = require("./user");
const loginRouter = require("./login");
const signUpRouter = require("./signUp");

router.use("/users", userRouter);
router.use("/login", loginRouter);
router.use("/signup", signUpRouter);

module.exports = router;
