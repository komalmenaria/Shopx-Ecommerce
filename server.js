const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const bodyParser = require('body-parser')


const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api',authRoutes);

// used in production to serve client files
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// connecting to mongoDB and then running server on port 4000
const dbURI = config.get("dbURI");
const port = process.env.PORT || 4000;

mongoose.set('strictQuery', true);
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log(dbURI))
  .then(() => console.log('MongoDB connection established.') ,app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
.catch((error) => console.error("MongoDB connection failed:", error.message))