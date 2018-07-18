// split reducer example followed from example presented at https://redux.js.org/basics/reducers
import { combineReducers } from "redux";

// actions and reducers design are based on https://scotch.io/tutorials/bookshop-with-react-redux-ii-async-requests-with-thunks
import {
  GET_CATEGORIES_SUCCESS,
  GET_POSTS_SUCCESS,
  GET_COMMENTS_SUCCESS,
  POST_UPVOTE_SUCCESS,
  POST_DOWNVOTE_SUCCESS,
  CREATE_POST_SUCCESS
} from "../actions";

const categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
};

const posts = (state = [], action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return action.posts;
    case POST_UPVOTE_SUCCESS:
      return state.map(post => {
        if (post.id !== action.id) {
          return post;
        }
        return {
          ...post,
          voteScore: post.voteScore + 1
        };
      });
    case POST_DOWNVOTE_SUCCESS:
      return state.map(post => {
        if (post.id !== action.id) {
          return post;
        }
        return {
          ...post,
          voteScore: post.voteScore - 1
        };
      });
    case CREATE_POST_SUCCESS:
      return [...state, action.post];
    default:
      return state;
  }
};

const comments = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return [...state, ...action.comments];
    default:
      return state;
  }
};

export default combineReducers({
  categories,
  posts,
  comments
});
