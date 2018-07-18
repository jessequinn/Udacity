// actions and reducers design are based on https://scotch.io/tutorials/bookshop-with-react-redux-ii-async-requests-with-thunks
import Axios from "axios";

export const ROOT_URL = "http://localhost:3001";
export const HEADERS = {
  Authorization: "jessequinn",
  "Content-Type": "application/json"
};
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";

export const getCategories = () => {
  return dispatch => {
    // Returns a promise
    return Axios.get(`${ROOT_URL}/categories`, { headers: HEADERS })
      .then(response => {
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
