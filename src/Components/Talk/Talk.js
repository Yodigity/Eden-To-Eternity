import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "../../util/LikeButton";
import DeleteTalk from "../DeleteTalk/DeleteTalk";

import TalkDialog from "../TalkDialog/TalkDialog";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles } from "./styles";

//redux
import { connect } from "react-redux";
import { CardMedia } from "@material-ui/core";

class Talk extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      talk: {
        userImage,
        body,
        userHandle,
        createdAt,
        likeCount,
        commentCount,
        talkId,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteTalk talkId={talkId} />
      ) : null;

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardMedia className={classes.header}>
            <img
              className={classes.image}
              src={userImage}
              aria-label='user'
              component={Link}
              to={`/users/${userHandle}`}
              alt='Profile'
            />
          </CardMedia>

          <CardContent className={classes.content}>
            <Typography
              variant='h5'
              component={Link}
              to={`/users/${userHandle}`}
              color='primary'
            >
              @{userHandle}
            </Typography>
            <Typography variant='h6' color='textPrimary'>
              {body}
            </Typography>

            <Typography
              variant='h6'
              color='textSecondary'
              className={classes.date}
            >
              {dayjs(createdAt).fromNow()}
            </Typography>

            {deleteButton}

            <LikeButton talkId={talkId} />
            <span>{likeCount} Likes</span>

            <TalkDialog
              talkId={talkId}
              userHandle={userHandle}
              opendialog={this.props.openDialog}
              type='comment'
            />

            <span>{commentCount} Comments</span>
            <TalkDialog
              talkId={talkId}
              userHandle={userHandle}
              opendialog={this.props.openDialog}
              type='talk'
            />
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

Talk.propTypes = {
  user: PropTypes.object.isRequired,
  talk: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Talk));
