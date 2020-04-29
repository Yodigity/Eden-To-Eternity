import { styled } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core/";

export const Wrapper = styled(Container)({
  width: "auto",
  display: "block", // Fix IE 11 issue.
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

export const ErrorMsg = styled(Title)({
  fontSize: 16,
  color: "red",
});

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

// const styles = theme => ({
//   main: {
//     width: 'auto',
//     display: 'block', // Fix IE 11 issue.
//     marginLeft: theme.spacing() * 3,
//     marginRight: theme.spacing() * 3,
//     [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
//       width: 400,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//   },
//   paper: {
//     marginTop: theme.spacing() * 8,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`,
//   },
//   form: {
//     width: '100%',
//     marginTop: theme.spacing(),
//   },
//   submit: {
//     marginTop: theme.spacing() * 3,
//   },
//   hasAccountHeader: {
//     width: '100%'
//   },
//   logInLink: {
//     width: '100%',
//     textDecoration: 'none',
//     color: '#303f9f',
//     fontWeight: 'bolder'
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center'
//   }
// });

// export default styles;
