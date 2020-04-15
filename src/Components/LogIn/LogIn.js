import React, { useState, useReducer } from "react";
import SimpleMenu from "../Navbar/Navbar";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import { Wrapper, Input, SubmitButton, Title } from "./styles";
import { PaperBack } from "../SignUp/styles";

export const LogIn = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  );
  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });

    console.log(userInput);
  };

  return (
    <div>
      <SimpleMenu />
      <Wrapper>
        <PaperBack elevation={3}>
          <Title>Fill in the form below to create an account.</Title>
          <form>
            {/* <Label for='email'>Email</Label> */}

            <Input
              className='inputField'
              variant='outlined'
              label='Email'
              id='email'
              name='email'
              value={userInput.email}
              onChange={handleChange}
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
            />

            <SubmitButton>Sign Up!</SubmitButton>
          </form>

          <Typography>
            Not got an account? <a href='/SignUp'>Sign Up!</a>
          </Typography>
        </PaperBack>
      </Wrapper>
    </div>
  );
};
