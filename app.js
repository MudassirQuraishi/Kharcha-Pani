const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(bodyParser.json());

app.use("/user", userRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connection established");
    app.listen(process.env.PORT);
    console.log(
      `Connected the backend server and listening on ${process.env.PORT}`
    );
  })
  .catch((error) => {
    console.log(`Error while connecting to database ${error.message}`);
  });
