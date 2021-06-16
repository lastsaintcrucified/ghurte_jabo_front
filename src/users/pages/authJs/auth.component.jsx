import React, { useState, useContext } from "react";
import Input from "../../../shared/uiElements/input.component.jsx";
import LoadingSpinner from "../../../shared/uiElements/LoadingSpinner.component";
import ErrorModal from "../../../shared/uiElements/ErrorModal.component";
import { useForm } from "../../../shared/hooks/form-hook.js";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validator.js";
import { AuthContext } from "../../../shared/context/auth-context.js";

import "./auth.styles.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [loginMode, setLoginMode] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [state, inputHandler, setFormData] = useForm(
    {
      email: {
        vlaue: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const submitHandler = async (event) => {
    event.preventDefault();
    if (loginMode) {
    } else {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: state.inputs.name.value,
            email: state.inputs.email.value,
            password: state.inputs.password.value,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setLoading(false);
        console.log("signUp data->", data);
      } catch (err) {
        setErrMsg(err.message || "Something went wrong");
        setLoading(false);
        console.log(err.message);
      }
    }
    auth.login();
  };
  const switchModeToggle = (event) => {
    event.preventDefault();
    if (!loginMode) {
      setFormData(
        {
          ...state.inputs,
          name: undefined,
        },
        state.inputs.email.isValid && state.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...state.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setLoginMode((prevMode) => !prevMode);
  };
  const errorHandler = () => {
    setErrMsg(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={errMsg} onClear={errorHandler} />
      <div className="form_container">
        {isLoading && <LoadingSpinner asOverlay />}
        <form className="place-form" onSubmit={submitHandler}>
          {!loginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password (min. 5 characters)."
            onInput={inputHandler}
          />
          <div className="form-footer">
            <CustomButton type="submit" disabled={!state.isValid}>
              {loginMode ? "Log in" : "Sign up"}
            </CustomButton>
            <CustomButton className="delete" onClick={switchModeToggle}>
              Switch To {loginMode ? "SignUp" : "LogIn"}
            </CustomButton>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;
