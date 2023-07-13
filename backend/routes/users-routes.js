const express = require("express");
const { getUsers, singup, login } = require("../controllers/users-controllers");

const router = express.Router();



router.get("/", getUsers);

router.post('/signup',singup)

router.post('/login',login)


module.exports = router;
