import React, { Component } from "react";
import Talk from "../../Components/Talk/Talk";
import Profile from "../../Components/Profile/Profile.js";
import PropTypes from "prop-types";
import TalkSkeleton from "../../util/TalkSkeleton";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { setTalks } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadIt,
});

class Home extends Component {
  componentDidMount() {
    this.props.setTalks();
  }
  render() {
    const { talks, loading } = this.props.data;

    let talkMarkup = !loading ? (
      talks.map((talk) => <Talk key={talk.talkId} talk={talk} />)
    ) : (
      <TalkSkeleton />
    );

    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {talkMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  setTalks: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { setTalks })(withStyles(styles)(Home));
