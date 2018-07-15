import {
  GET_ALL_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST
} from "../actions/constants";

const posts = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.posts;
    case CREATE_POST:
      return [...state, action.post];
    case EDIT_POST:
      return state.map(p => post(p, action));
    case DELETE_POST:
      return [...state.filter(post => post.id !== action.id)];
    case UPVOTE_POST:
    case DOWNVOTE_POST:
      return state.map(p => post(p, action));
    default:
      return state;
  }
};

const post = (state = {}, action) => {
  switch (action.type) {
    case EDIT_POST:
      if (state.id !== action.post.id) {
        return state;
      }
      return {
        ...action.post
      };
    case UPVOTE_POST:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        voteScore: state.voteScore + 1
      };
    case DOWNVOTE_POST:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        voteScore: state.voteScore - 1
      };
    default:
      return state;
  }
};

export default posts;
