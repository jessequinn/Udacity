import { combineReducers } from "redux";

import "typeface-roboto";

import { FETCH_CATEGORIES, FETCH_POSTS, CREATE_POST } from "../actions";

const categories = (state = [], action) => {
  const { categories } = action;

  switch (action.type) {
    case FETCH_CATEGORIES:
      return categories;
    default:
      return state;
  }
};

const posts = (state = [], action) => {
  const { posts, post } = action;

  switch (action.type) {
    case FETCH_POSTS:
      return posts;
    case CREATE_POST:
      return [...state, post];
    default:
      return state;
  }
};

export default combineReducers({
  categories,
  posts
});
