import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";

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

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = dummy.find((p) => p.id === placeId);
  
  const [formState, inputHandler] =useForm({
    title:{
      value:identifiedPlace.title,
      isValid:true      
    },
    description:{
      value:identifiedPlace.description,
      isValid:true      
    }
  },true)
  
  
    const updatePlaceSubmitHandler = event =>{
      event.preventDefault();
      console.log(formState.inputs);
    }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid title (title cannot be empty)"
        onInput = {inputHandler}
        initialValue = {formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(5000)]}
        errorText="Please enter valid description"
        onInput = {inputHandler}
        initialValue = {formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>Update place</Button>
    </form>
  );
};

export default UpdatePlace;
