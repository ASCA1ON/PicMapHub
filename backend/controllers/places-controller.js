const { v4: uuidv4 } = require('uuid')
const HttpError = require("../model/http-error");

const dummy = [
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
    throw new HttpError("Could not find a place for provided id", 404);
  }
  res.json({ place }); // {place} = {place:place}
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = dummy.filter((p) => {
    return p.creator === userId;
  });
  if (!place.length) {
    return next(new HttpError("Could not find a user for provided id", 404));
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id:uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  dummy.push(createdPlace)
  res.status(201).json({place:createdPlace})
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
