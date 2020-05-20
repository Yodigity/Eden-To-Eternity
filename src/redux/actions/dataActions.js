import Axios from "axios";
import {
  LOADING_TALKS,
  SET_TALKS,
  LIKE_TALK,
  UNLIKE_TALK,
  DELETE_TALK,
  SET_TALK,
  POST_TALK,
  SUBMIT_COMMENT,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  CLEAR_LOADING_UI,
  LOADING_DATA,
} from "../types";

//Get all talks
export const setTalks = () => (dispatch) => {
  dispatch({ type: LOADING_TALKS });

  Axios.get("/talks")
    .then((res) => {
      dispatch({ type: SET_TALKS, payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: SET_TALKS, payload: [] });
    });
};

export const getTalk = (talkId) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  Axios.get(`/talk/${talkId}`)
    .then((res) => {
      dispatch({ type: SET_TALK, payload: res.data });
      dispatch({ type: CLEAR_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};
//Post a talk
export const postTalk = (talkData) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  Axios.post("/talk", talkData)
    .then((res) => {
      dispatch({ type: POST_TALK, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//Like a talk
export const likeTalk = (talkId) => (dispatch) => {
  Axios.get(`/talk/${talkId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_TALK, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Unlike a talk
export const unlikeTalk = (talkId) => (dispatch) => {
  Axios.get(`/talk/${talkId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_TALK, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Delete a talk
export const deleteTalk = (talkId) => (dispatch) => {
  Axios.delete(`/talk/${talkId}`)
    .then(() => {
      dispatch({ type: DELETE_TALK, payload: talkId });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Comment on talk
export const submitComment = (talkId, commentData) => (dispatch) => {
  Axios.post(`/talk/${talkId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//Get user data when clicking on other person's profile
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  Axios.get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_TALKS, payload: res.data.talks });
    })
    .catch(() => {
      dispatch({ type: SET_TALKS, payload: null });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
