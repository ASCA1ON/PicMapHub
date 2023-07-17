const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const HttpError = require("./model/http-error");
const placeRoutes = require("./routes/places-routes");
const userRouter = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/places", placeRoutes);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  throw new HttpError("Oops unable to find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown eroor occurred!" });
});

port = 5000
mongoose.connect(process.env.MONGODB_URI).then(
  app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
).catch(
  err=>{console.log(err);}
);




