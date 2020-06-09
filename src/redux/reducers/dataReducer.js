import {
  SET_TALKS,
  SET_TALK,
  LOADING_TALKS,
  LIKE_TALK,
  UNLIKE_TALK,
  DELETE_TALK,
  POST_TALK,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  talks: [],
  talk: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_TALKS:
      return { ...state, loading: true };
    case SET_TALKS:
      return { ...state, talks: action.payload, loading: false };
    case SET_TALK:
      return { ...state, talk: action.payload };
    case LIKE_TALK:
    case UNLIKE_TALK:
      const index = state.talks.findIndex(
        (talk) => talk.talkId === action.payload.talkId
      );
      state.talks[index] = action.payload;

      // if (state.talk.talkId === action.payload.talkId) {
      //   state.talk = action.payload;
      // }
      return { ...state };
    case POST_TALK:
      return { ...state, talks: [action.payload, ...state.talks] };

    case DELETE_TALK:
      index = state.talks.findIndex((talk) => talk.talkId === action.payload);
      state.talks.splice(index, 1);
      return { ...state };

    case SUBMIT_COMMENT:
      return {
        ...state,
        talk: {
          ...state.talk,
          comments: [action.payload, ...state.talk.comments],
        },
      };
    default:
      return state;
  }
}
