require('dotenv').config();
const fs = require("fs")
const path = require("path")
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./model/http-error");
const placeRoutes = require("./routes/places-routes");
const userRouter = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads/images', express.static(path.join('uploads','images')))

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH , DELETE')
  next()
})

app.use("/api/places", placeRoutes);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  throw new HttpError("Oops unable to find this route", 404);
});

app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path, (err)=>{
      console.log(err);
    })
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

port = 5000
mongoose.connect(process.env.MONGODB_URI).then(
  app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
).catch(
  err=>{console.log(err);}
);




