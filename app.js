//jshint esversion:6

//Packages
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
var _ = require('lodash');
//CONFIG
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Mongoose Code
mongoose.connect('mongodb+srv://admin:******@cvb-klustr0.ksjmg.mongodb.net/todoListDB', {useNewUrlParser: true, useUnifiedTopology: true});
const itemSchema = new mongoose.Schema ({
  name: String
});
const Item = new mongoose.model("Item", itemSchema);

//Default Data
const item1 = new Item ({
  name: "Hi! Welcome to To-Do List v2"
});
const item2 = new Item ({
  name: "To add a new task, click +"
});
const item3 = new Item ({
  name: "<-- Hit this to delete tasks"
});
const defaultArray = [item1, item2, item3];

//ROUTES
app.get("/", function(req, res) {

const day = date.getDate();
Item.find(function(err, itemz) {
  if (itemz.length === 0)
  {
    Item.insertMany(defaultArray);
    res.redirect("/");
  }
  else
  {
    res.render("list", {listTitle: day, newListItems: itemz});
  }
});
});

app.post("/", function(req, res){
  
  //for New Item
  const newItemName = req.body.newItem;
  const newItemDoc = new Item ({
    name: newItemName
  });
  newItemDoc.save();

  //redirect request
    res.redirect("/");
});

app.post("/delete", function(req,  res){
  
  //for deleting item
  const deleteItem = req.body.checkbox;
  Item.findByIdAndRemove(deleteItem, function(err){
    if(!err)
    console.log("Successfully removed");
  });
  
  //redirect request
  res.redirect("/");
})
//Server Callback
app.listen(process.env.PORT || 3000, function() {
  console.log("Skynet is live");
});
