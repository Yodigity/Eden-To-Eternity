import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Axios from "axios";
import Talk from "../../Components/Talk/Talk";

class Home extends Component {
  state = { talks: null };

  componentDidMount() {
    Axios.get("/talks")
      .then((res) => {
        console.log(res.data);
        this.setState({ talks: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let talkMarkup = this.state.talks ? (
      this.state.talks.map((talk) => <Talk key={talk.talkId} talk={talk} />)
    ) : (
      <p>Loading</p>
    );

    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {talkMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          Profile Area
        </Grid>
      </Grid>
    );
  }
}

export default Home;
