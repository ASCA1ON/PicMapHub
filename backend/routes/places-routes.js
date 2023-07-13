const express = require("express");
const { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById } = require("../controllers/places-controllers");

const router = express.Router();



router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post('/',createPlace)

router.patch("/:pid", updatePlaceById);

router.delete("/:pid", deletePlaceById);

module.exports = router;
