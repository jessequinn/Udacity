import {
  GET_ALL_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT
} from "../actions/constants";

const comments = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return [...state, ...action.comments];
    case CREATE_COMMENT:
      return [...state, action.comment];
    case EDIT_COMMENT:
      return state.map(c => comment(c, action));
    case DELETE_COMMENT:
      return [...state.filter(comment => comment.id !== action.id)];
    case UPVOTE_COMMENT:
    case DOWNVOTE_COMMENT:
      return state.map(c => comment(c, action));
    default:
      return state;
  }
};

const comment = (state = {}, action) => {
  switch (action.type) {
    case EDIT_COMMENT:
      if (state.id !== action.comment.id) {
        return state;
      }
      return {
        ...action.comment
      };
    case UPVOTE_COMMENT:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        voteScore: state.voteScore + 1
      };
    case DOWNVOTE_COMMENT:
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

export default comments;
