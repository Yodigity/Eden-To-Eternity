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

export const SignUp = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      err: "",
    }
  );
  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue, err: "" });

    console.log(userInput.err);
  };

  const handleSignup = () => {
    if (!checkForm()) {
      return;
    }
  };

  const checkForm = () => {
    if (userInput.firstName.trim() === "" || userInput.lastName.trim() === "") {
      setUserInput({ err: "Please fill in your first and last name" });
    }

    if (userInput.email.trim() === "") {
      return setUserInput({ err: "Please enter your email" });
    }

    if (userInput.password.trim() === "") {
      return setUserInput({
        err: "Password must not just contain spaces",
      });
    }

    if (userInput.password.length >= 8) {
      return setUserInput({
        err: "Password must be at least 8 characters long",
      });
    }

    if (userInput.password !== userInput.confirmPassword) {
      return setUserInput({ err: "Passwords do not match" });
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
              value={userInput.firstName}
              onChange={handleChange}
              required={true}
            />

            <Input
              className='inputField'
              variant='outlined'
              label='Last Name'
              id='lastName'
              name='lastName'
              value={userInput.lastName}
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
              value={userInput.email}
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
              value={userInput.password}
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
              value={userInput.confirmPassword}
              onChange={handleChange}
              required={true}
            />

            <ErrorMsg>{userInput.err !== "" ? userInput.err : null}</ErrorMsg>
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
