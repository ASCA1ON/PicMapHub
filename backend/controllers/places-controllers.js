const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../model/http-error");
const getCoordFromAddress = require("./util/location");
const Place = require("../model/place");
const User = require("../model/user");

const createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check again", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordFromAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Kyoto_FushimiInari01.jpg",
    creator,
  });

  let user
  try{
    user = await User.findById(creator)
  }catch {
    return  next( new HttpError("Creating place failed", 500))
  }
  if(!user){
    return  next( new HttpError("Could not find user for provided id", 404))
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction()
    await createdPlace.save({session : sess});
    user.places.push(createdPlace)
    await user.save({session : sess});
    await sess.commitTransaction()

  } catch (err) {
    return next(new HttpError("creating place failed, please try again.", 500));
  }

  res.status(201).json({ place: createdPlace });
};

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = next(new HttpError("Something went wrong.", 500));
    return error;
  }

  if (!place) {
    const error = next(
      new HttpError("Could not find a place for provided id", 404)
    ); //!throw for sync only
    return error;
  }
  res.json({ place: place.toObject({ getters: true }) }); //! {place} = {place:place}
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  // let places;
  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }
  res.json({
    places: userWithPlaces.places.map((place) => place.toObject({ getters: true }))
  });
};

const updatePlaceById = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check again", 422))
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
  if (!place) {
    const error = next(
      new HttpError("Could not find a place for provided id", 404)
    ); //! this is for testing only
    return error;
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    return next(
      new HttpError("upadating place failed, please try again.", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
  if(!place){
    return  next( new HttpError("Could not find place for provided id", 404))
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction()
    await place.deleteOne({session : sess});
    place.creator.places.pull(place)
    await place.creator.save({session : sess});
    await sess.commitTransaction()

  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  res.status(200).json({ message: "Place Deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
