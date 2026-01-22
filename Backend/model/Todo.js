const mongoose = require("mongoose");

const todoSchema = new  mongoose.Schema({
    userTask : {type : String},
    complete : {type : Boolean, default : false},
});

mongoose.exports = mongoose.model("Todo", todoSchema);
