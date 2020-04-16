import React, { useState, useReducer } from "react";
import SimpleMenu from "../Navbar/Navbar";
import { Typography } from "@material-ui/core";

import {
  Wrapper,
  Input,
  SubmitButton,
  Title,
  PaperBack,
  ErrorMsg,
} from "./styles";

const reducer = (state, action) => {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "setError":
      return {
        ...state,
        err: action.err,
      };
  }
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  err: "",
};

export const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });

    console.log(state);
  };

  const handleSignup = () => {
    if (!checkForm()) {
      return;
    }
  };

  const checkForm = () => {
    if (state.firstName.trim() === "" || state.lastName.trim() === "") {
      dispatch({
        type: "setError",
        err: "Please fill in your first and last name",
      });
    }

    if (state.email.trim() === "") {
      dispatch({ type: "setError", err: "Please enter your email" });
    }

    if (state.password.trim() === "") {
      return dispatch({
        type: "setError",
        err: "Password must not just contain spaces",
      });
    }

    if (state.password.length >= 8) {
      return dispatch({
        type: "setError",
        err: "Password must be at least 8 characters long",
      });
    }

    if (state.password !== state.confirmPassword) {
      return dispatch({ type: "setError", err: "Passwords do not match" });
    }
  };

  return (
    <div>
      <SimpleMenu />
      <Wrapper>
        <PaperBack elevation={3}>
          <Title>Fill in the form below to create an account.</Title>
          <form onSubmit={handleSignup}>
            {/* <Label for='email'>Email</Label> */}

            <Input
              className='inputField'
              variant='outlined'
              label='First Name'
              id='firstName'
              name='firstName'
              value={state.firstName}
              onChange={handleChange}
              required={true}
            />

            <Input
              className='inputField'
              variant='outlined'
              label='Last Name'
              id='lastName'
              name='lastName'
              value={state.lastName}
              onChange={handleChange}
              required={true}
            />

            <Input
              className='inputField'
              variant='outlined'
              label='Email'
              id='email'
              name='email'
              type='email'
              value={state.email}
              onChange={handleChange}
              required={true}
            />

            {/* <Label for='password'>Password</Label> */}
            <Input
              className='inputField'
              variant='outlined'
              type='password'
              id='password'
              name='password'
              label='Password'
              value={state.password}
              onChange={handleChange}
              required={true}
            />

            {/* <Label for='confirmPassword'>Confirm Password</Label> */}
            <Input
              className='inputField'
              variant='outlined'
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              label='Confirm Password'
              value={state.confirmPassword}
              onChange={handleChange}
              required={true}
            />

            <ErrorMsg>{state.err !== "" ? state.err : null}</ErrorMsg>
            <SubmitButton onClick={handleSignup}>Sign Up!</SubmitButton>
          </form>

          <Typography>
            Got an account? <a href='/LogIn'>Log In!</a>
          </Typography>
        </PaperBack>
      </Wrapper>
    </div>
  );
};
