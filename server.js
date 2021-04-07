const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const cors = require('cors');

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });


const users = require('./routes/api/users.js');

const Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  stock: String,
  price: String,
  shortDesc: String,
  description: String
});

var ProductModel = mongoose.model("product", productSchema);

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
); 
app.use(bodyParser.json());
// DB Config
const db = require('./config/keys.js').mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport.js")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

//gets data at api / movies
app.get('/products', (req, res) => {
 
  //finds all docs in database
  ProductModel.find((err, data) => {
      res.json(data);
      console.log(data);
  })

})

app.post('/products', (req, res) => {
  console.log('product received');
  console.log(req.body.name);

  ProductModel.create({
    name:req.body.name,
    stock:req.body.stock,
    price:req.body.price,
    shortDesc:req.body.shortDesc,
    description:req.body.description
  })

  res.send('Item added');
})

app.delete('/products/:id',(req, res) => {
  console.log("Delete Product: "+req.params.id);

  ProductModel.findByIdAndDelete(req.params.id,(err, data) => {
    res.send(data);
  })
})