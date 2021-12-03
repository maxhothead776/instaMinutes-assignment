const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const route = require("./routes/route");

app.use("/", route);

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://user-open-to-all-trainees:AutogenerateSecurePassword@training-cluster.xohin.mongodb.net/groupCDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb running on 27017"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
