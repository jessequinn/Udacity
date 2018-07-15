import API from "../api";

import {
  GET_ALL_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT
} from "./constants";

export const getAllComments = postId => dispatch => {
  return API.getComments(postId).then(comments =>
    dispatch(getAllCommentsSuccess(comments))
  );
};

const getAllCommentsSuccess = comments => {
  return {
    type: GET_ALL_COMMENTS,
    comments
  };
};

export const createComment = (parentId, comment) => dispatch => {
  API.createComment(parentId, comment).then(comment =>
    dispatch(createCommentSuccess(comment))
  );
};

const createCommentSuccess = comment => {
  return {
    type: CREATE_COMMENT,
    comment
  };
};

export const editComment = (id, comment) => dispatch => {
  API.editComment(id, comment).then(comment =>
    dispatch(editCommentSuccess(comment))
  );
};

const editCommentSuccess = comment => {
  return {
    type: EDIT_COMMENT,
    comment
  };
};

export const deleteComment = id => dispatch => {
  API.deleteComment(id).then(() => dispatch(deleteCommentSuccess(id)));
};

const deleteCommentSuccess = id => {
  return {
    type: DELETE_COMMENT,
    id
  };
};

export const upvoteComment = id => dispatch => {
  API.upvoteComment(id).then(({ id }) => dispatch(upvoteCommentSuccess(id)));
};

const upvoteCommentSuccess = id => {
  return {
    type: UPVOTE_COMMENT,
    id
  };
};

export const downvoteComment = id => dispatch => {
  API.downvoteComment(id).then(({ id }) =>
    dispatch(downvoteCommentSuccess(id))
  );
};

const downvoteCommentSuccess = id => {
  return {
    type: DOWNVOTE_COMMENT,
    id
  };
};
