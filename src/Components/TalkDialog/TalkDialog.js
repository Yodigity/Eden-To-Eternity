import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "../../util/LikeButton";
import CommentForm from "../Comment/CommentForm";
import Comments from "../Comment/Comments";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonIcon from "../../util/ButtonIcon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import CloseButton from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";
import { getTalk, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadIt,

  profileImage: {
    maxwidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
    marginTop: 50,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  progressSpinner: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

class TalkDialog extends Component {
  state = { open: false, oldPath: "", newPath: "" };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, talkId } = this.props;

    const newPath = `/users/${userHandle}/talk/${talkId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getTalk(this.props.talkId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      talk: {
        talkId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
      type,
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.progressSpinner}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={10}>
        <Grid item sm={5}>
          <img src={userImage} alt='Profile' className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body1'>{body}</Typography>
          <LikeButton talkId={talkId} />
          <span>{likeCount} Likes</span>
          <ButtonIcon tip='Comments'>
            <ChatIcon color='primary' />
          </ButtonIcon>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm talkId={talkId} type={type} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <ButtonIcon
          tip={type === "talk" ? "Expand" : "Comment"}
          onClick={this.handleOpen}
          btnClassName={classes.expandButton}
        >
          {type === "talk" ? (
            <UnfoldMore color='primary' />
          ) : (
            <ChatIcon color='primary' />
          )}
        </ButtonIcon>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <ButtonIcon
            tip='Close'
            onClick={this.handleClose}
            btnClassName={classes.closeButton}
          >
            <CloseButton color='secondary' variant='contained' />
          </ButtonIcon>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

TalkDialog.propTypes = {
  getTalk: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  talkId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  talk: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  talk: state.data.talk,
  UI: state.UI,
});

const mapActionsToProps = {
  getTalk,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(TalkDialog));
