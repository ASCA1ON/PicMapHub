const { v4: uuidv4 } = require("uuid");
const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");
const getCoordFromAddress = require("./util/location");
const Place = require("../model/place");

let dummy = [
  {
    id: "p1",
    title: "Fushimi Inari-taisha",
    description:
      " head shrine of the kami Inari, located in Fushimi-ku, Kyoto, Kyoto Prefecture, Japan.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Kyoto_FushimiInari01.jpg",
    address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto, 612-0882, Japan",
    location: {
      lat: 34.967311625663136,
      lng: 135.77265023990745,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Fushimi Inari-taisha",
    description:
      " head shrine of the kami Inari, located in Fushimi-ku, Kyoto, Kyoto Prefecture, Japan.",
    imageUrl:
      "https://dskyoto.s3.amazonaws.com/gallery/full/8514/5559/7797/08-20131216_FushimiInari_Mainspot-307.jpg",
    address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto, 612-0882, Japan",
    location: {
      lat: 34.9671402,
      lng: 135.770483,
    },
    creator: "u1",
  },
];

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
  try {
    await createdPlace.save();
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
    return error
  }

  if (!place) {
    const error = next(new HttpError("Could not find a place for provided id", 404)); //!throw for sync only
    return error
  }
  res.json({ place: place.toObject({ getters: true }) }); //! {place} = {place:place}
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (!places.length) {
    return next(new HttpError("Could not find places for provided id", 404)); // for async & sync
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const updatePlaceById = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs, please check again", 422);
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
    const error = next(new HttpError("Could not find a place for provided id", 404)); //! this is for testing only
    return error
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    return next(new HttpError("upadating place failed, please try again.", 500));
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findByIdAndDelete(placeId);
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
