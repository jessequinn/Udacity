import { ROOT_URL, HEADERS } from './constants';

export const getCategories = () => {
  return fetch(`${ROOT_URL}/categories`, { headers: HEADERS })
    .then(res => res.json())
    .then(data => data.categories);
}
