import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//MUI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//Redux
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  button: { marginTop: "10px" },
});

class CommentForm extends Component {
  state = { commentBody: "", prevErrors: {}, errors: {} };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors) {
  //     this.setState({ errors: nextProps.UI.errors });
  //   }
  //   if (!nextProps.UI.errors && !nextProps.UI.loading) {
  //     this.setState({ commentBody: "" });
  //   }
  // }

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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.commentBody);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.submitComment(this.props.talkId, {
      body: this.state.commentBody,
    });
    this.setState({ commentBody: "" });
  };
  render() {
    const { classes, authenticated, type } = this.props;
    const { errors } = this.state;

    const commentform = authenticated ? (
      <Fragment>
        <Grid item sm={12} style={{ textAlign: "center" }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name='commentBody'
              type='text'
              onChange={this.handleChange}
              label='Make a comment'
              error={errors ? true : false}
              helperText={errors ? errors.body : false}
              value={this.state.commentBody}
              className={classes.textField}
              fullWidth
              autoFocus={type === "comment" ? true : false}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Submit
            </Button>
          </form>
          <hr className={classes.visibleSeparator} />
        </Grid>
      </Fragment>
    ) : null;

    return commentform;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  talkId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
