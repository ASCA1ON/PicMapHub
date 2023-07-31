const axios = require("axios");
const HttpError = require("../../model/http-error");
const Nominatim = require("nominatim-geocoder");

async function getCoordFromAddress(address) {
  //! original code api issues
  // const response = await axios.get(
  //   `https://nominatim.openstreetmap.org/search/${encodeURIComponent(
  //     address
  //   )}?format=json&limit=1&polygon_svg=1`
  // );
  //   const data = response.data;

  //   if(!data.length) {
  //     const error = new HttpError("Could not find location for this address",422);
  //     throw error;
  // };

  // const coordiantes = {
  //     lat: data[0].lat,
  //     lng: data[0].lon,
  //   };

  //! alternative
  // const formatted = address.replace(/, | /g, "+");

  // requestUrl = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${formatted}&format=json&limit=1`
  // const response = await axios.get(requestUrl);
  //   try {
  //     const response = await axios.get(requestUrl);
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('API request failed');
  //   }

  const geocoder = new Nominatim();

  async function search(query) {
    try {
      const response = await geocoder.search({ q: query });
      return response;
    } catch (error) {
      throw new HttpError(error+ ' location api issues');
    }
  }

  const response = await search(address);

    const data = response;

    if(!data.length) {
      const error = new HttpError("Could not find location for this address",422);
      throw error;
  };

  const coordiantes = {
      lat: data[0].lat,
      lng: data[0].lon,
    };

  return coordiantes;
}
module.exports = getCoordFromAddress;
