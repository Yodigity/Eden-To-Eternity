import React from "react";
import { styles } from "./styles";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      prevErrors: {},
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextprops, prevState) {
    if (nextprops.UI.errors !== prevState.errors) {
      console.log(nextprops);
      return {
        prevErrors: nextprops.UI.errors,
        errors: nextprops.UI.errors,
      };
    }
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    this.setState({ [name]: newValue });
  };
  render() {
    const { classes } = this.props;

    const { errors } = this.state;
    return (
      <div>
        <Container className={classes.container}>
          <Paper className={classes.paper}>
            <Typography variant='h4' className={classes.title}>
              Login
            </Typography>

            <Typography>
              Fill in the form below to create an account.
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                className={classes.textField}
                variant='outlined'
                label='Email'
                helperText={errors ? errors.email : false}
                error={errors === null ? false : errors.email || errors.general}
                id='email'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                className={classes.textField}
                variant='outlined'
                type='password'
                id='password'
                name='password'
                label='Password'
                helperText={errors ? errors.password : false}
                error={
                  errors === null ? false : errors.password || errors.general
                }
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />

              {errors
                ? errors.general && (
                    <Typography
                      variant='body2'
                      color='secondary'
                      className={classes.customError}
                    >
                      {errors.general}
                    </Typography>
                  )
                : null}

              <Button
                className={classes.button}
                type='submit'
                color='primary'
                variant='contained'
                onSubmit={this.handleSubmit}
              >
                Login
              </Button>
            </form>

            <Typography className={classes.typography}>
              Not got an account? <a href='/Signup'>Sign Up!</a>
            </Typography>
          </Paper>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
