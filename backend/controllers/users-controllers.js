const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");
const User = require("../model/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password"); //! -password to ignore password or 'email name' to get these 2
  } catch {
    return next(new HttpError("Unable to fetch details", 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const singup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check again", 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Error signing up", 500));
  }

  if (existingUser) {
    return next(
      new HttpError("User already exists, please try logging in", 422)
    );
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("creating user failed, please try again.", 500));
  }

  const createdUser = new User({
    name, //! name:name
    email,
    image: req.file.path, //! or save full path 'http://loc...+upl linked in userItem fe
    password: hashPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again.", 500));
  }
  let token;
  try {
    token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_SECRET,{expiresIn:'1h'});
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again.", 500));
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token:token});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    return next(new HttpError("Error logging in", 500));
  }

  if (!existingUser) {
    return next(new HttpError("Invalid email, please check again", 403));
  }
  let isPwdChk = false;
  try {
    isPwdChk = await bcrypt.compare(password, existingUser.password);
  } catch {
    return next(new HttpError("Error logging in", 500));
  }

  if (!isPwdChk) {
    return next(new HttpError("Invalid password, please check again", 403));
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET,{expiresIn:'1h'});
  } catch (err) {
    return next(new HttpError("Logging in failed, please try again", 500));
  }

  res.json({ userId: existingUser.id, email: existingUser.email, token:token});
};

exports.getUsers = getUsers;
exports.singup = singup;
exports.login = login;
