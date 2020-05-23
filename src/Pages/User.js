import React, { Component } from "react";
import PropTypes from "prop-types";
import Talk from "../Components/Talk/Talk";
import StaticProfile from "../Components/StaticProfile";
import TalkSkeleton from "../util/TalkSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import Axios from "axios";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

export class User extends Component {
  state = { profile: null, talkIdParam: null };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const talkId = this.props.match.params.talkId;

    if (talkId) {
      this.setState({ talkIdParam: talkId });
    }

    this.props.getUserData(handle);

    Axios.get(`/user/${handle}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { talks, loading } = this.props.data;
    const { talkIdParam } = this.state;

    const talkMarkup = loading ? (
      <TalkSkeleton />
    ) : talks === null ? (
      <p>This user hasn't posted any talks</p>
    ) : !talkIdParam ? (
      talks.map((talk) => <Talk key={talk.talkId} talk={talk} />)
    ) : (
      talks.map((talk) => {
        if (talk.talkId !== talkIdParam) {
          return <Talk key={talk.talkId} talk={talk} />;
        } else return <Talk key={talk.talkId} talk={talk} openDialog />;
      })
    );

    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {talkMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
