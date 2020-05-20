import React, { Fragment } from "react";
import no_img from "./no_img.png";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadIt,
  card: { display: "flex", marginBottom: 20 },
  content: { flexDirection: "column", padding: 25, width: "100%" },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
  fullLine: {
    width: "90%",
    height: 14,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 14,
  },
  halfLine: {
    width: "50%",
    height: 14,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 14,
  },
});
const TalkSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardHeader
        avatar={
          <Avatar
            className={classes.image}
            src={no_img}
            aria-label='user'
          ></Avatar>
        }
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <div className={classes.handle} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
        <div className={classes.fullLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

TalkSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TalkSkeleton);
