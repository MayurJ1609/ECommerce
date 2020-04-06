require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("MONGO DB CONNECTION ERROR - IN CATCH");
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});

/* ---------------------------MYSQL CONNECTION CODE COMMENTED---------------------------------
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "my_db",
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log(
    "MYSQL DB CONNNECTED --- SAMPLE SOLUTION IS:",
    results[0].solution
  );
});

connection.end(); */
