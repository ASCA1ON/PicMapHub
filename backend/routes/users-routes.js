const express = require("express");
const { getUsers, singup, login } = require("../controllers/users-controllers");
const { check } = require("express-validator");
const fileupload = require("../middleware/file-upload");

const router = express.Router();


router.get("/", getUsers);

router.post('/signup', fileupload.single('image'), [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(), //! test@E.com = tTEst@e.com
    check("password").isLength({ min: 5 }),
  ], singup)

router.post('/login',login)


module.exports = router;
