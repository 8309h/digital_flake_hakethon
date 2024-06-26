const express = require("express");
const connection = require("./config/db");
const UserRouter = require("./routes/userRoutes");
const ProductRouter = require("./routes/productRoutes")
const bodyParser = require("body-parser");
const authentication = require("./middlewares/authentication");
const CategoryRouter = require("./routes/categoryRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Wel-come to the HomePage");
});

app.use("/user", UserRouter);
app.use("/category", authentication, CategoryRouter);
app.use("/product", authentication,ProductRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DataBase");
  } catch (err) {
    console.log("Not connected to Database");
    console.log(err);
  }
  console.log(`Server run on the port ${process.env.PORT} `);
});
