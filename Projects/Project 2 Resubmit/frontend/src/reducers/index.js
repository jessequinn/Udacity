// actions and reducers design are based on https://scotch.io/tutorials/bookshop-with-react-redux-ii-async-requests-with-thunks
import { GET_CATEGORIES_SUCCESS } from "../actions";

const categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
};

export default categories;
