const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const dbUser = "organicProduct";
const dbPass = "2zG20hqySsaxatsa";

const uri =
  "mongodb+srv://organicProduct:2zG20hqySsaxatsa@cluster0.shttn.mongodb.net/organicDb?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("organicDb").collection("products");
    const product = { name: "modhu", price: 24, qty: 10};
    collection.insertOne(product)
    .then(res => {
        console.log("one product added", res);
    })
});

app.get("/", (req, res) => {
  res.send("Learning mongo db");
});

app.listen("3000", () => {
  console.log("Server is running on 3000");
});
