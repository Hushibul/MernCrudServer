const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/UserRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/base")
  .then(console.log("Database connected!"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server is running!");
});
