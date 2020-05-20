import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import ButtonIcon from "./ButtonIcon";
import FavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteBorder from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likeTalk, unlikeTalk } from "../redux/actions/dataActions";

class LikeButton extends Component {
  likedTalk = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.talkId === this.props.talkId)
    )
      return true;
    else return false;
  };

  likeTalk = () => {
    this.props.likeTalk(this.props.talkId);
  };

  unlikeTalk = () => {
    this.props.unlikeTalk(this.props.talkId);
  };

  render() {
    const { authenticated } = this.props.user;

    const likeButton = !authenticated ? (
      <ButtonIcon tip='Like'>
        <Link to='/login'>
          <FavouriteBorder color='primary' />
        </Link>
      </ButtonIcon>
    ) : this.likedTalk() ? (
      <ButtonIcon tip='Unlike' onClick={this.unlikeTalk}>
        <FavouriteIcon color='primary' />
      </ButtonIcon>
    ) : (
      <ButtonIcon tip='Like' onClick={this.likeTalk}>
        <FavouriteBorder color='primary' />
      </ButtonIcon>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likeTalk: PropTypes.func.isRequired,
  unlikeTalk: PropTypes.func.isRequired,
  talkId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeTalk,
  unlikeTalk,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
