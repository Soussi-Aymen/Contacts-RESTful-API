const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const contacts = require("./routes/api/contacts");

const app = express();

//Bodyparser Middlewere
app.use(bodyParser.json());

//mongo-uri
const db = "mongodb://localhost:27017/contactdb";

//connection to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected ..."))
  .catch(err => console.log(err));

//handeling the router
app.use("/", contacts);

//starting the server
const port = process.env.PORT || 5000;
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is runing on port ", port);
  }
});
