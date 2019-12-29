const express = require("express");
const app = express();
const pool=require('./db')
const bodyparser = require("body-parser");
const morgan = require("morgan");
const userRegistration = require("./user-registration");
const author = require("./author");

const port = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use("/author", author);
app.use("/registration", userRegistration);
app.get("/", (req, res) => {
  res.send("welcome");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))