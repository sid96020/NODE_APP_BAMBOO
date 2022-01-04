var MongoClient = require('mongodb').MongoClient;
const express = require("express");
const app = express();
var url = "mongodb://3.7.73.160:27017/";
let data;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  const users = require("./user.json");
  dbo.collection("customers").insertMany(users, function(err, res) {
    if (err) throw err;

    console.log("Number of documents inserted: " + res.insertedCount);
  })
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    data=result;
    db.close();
  });
});
app.listen(5000, () => {
    console.log(`Server is up and running on 5000 ...`);
  });
  app.get("/", (req, res) => {
    res.send(data);
});
