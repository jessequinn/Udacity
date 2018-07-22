import _ from "lodash";

// split reducer example followed from example presented at https://redux.js.org/basics/reducers
import { combineReducers } from "redux";
// used the following example https://medium.com/@benawad/redux-form-and-material-ui-example-f5073086cf9d for form shape
import { reducer as formReducer } from "redux-form";

// actions and reducers design are based on https://scotch.io/tutorials/bookshop-with-react-redux-ii-async-requests-with-thunks
import {
  GET_CATEGORIES_SUCCESS,
  GET_POST_SUCCESS,
  GET_POSTS_SUCCESS,
  GET_COMMENTS_SUCCESS,
  POST_CREATE_POST_SUCCESS,
  PUT_EDIT_POST_SUCCESS,
  DELETE_DELETE_POST_SUCCESS,
  DELETE_DELETE_COMMENT_SUCCESS,
  GET_POSTS_FOR_CATEGORY_SUCCESS,
  POST_UPVOTE_POST_SUCCESS,
  POST_DOWNVOTE_POST_SUCCESS,
  POST_UPVOTE_COMMENT_SUCCESS,
  POST_DOWNVOTE_COMMENT_SUCCESS
} from "../actions";

const categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
};

const post = (state = {}, action) => {
  switch (action.type) {
    case GET_POST_SUCCESS:
    case POST_UPVOTE_POST_SUCCESS:
    case POST_DOWNVOTE_POST_SUCCESS:
    case PUT_EDIT_POST_SUCCESS:
      return action.post;
    default:
      return state;
  }
};

const posts = (state = [], action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
    case GET_POSTS_FOR_CATEGORY_SUCCESS:
      return action.posts;
    case POST_UPVOTE_POST_SUCCESS:
    case POST_DOWNVOTE_POST_SUCCESS:
      return _.map(state, post => {
        if (post.id === action.post.id) {
          return {
            ...post,
            voteScore: action.post.voteScore
          };
        } else {
          return post;
        }
      });
    case POST_CREATE_POST_SUCCESS:
      return [...state, action.post];
    case PUT_EDIT_POST_SUCCESS:
      return _.map(state, post => {
        if (post.id === action.post.id) {
          return {
            ...action.post
          };
        } else {
          return post;
        }
      });
    case DELETE_DELETE_POST_SUCCESS:
      return _.filter(state, post => {
        return post.id !== action.post.id;
      });
    default:
      return state;
  }
};

const comment = (state = {}, action) => {
  switch (action.type) {
    case POST_UPVOTE_COMMENT_SUCCESS:
    case POST_DOWNVOTE_COMMENT_SUCCESS:
      return action.comment;
    default:
      return state;
  }
};

const comments = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return action.comments;
    case DELETE_DELETE_COMMENT_SUCCESS:
      return _.filter(state, comment => {
        return comment.id !== action.comment.id;
      });
    case POST_UPVOTE_COMMENT_SUCCESS:
    case POST_DOWNVOTE_COMMENT_SUCCESS:
      return _.map(state, comment => {
        if (comment.id === action.comment.id) {
          return {
            ...comment,
            voteScore: action.comment.voteScore
          };
        } else {
          return comment;
        }
      });
    default:
      return state;
  }
};

export default combineReducers({
  categories,
  post,
  posts,
  comment,
  comments,
  form: formReducer
});
