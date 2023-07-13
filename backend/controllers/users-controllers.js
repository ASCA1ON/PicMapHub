const { v4: uuidv4 } = require("uuid");
const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");

dummyU = [
  {
    id: "u1",
    name: "aman",
    email: "aman@abc.com",
    password: "asdfgh",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: dummyU });
};

const singup = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs, please check again", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = dummyU.find((u) => u.email == email);
  if (hasUser) {
    throw new HttpError("User already exists, please try logging in", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name, //! name:name
    email,
    password,
  };
  dummyU.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = dummyU.find((u) => u.email == email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Invalid email or password, please check again", 401);
  }
  res.json({ message: "Logged in sucesssfully!" });
};

exports.getUsers = getUsers;
exports.singup = singup;
exports.login = login;
