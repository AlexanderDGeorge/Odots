const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressGQL = require("express-graphql")
const cors = require("cors");
const path = require("path");

const database = require("../config/keys").MONGO_URI;
const schema = require("./schema/schema");

const app = express();

if (!database) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
  }

mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());
app.use("/graphql", expressGQL(req => {
  return {
    schema,
    context: {token: req.headers.authorization},
    graphiql: true,
  }
}));

module.exports = app;