import React, { Fragment } from "react";
import no_img from "./no_img.png";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from "@material-ui/core/Paper";
import CalenderToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.spreadIt,
  paper: { paddingBottom: 10 },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
    marginLeft: "25%",
  },
  fullLine: {
    width: "60%",
    height: 14,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginLeft: "25%",
    marginBottom: 14,
  },
  halfLine: {
    width: "50%",
    height: 14,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginLeft: "25%",
    marginBottom: 14,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;

  const content = (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={no_img} alt='profile' className='profile-image' />
        </div>
        <hr />
        <div className='profile-details'>
          <hr />
          <div className={classes.handle} />
          <div className={classes.fullLine} />
          <div className={classes.halfLine} />
          <div className={classes.halfLine} />
          <CalenderToday />
          <div className={classes.halfLine} />
        </div>
      </div>
    </Paper>
  );

  return <Fragment>{content}</Fragment>;
};

export default withStyles(styles)(ProfileSkeleton);
