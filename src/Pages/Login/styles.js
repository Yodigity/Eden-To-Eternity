import { styled } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core/";

export const Wrapper = styled(Container)({
  alignContent: "center",
});

export const PaperBack = styled(Paper)({
  marginTop: 15,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const Title = styled(Typography)({
  fontSize: 20,
  textAlign: "center",
});

// export const Title = styled(h1)({
//
// });

// export const Label = styled.label({
//   padding: 0.5,
//   margin: 0.2,
//   display: "inline-sblock",
//   fontSize: 1.2,

//   borderRadius: 3,
// });

export const Input = styled(TextField)({
  padding: 5,
  margin: 10,
  display: "inline-block",
  background: "white",
  borderRadius: 15,
  fontSize: 1.1,
});

// export const NameInput = styled(Input)({ display: "inlineBlock", margin: 2 });

export const SubmitButton = styled(Button)({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "white",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  fontSize: 16,
  display: "block",
  height: 48,
  padding: "0 30px",
  margin: "auto",
  alignContent: "center",
  marginBottom: 10,
});

// export const Text = styled(p)({ fontSize: 1.2, lineHeight: 1.5 });

//Redundent code

// import styled from "styled-components";

// export const Wrapper = styled.div`
//   background: #f3f3f3;
// `;

// export const Title = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: royalblue;
// `;

// export const Label = styled.label`
//   padding: 0.5em;
//   margin: 0.2em;
//   display: inline-block;
//   font-size: 1.2rem;
//   border: none;
//   border-radius: 3px;
// `;

// export const Input = styled.input`
//   padding: 1em;
//   margin: 2em auto;
//   display: block;
//   background: white
//   border: none;
//   border-radius: 15px;
//   font-size: 1.1rem;
// `;

// export const NameInput = styled(Input)`
// display inline-block;
// margin: 2em 2em;
// `;

// export const Button = styled.button`
//   background: royalblue;
//   color: white;

//   border-radius: 25px;
//   font-size: 1.1rem;
//   display: block;
//   margin: 2rem auto;

//   padding: 0.8rem 1.5rem;
// `;

// export const Text = styled.p`
//   font-size: 1.2rem;
//   line-height: 1.5rem;
// `;
