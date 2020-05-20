import React from "react";
import { styles } from "./styles";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";

import { PropTypes } from "prop-types";

//Redux
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };

    this.props.signupUser(userData, this.props.history);
  };

  handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    this.setState({ [name]: newValue });
    console.log(this.state);
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <div>
        <Container className={classes.container}>
          <Paper className={classes.paper}>
            <Typography variant='h4' className={classes.title}>
              Sign Up
            </Typography>

            <Typography>
              Fill in the form below to create an account.
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                className={classes.textField}
                variant='outlined'
                label='Email'
                helperText={errors.email}
                error={errors.email ? true : false}
                id='email'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />

              {/* <Label for='password'>Password</Label> */}
              <TextField
                className={classes.textField}
                variant='outlined'
                type='password'
                id='password'
                name='password'
                label='Password'
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                className={classes.textField}
                variant='outlined'
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                label='Confirm Password'
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                className={classes.textField}
                variant='outlined'
                type='text'
                id='handle'
                name='handle'
                label='Handle'
                helperText={errors.handle}
                error={errors.handle ? true : false}
                value={this.state.handle}
                onChange={this.handleChange}
                fullWidth
              />

              {errors.general && (
                <Typography variant='body2' className={classes.customError}>
                  {errors.general}
                </Typography>
              )}

              <Button
                className={classes.button}
                type='submit'
                color='primary'
                variant='contained'
                onSubmit={this.handleSubmit}
              >
                Sign Up
              </Button>
            </form>

            <Typography className={classes.typography}>
              Already have an account? <a href='/Login'>Login!</a>
            </Typography>
          </Paper>
        </Container>
      </div>
    );
  }
}
Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);
