const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use = bodyParser.json();

const dbUser = "organicProduct";
const dbPass = "2zG20hqySsaxatsa";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const uri =
  "mongodb+srv://organicProduct:2zG20hqySsaxatsa@cluster0.shttn.mongodb.net/organicDb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



client.connect((err) => {
  const productCollection = client.db("organicDb").collection("products");
  app.post("/addProduct", (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
    .then(result => {
        console.log("data added successfully");
        res.send("successfully sent")
    })

  });
});


client.connect(err => {
    const productCollection = client.db("organicDb").collection("products");

    app.get("/products", (req, res) => {
        productCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);

        })
    })
})

app.delete("/delete/:id", (req, res) => {
  const productCollection = client.db("organicDb").collection("products");
  productCollection.deleteOne({_id: ObjectId(req.params.id)})
})


app.listen("3000", () => {
  console.log("Server is running on 3000");
});
