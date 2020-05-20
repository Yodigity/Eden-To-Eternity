import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from "../types";
import Axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  Axios.post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  Axios.post("/signup", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete Axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  Axios.get("/user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  Axios.post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);

  Axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  Axios.post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

//Mark all notifications read when clicking on notifications icon
export const markNotificationsRead = (notificationIds) => (dispatch) => {
  Axios.post("notifications", notificationIds)
    .then(() => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch((err) => {
      console.log(err);
    });
};
