import API from "../api";

import { getAllComments } from "./comments";

import {
  GET_ALL_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST
} from "./constants";

import { wait } from "../utils/helper";

export const getAllPostsAndComments = () => dispatch => {
  wait(2000)
    .then(() => API.getPosts())
    .then(posts => {
      dispatch(getAllPostsSuccess(posts));
      posts.map(({ id }) => dispatch(getAllComments(id)));
    });
};

const getAllPostsSuccess = posts => {
  return {
    type: GET_ALL_POSTS,
    posts
  };
};

export const createPost = data => dispatch => {
  API.createPost(data).then(post => dispatch(createPostSuccess(post)));
};

const createPostSuccess = post => {
  return {
    type: CREATE_POST,
    post
  };
};

export const editPost = (id, data) => dispatch => {
  API.editPost(id, data).then(post => dispatch(editPostSuccess(post)));
};

const editPostSuccess = post => {
  return {
    type: EDIT_POST,
    post
  };
};

export const deletePost = id => dispatch => {
  API.deletePost(id).then(() => dispatch(deletePostSuccess(id)));
};

const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    id
  };
};

export const upvotePost = id => dispatch => {
  API.upvotePost(id).then(({ id }) => dispatch(upvotePostSuccess(id)));
};

const upvotePostSuccess = id => {
  return {
    type: UPVOTE_POST,
    id
  };
};

export const downvotePost = id => dispatch => {
  API.downvotePost(id).then(({ id }) => dispatch(downvotePostSuccess(id)));
};

const downvotePostSuccess = id => {
  return {
    type: DOWNVOTE_POST,
    id
  };
};
