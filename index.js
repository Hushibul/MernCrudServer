const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/UserRoute");
const authRouter = require("./routes/AuthRoute");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", userRouter);
app.use("/api", authRouter);

mongoose
  .connect(process.env.DB_URL)
  .then(console.log("Database connected!"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Server is running!");
});
