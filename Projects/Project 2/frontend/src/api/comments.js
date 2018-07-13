import { v4 } from 'uuid';

import { ROOT_URL, HEADERS, OPTION_UPVOTE, OPTION_DOWNVOTE } from './constants';

export const getComments = (postId) => {
  return fetch(`${ROOT_URL}/posts/${postId}/comments`, { headers: HEADERS })
    .then(res => res.json());
}

export const createComment = (parentId, data) => {
  return fetch(`${ROOT_URL}/comments`,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        ...data,
        parentId,
        id: v4(),
        timestamp: Date.now()
      })
    })
    .then(res => res.json());
}

export const editComment = (id, data) => {
  return fetch(`${ROOT_URL}/comments/${id}`,
    {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify({
        ...data,
        timestamp: Date.now()
      })

    })
    .then(res => res.json());
}

export const deleteComment = (id) => {
  return fetch(`${ROOT_URL}/comments/${id}`,
    {
      method: 'DELETE',
      headers: HEADERS,
    });
}

const voteComment = (option) => (commentId) => {
  return fetch(`${ROOT_URL}/comments/${commentId}`,
  {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ option })
  })
    .then(res => res.json());
}

export const upvoteComment = voteComment(OPTION_UPVOTE);

export const downvoteComment = voteComment(OPTION_DOWNVOTE);
