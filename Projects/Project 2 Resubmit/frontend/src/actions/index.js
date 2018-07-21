// actions and reducers design are based on https://scotch.io/tutorials/bookshop-with-react-redux-ii-async-requests-with-thunks

// https://github.com/axios/axios refer to document as reference
import Axios from "axios";

// https://www.npmjs.com/package/uuid
import { v4 } from "uuid";

const ROOT_URL = "http://localhost:3001";
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "jessequinn"
};

const Api = Axios.create({
  baseURL: ROOT_URL,
  headers: HEADERS
});

export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const POST_UPVOTE_POST_SUCCESS = "POST_UPVOTE_POST_SUCCESS";
export const POST_DOWNVOTE_POST_SUCCESS = "POST_DOWNVOTE_POST_SUCCESS";
export const POST_CREATE_POST_SUCCESS = "POST_CREATE_POST_SUCCESS";
export const DELETE_DELETE_POST_SUCCESS = "DELETE_DELETE_POST_SUCCESS";
export const GET_POSTS_FOR_CATEGORY_SUCCESS = "GET_POSTS_FOR_CATEGORY_SUCCESS";
export const PUT_EDIT_POST_SUCCESS = "PUT_EDIT_POST_SUCCESS";
export const DELETE_DELETE_COMMENT_SUCCESS = "DELETE_DELETE_COMMENT_SUCCESS";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";

export const getCategories = () => {
  return dispatch => {
    return Api.get(`/categories`)
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

export const getPost = pid => {
  return dispatch => {
    return Api.get(`/posts/${pid}`)
      .then(response => {
        dispatch(getPostSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

const getPostSuccess = post => {
  return {
    type: GET_POST_SUCCESS,
    post
  };
};

export const getPosts = () => {
  return dispatch => {
    return Api.get(`/posts`)
      .then(response => {
        dispatch(getPostsSuccess(response.data));
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
    return Api.get(`/posts/${pid}/comments`).then(response => {
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

export const postUpVotePost = pid => {
  return dispatch => {
    return Api.post(`/posts/${pid}`, {
      option: "upVote"
    })
      .then(response => {
        dispatch(postUpVotePostSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

const postUpVotePostSuccess = post => {
  return {
    type: POST_UPVOTE_POST_SUCCESS,
    post
  };
};

export const postDownVotePost = pid => {
  return dispatch => {
    return Api.post(`/posts/${pid}`, { option: "downVote" })
      .then(response => {
        dispatch(postDownVotePostSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

const postDownVotePostSuccess = post => {
  return {
    type: POST_DOWNVOTE_POST_SUCCESS,
    post
  };
};

export const postCreatePost = pdata => {
  return dispatch => {
    return Api.post(`/posts`, {
      id: v4(),
      timestamp: Date.now(),
      ...pdata
    })
      .then(response => {
        dispatch(postCreatePostSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

const postCreatePostSuccess = post => {
  return {
    type: POST_CREATE_POST_SUCCESS,
    post
  };
};

export const deleteDeletePost = pid => {
  return dispatch => {
    return Api.delete(`/posts/${pid}`)
      .then(response => {
        dispatch(deleteDeletePostSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

const deleteDeletePostSuccess = post => {
  return {
    type: DELETE_DELETE_POST_SUCCESS,
    post
  };
};

export const putEditPost = (pid, pdata) => {
  return dispatch => {
    return Api.put(`/posts/${pid}`, { ...pdata })
      .then(response => {
        dispatch(putEditPostSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

const putEditPostSuccess = post => {
  return {
    type: PUT_EDIT_POST_SUCCESS,
    post
  };
};

export const deleteDeleteComment = cid => {
  return dispatch => {
    return Api.delete(`/comments/${cid}`)
      .then(response => {
        dispatch(deleteDeleteCommentSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

const deleteDeleteCommentSuccess = comment => {
  return {
    type: DELETE_DELETE_COMMENT_SUCCESS,
    comment
  };
};

export const getPostsForCategory = category => {
  return dispatch => {
    return Api.get(`/${category}/posts`)
      .then(response => {
        dispatch(getPostsForCategorySuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

const getPostsForCategorySuccess = posts => {
  return {
    type: GET_POSTS_FOR_CATEGORY_SUCCESS,
    posts
  };
};
