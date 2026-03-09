const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./model/Todo");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Pratheeba:PratheebaMongoDBAtlas@cluster0.ixnufht.mongodb.net/todoapps?appName=Cluster0",
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

 app.get("/todos", async (req, res) => {
  const todoget = await Todo.find();
  res.json(todoget);
});

app.post("/todos", async (req, res) => {
  const todopost = new Todo({ userTask: req.body.userTask });
  await todopost.save();
  res.json(todopost);
});

app.put("/todos/:id", async (req, res) => {
  const todoput = await Todo.findByIdAndUpdate(
    req.params.id,
    { complete: req.body.complete },
    { new: true },
  );
  res.json(todoput);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started, and running in port 3000");
});

