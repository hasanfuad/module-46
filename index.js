const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use = bodyParser.json();

// const dbUser = "organicProduct";
// const dbPass = "2zG20hqySsaxatsa";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const uri =
  "mongodb+srv://organicProduct:2zG20hqySsaxatsa@cluster0.shttn.mongodb.net/organicDb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const productCollection = client.db("organicDb").collection("products");

app.get("/product/:id", (req, res) => {
  productCollection.find({_id: ObjectId(req.params.id)})
  .toArray((err, documents)=>{
    res.send(documents[0]);
  })
})



client.connect((err) => {
  app.post("/addProduct", (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
    .then(result => {
        console.log("data added successfully");
        res.redirect("/");
    })

  });
});


client.connect(err => {

    app.get("/products", (req, res) => {
        productCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);

        })
    })
})

app.patch("/update/:id", (req, res) => {
  productCollection.updateOne({_id: ObjectId(req.params.id)},
  {
    $set: {price: req.body.price, quantity: req.body.quantity}
  })
  .then(result => {
    console.log(result);
  })
  
})

app.delete("/delete/:id", (req, res) => {
  productCollection.deleteOne({_id: ObjectId(req.params.id)})
  .then( result => {
    res.send(result.deletedCount > 0)
  })
})


app.listen("3000", () => {
  console.log("Server is running on 3000");
});
