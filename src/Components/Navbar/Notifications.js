import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Typography from "@material-ui/core/Typography";

//Icons
import ButtonIcon from "../../util/ButtonIcon";
import FavouriteIcon from "@material-ui/icons/Favorite";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Notifications extends Component {
  state = { anchorEl: null };

  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unreadNotificationIds = this.props.notifications
      .filter((notification) => !notification.read)
      .map((not) => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationIds);
  };

  render() {
    const notifications = this.props.notifications;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((notification) => notification.read === false)
        .length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter(
                  (notification) => notification.read === false
                ).length
              }
              color='secondary'
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    let notificationMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((notification) => {
          const verb = notification.type === "like" ? "liked" : "commented on";
          const person = notification.sender;
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? "primary" : "secondary";

          const icon =
            notification.type === "like" ? (
              <FavouriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem
              onClick={this.handleClose}
              key={notification.notificationId}
            >
              {icon}
              <Typography
                component={Link}
                to={`/users/${notification.recipient}/talk/${notification.talkId}`}
              >
                {`${person} ${verb} your talk ${time}`}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no new notifications
        </MenuItem>
      );

    return (
      <Fragment>
        <ButtonIcon
          tip='Notifications'
          aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
          aria-haspopup='true'
          onClick={this.handleOpen}
        >
          {notificationsIcon}
        </ButtonIcon>

        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
