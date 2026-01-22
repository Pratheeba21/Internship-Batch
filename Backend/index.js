const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./model/Todo");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/todoapps")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {});

app.post("/", (req, res) => {});

app.put("/", (req, res) => {});

app.delete("/", (req, res) => {});

app.listen(3000, () => {
  console.log("Server started, and running in port 3000");
});
