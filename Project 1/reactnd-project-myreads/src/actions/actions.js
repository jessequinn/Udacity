import axios from "axios";

const ROOT_URL = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const getAll = () => axios.get(`${ROOT_URL}/books`, { headers });

export const search = query =>
  axios.post(`${ROOT_URL}/search`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    data: JSON.stringify({ query })
  });
