const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "*", "http://localhost:3000"],
    credentials: true,
  })
);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
connectDB();

app.use("/", router);

app.listen(process.env.APP_PORT, () => {
  console.log("app is running on localhost port 3000");
});
