import React from "react";
import {useParams} from 'react-router-dom'
import PlaceList from "../components/PlaceList";

const dummy1 = []
const dummy= [
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
function UserPlaces() {
    const userId = useParams().userId;
    const loadedPlaces =dummy.filter(place => place.creator === userId)
  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;
