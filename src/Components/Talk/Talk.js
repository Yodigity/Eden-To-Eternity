import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "../../util/LikeButton";
import DeleteTalk from "../DeleteTalk/DeleteTalk";

import TalkDialog from "../TalkDialog/TalkDialog";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { styles } from "./styles";

//redux
import { connect } from "react-redux";

class Talk extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      talk: {
        imageUrl,
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
          <CardHeader
            avatar={
              <Avatar
                className={classes.image}
                src={imageUrl}
                aria-label='user'
                component={Link}
                to={`/users/${userHandle}`}
              ></Avatar>
            }
            className={classes.header}
          />

          <CardContent className={classes.content}>
            <Typography
              variant='h5'
              component={Link}
              to={`/users/${userHandle}`}
              color='primary'
            >
              {userHandle}
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
