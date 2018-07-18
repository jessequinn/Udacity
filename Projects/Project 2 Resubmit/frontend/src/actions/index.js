// actions and reducers design are based on https://scotch.io/tutorials/bookshop-with-react-redux-ii-async-requests-with-thunks
import Axios from "axios";

export const ROOT_URL = "http://localhost:3001";
export const HEADERS = {
  Authorization: "jessequinn",
  "Content-Type": "application/json"
};

export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";

export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";

export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";

export const getCategories = () => {
  return dispatch => {
    return Axios.get(`${ROOT_URL}/categories`, { headers: HEADERS })
      .then(response => {
        // console.log("Categories: " + response.data)
        // console.log(response.data.categories);
        dispatch(getCategoriesSuccess(response.data.categories));
      })
      .catch(error => {
        throw error;
      });
  };
};

const getCategoriesSuccess = categories => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories
  };
};

export const getPostsWithComments = () => {
  return dispatch => {
    return Axios.get(`${ROOT_URL}/posts`, { headers: HEADERS })
      .then(response => {
        dispatch(getPostsSuccess(response.data));
        // console.log("Posts: " + response.data)
        // console.log(response.data);
        // response.data.map(({ id }) => dispatch(getComments(id)));
      })
      .catch(error => {
        throw error;
      });
  };
};

const getPostsSuccess = posts => {
  return {
    type: GET_POSTS_SUCCESS,
    posts
  };
};

export const getComments = pid => {
  return dispatch => {
    return Axios.get(`${ROOT_URL}/posts/${pid}/comments`, {
      headers: HEADERS
    }).then(response => {
      // console.log("Comments:" + response.data);
      dispatch(getCommentsSuccess(response.data));
    });
  };
};

const getCommentsSuccess = comments => {
  return {
    type: GET_COMMENTS_SUCCESS,
    comments
  };
};
