// actions and reducers design are based on https://scotch.io/tutorials/bookshop-with-react-redux-ii-async-requests-with-thunks
import Axios from "axios";
import qs from "qs";
import { v5 } from "uuid";

export const ROOT_URL = "http://localhost:3001";
export const HEADERS = {
  Authorization: "jessequinn",
  "Content-Type": "application/json"
};

export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";

export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const POST_UPVOTE_SUCCESS = "POST_UPVOTE_SUCCESS";
export const POST_DOWNVOTE_SUCCESS = "POST_DOWNVOTE_SUCCESS";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";

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
        response.data.map(({ id }) => dispatch(getComments(id)));
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

// refer to https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format
export const postUpVotePost = pid => {
  return dispatch => {
    return Axios({
      method: "POST",
      headers: {
        Authorization: "jessequinn",
        "content-type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify({ option: "upVote" }),
      url: `${ROOT_URL}/posts/${pid}`
    })
      .then(response => {
        // console.log(response.data);
        dispatch(postUpVotePostSuccess(response.data.id));
      })
      .catch(error => {
        throw error;
      });
  };
};

const postUpVotePostSuccess = id => {
  return {
    type: POST_UPVOTE_SUCCESS,
    id
  };
};

export const postDownVotePost = pid => {
  return dispatch => {
    return Axios({
      method: "POST",
      headers: {
        Authorization: "jessequinn",
        "content-type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify({ option: "downVote" }),
      url: `${ROOT_URL}/posts/${pid}`
    })
      .then(response => {
        // console.log(response.data);
        dispatch(postDownVotePostSuccess(response.data.id));
      })
      .catch(error => {
        throw error;
      });
  };
};

const postDownVotePostSuccess = id => {
  return {
    type: POST_DOWNVOTE_SUCCESS,
    id
  };
};

export const postCreatePost = pdata => {
  return dispatch => {
    return Axios({
      method: "POST",
      headers: {
        Authorization: "jessequinn",
        "content-type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify({
        id: v5(),
        timestamp: Date.now(),
        ...pdata
      }),
      url: `${ROOT_URL}/posts`
    }).then(response => {
      dispatch(postCreatePostSuccess(response.data.post));
    });
  };
};

const postCreatePostSuccess = post => {
  return {
    type: CREATE_POST_SUCCESS,
    post
  };
};
