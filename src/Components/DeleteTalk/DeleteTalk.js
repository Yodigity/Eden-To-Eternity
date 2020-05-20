import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import PropTypes from "prop-types";
import ButtonIcon from "../../util/ButtonIcon";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteTalk } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    top: "10%",
    left: "90%",
  },
};

class DeleteTalk extends Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteTalk = () => {
    this.props.deleteTalk(this.props.talkId);
    this.setState({ open: false });
    console.log(this.props);
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <ButtonIcon
          tip='Delete Talk'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color='secondary' />
        </ButtonIcon>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Are you sure you want to delete this talk?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.deleteTalk} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteTalk.propTypes = {
  deleteTalk: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  talkId: PropTypes.string.isRequired,
};

export default connect(null, { deleteTalk })(withStyles(styles)(DeleteTalk));
