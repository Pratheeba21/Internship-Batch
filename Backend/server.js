//load the express package
const express = require("express");

//create an object for routing 
const app = express();

app.get("/", (req,res) => {res.send("Get method from port -  http://localhost:3000")});

app.get("/show", (req, res) => {res.send("Get method from show page from port - http://localhost:3000/show");})

//start the server
// syntax = objname.listen(portno, arrow function)
//arrow = () => {//operations}
app.listen(3000, () => {console.log("Server started")});