const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const userRouter = require("./routes/UserRoute");
const authRouter = require("./routes/AuthRoute");
const productRoute = require("./routes/ProductRoute");
const errorHandler = require("./middleware/ErrorHandler");
const { PassportConfig } = require("./middleware/PassportConfig");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.JWT_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.set("view engine", "ejs");

app.use("/api", userRouter);
app.use("/auth", authRouter);
app.use("/api", productRoute);

app.use(passport.initialize());
app.use(passport.session());

//File access express
app.use(express.static("uploads"));

//Passport Config
PassportConfig(passport);

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/success", (req, res) => res.render("profile"));
app.get("/error", (req, res) => res.render("error"));

//DB Connection
mongoose
  .connect(process.env.DB_URL)
  .then(console.log("Database connected!"))
  .catch((err) => console.log(err));

//Server Start
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

//Error Middleware
app.use(errorHandler);
