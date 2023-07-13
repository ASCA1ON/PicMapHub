const { v4: uuidv4 } = require("uuid");
const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");

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

const getPlaceById = (req, res) => {
  const placeId = req.params.pid;
  const place = dummy.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for provided id", 404); //!throw for sync only
  }
  res.json({ place }); //! {place} = {place:place}
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = dummy.filter((p) => {
    return p.creator === userId;
  });
  if (!places.length) {
    return next(new HttpError("Could not find places for provided id", 404)); // for async & sync
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs, please check again", 422);
  }

  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  dummy.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs, please check again", 422);
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;

  const pl = dummy.find((p) => {
    return p.id === placeId;
  });
  if (!pl) {
    throw new HttpError("Could not find a place for provided id", 404);
  }
  const updatedPlace = {
    ...dummy.find((p) => {
      return p.id === placeId;
    }),
  };
  const placeIndex = dummy.findIndex((p) => {
    return p.id === placeId;
  });

  updatedPlace.title = title;
  updatedPlace.description = description;
  dummy[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  if (!dummy.find(p => p.id === placeId)) {
    throw new HttpError("Could not find a place for provided id", 404);
  }

  dummy = dummy.filter((p) => {
    return p.id !== placeId;
  });
  // if (!place) {
  //   throw new HttpError("Could not find a place for provided id", 404);
  // }
  res.status(200).json({ message: "Place Deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
