require("dotenv").config();
const express = require("express"); //backend
const mongoose = require("mongoose"); //mongodb driver
const path = require("path");

//initiation
const app = express();

app.use(express.json()); //Bodyparser Middleware

const uri = process.env.MONGO_URI; //MONGO DB URI

//Connect to mongo
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.error(err));

var roleRoutes = require("./routes/api/v1/role"); //importing route
roleRoutes(app);

// Serve Static assets in prod
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000; //port
app.listen(port, () => console.log(`Server run on port ${port}`));
