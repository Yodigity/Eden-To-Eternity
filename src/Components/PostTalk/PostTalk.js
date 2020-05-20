import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

//MUI
import ButtonIcon from "../../util/ButtonIcon";
import AddIcon from "@material-ui/icons/Add";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CloseButton from "@material-ui/icons/Close";

import { connect } from "react-redux";
import { postTalk, clearErrors } from "../../redux/actions/dataActions";
import { CircularProgress } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadIt,
  submitButton: { position: "relative" },
  progressSpinner: { position: "absolute" },
  closeButton: { position: "absolute", left: "90%", top: "10%" },
});

class PostTalk extends Component {
  state = { open: false, body: "", errors: {} };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }

    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (e) => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newTalk = { body: this.state.body };
    this.props.postTalk(newTalk);
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <ButtonIcon
          tip='Start talking'
          onClick={this.handleOpen}
          btnClassName={classes.postButton}
        >
          <AddIcon />
        </ButtonIcon>

        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth>
          <DialogTitle>Post a talk</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please write out your talk below
            </DialogContentText>
            <form onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                margin='dense'
                name='body'
                id='talk'
                label='Talk'
                type='text'
                fullWidth
                multiline
                rows='3'
                onChange={this.handleChange}
                value={this.state.body}
                error={errors.error ? true : false}
                helperText={errors.error}
                className={classes.textField}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <CloseButton
              color='secondary'
              variant='contained'
              onClick={this.handleClose}
              className={classes.closeButton}
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}
              className={classes.submitButton}
              disabled={loading}
            >
              Post
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

PostTalk.propTypes = {
  postTalk: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { postTalk, clearErrors })(
  withStyles(styles)(PostTalk)
);
