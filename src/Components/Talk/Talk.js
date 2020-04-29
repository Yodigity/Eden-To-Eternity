import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  withStyles,
} from "@material-ui/core";
import { styles } from "./styles";

class Talk extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      talk: { imageUrl, body, userHandle, createdAt },
    } = this.props;

    console.log(this.props);
    return (
      <div>
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
            // action={
            //   <IconButton aria-label='settings'>
            //     <MoreVertIcon />
            //   </IconButton>
            // } USER ONLY

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
            <Typography variant='body1' color='textPrimary' component='p'>
              {body}
            </Typography>
            <Typography variant='h7' color='textSecondary' component='p'>
              {dayjs(createdAt).fromNow()}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Talk);
