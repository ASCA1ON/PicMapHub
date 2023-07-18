const { v4: uuidv4 } = require("uuid");
const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");
const User = require("../model/user");


const getUsers = async (req, res, next) => {
  let users
  try{
    users = await User.find({},'-password') //! -password to ignore password or 'email name' to get these 2
  }catch {
    return  next( new HttpError("Unable to fetch details", 500))
  }
  res.json({users : users.map((user)=>user.toObject({getters:true}))})
 };

const singup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check again", 422))
  }

  const { name, email, password} = req.body;

  let existingUser
  try{
    existingUser = await User.findOne({email:email})
  }catch {
    return  next( new HttpError("Error signing up", 500))
  }

  if(existingUser){
    return  next( new HttpError("User already exists, please try logging in", 422))
  }

  const createdUser = new User({
    name, //! name:name
    email,
    image:"https://upload.wikimedia.org/wikipedia/commons/c/c3/Kyoto_FushimiInari01.jpg",
    password,
    places:[]
  });
  
  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again.", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async(req, res, next) => {
  const { email, password } = req.body;
  let existingUser
  try{
    existingUser = await User.findOne({email:email})
  }catch {
    return  next( new HttpError("Error logging in", 500))
  }

  if(!existingUser || existingUser.password !== password){
    return  next( new HttpError("Invalid email or password, please check again", 401))
  }

  res.json({ message: "Logged in sucesssfully!" });
};

exports.getUsers = getUsers;
exports.singup = singup;
exports.login = login;
