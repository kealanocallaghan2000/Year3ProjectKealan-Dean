const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");

const users = require('./routes/api/users.js');

const Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  stock: String,
  price: String,
  shortDesc: String,
  description: String
});

var ProductModel = mongoose.model("product collection", productSchema);

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

app.post('/add-product', (req, res) => {
  console.log('product received');
  console.log(req.body.shortDesc);
})