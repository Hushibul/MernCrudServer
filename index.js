const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routes/UserRoute");
const authRouter = require("./routes/AuthRoute");
const productRoute = require("./routes/ProductRoute");
const errorHandler = require("./middleware/ErrorHandler");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", productRoute);

//DB Connection
mongoose
  .connect(process.env.DB_URL)
  .then(console.log("Database connected!"))
  .catch((err) => console.log(err));

//Server Start
app.listen(process.env.PORT, () => {
  console.log("Server is running!");
});

//Error Middleware
app.use(errorHandler);
