import React, { useContext, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";

import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
    auth.login()
  };
  const switchHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setIsLogin((prev) => !prev);
  };

  return (
    <Card className="authentication">
      <h2>Log in to PicMapHub</h2>
      <hr />
      <form className="place-for" onSubmit={authSubmitHandler}>
        {!isLogin && (
          <Input
            id="name"
            type="name"
            element="input"
            placeholder="Enter your name"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a Name"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          type="email"
          element="input"
          placeholder="Enter your email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter valid email"
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          element="input"
          placeholder="Enter your password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter atleast 5 character password"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLogin ? "Log in" : "Sign up"}
        </Button>
      </form>
      <Button inverse onClick={switchHandler}>
        {!isLogin ? "Log in" : "Sign up"} on PicMapHub
      </Button>
    </Card>
  );
};

export default Auth;
