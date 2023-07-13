const axios = require("axios");
const HttpError = require("../../model/http-error");

async function getCoordFromAddress(address) {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search/${encodeURIComponent(
      address
    )}?format=json&limit=1&polygon_svg=1`
  );


  const data = response.data;

  if(!data.length) {
    const error = new HttpError("Could not find location for this address",422);
    throw error;
};

const coordiantes = {
    lat: data[0].lat,
    lng: data[0].lon,
  };

  return coordiantes
};
module.exports = getCoordFromAddress