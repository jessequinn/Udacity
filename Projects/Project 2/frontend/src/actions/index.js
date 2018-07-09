import * as API from "../utils/api";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_POSTS = "FETCH_POSTS";
export const CREATE_POST = "CREATE_POST";

export const fetchCategories = () => dispatch => {
  API.getCategories().then(categories =>
    dispatch(populateStateCategories(categories))
  );
};

const populateStateCategories = categories => {
  return {
    type: FETCH_CATEGORIES,
    categories
  };
};

export const fetchPosts = () => dispatch => {
  API.getPosts().then(posts => dispatch(populateStatePosts(posts)));
};

const populateStatePosts = posts => {
  return {
    type: FETCH_POSTS,
    posts
  };
};

export const createPost = (data) => (dispatch) => {
  API.createPost(data)
    .then(post => dispatch(concatStatePost(post)));
}

const concatStatePost = (post) => {
  return {
    type: CREATE_POST,
    post
  }
}
