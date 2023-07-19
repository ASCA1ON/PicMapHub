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
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    if (isLogin) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        })
        const responseData = await response.json()
        if(!response.ok){
          throw new Error(responseData.message)
        }
        setIsLoading(false)
        auth.login();
      } catch(err) {
        console.log(err);
        setIsLoading(false)
        setError(err.message || 'something went wrong')
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        })
        const responseData = await response.json()
        if(!response.ok){
          throw new Error(responseData.message)
        }
        setIsLoading(false)
        auth.login();
      } catch(err) {
        console.log(err);
        setIsLoading(false)
        setError(err.message || 'something went wrong')
      }
    }
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
  const errorHandler = ()=>{
    setError(null)
  }

  return (
    <>
    <ErrorModal error={error} onClear={errorHandler}/>
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay/>}
      <h2>{isLogin?'Log in':'Sign up'} to PicMapHub</h2>
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
    </>
  );
};

export default Auth;
