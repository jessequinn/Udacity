import Api from '../api/index';
import { GET_ALL_CATEGORIES_SUCCESS } from './constants';

export const getAllCategories = () => (dispatch) => {
  Api.getCategories()
    .then(categories => dispatch(getAllCategoriesSuccess(categories)));
}

const getAllCategoriesSuccess = (categories) => {
  return {
    type: GET_ALL_CATEGORIES_SUCCESS,
    categories
  }
}
