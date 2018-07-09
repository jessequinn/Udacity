import { v4 } from 'uuid';

const ROOT_URL = "http://localhost:3001";

const headers = {
  Accept: "application/json",
  Authorization: "jessequinn"
};

// GET /categories
// USAGE:
// Get all of the categories available for the app. List is found in categories.js.
// Feel free to extend this list as you desire.

export const getCategories = () => {
  return fetch(`${ROOT_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);
};

// GET /:category/posts
// USAGE:
// Get all of the posts for a particular category

export const getPosts = () => {
  return fetch(`${ROOT_URL}/posts`, { headers }).then(res => res.json());
};

// POST /posts
// USAGE:
// Add a new post
//
// PARAMS:
// id - UUID should be fine, but any unique id will work
// timestamp - timestamp in whatever format you like, you can use Date.now() if you like
// title - String
// body - String
// author - String
// category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

export const createPost = (data) => {
  return fetch(`${ROOT_URL}/posts`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...data,
        id: v4(),
        timestamp: Date.now()
      })
    })
    .then(res => res.json());
}

// GET /posts
// USAGE:
// Get all of the posts. Useful for the main page when no category is selected.

//     GET /posts/:id
//       USAGE:
//         Get the details of a single post
//
//     POST /posts/:id
//       USAGE:
//         Used for voting on a post
//       PARAMS:
//         option - String: Either "upVote" or "downVote"
//
//     PUT /posts/:id
//       USAGE:
//         Edit the details of an existing post
//       PARAMS:
//         title - String
//         body - String
//
//     DELETE /posts/:id
//       USAGE:
//         Sets the deleted flag for a post to 'true'.
//         Sets the parentDeleted flag for all child comments to 'true'.
//
//     GET /posts/:id/comments
//       USAGE:
//         Get all the comments for a single post
//
//     POST /comments
//       USAGE:
//         Add a comment to a post
//
//       PARAMS:
//         id: Any unique ID. As with posts, UUID is probably the best here.
//         timestamp: timestamp. Get this however you want.
//         body: String
//         author: String
//         parentId: Should match a post id in the database.
//
//     GET /comments/:id
//       USAGE:
//         Get the details for a single comment
//
//     POST /comments/:id
//       USAGE:
//         Used for voting on a comment.
//       PARAMS:
//         option - String: Either "upVote" or "downVote"
//
//     PUT /comments/:id
//       USAGE:
//         Edit the details of an existing comment
//
//       PARAMS:
//         timestamp: timestamp. Get this however you want.
//         body: String
//
//     DELETE /comments/:id
//       USAGE:
//         Sets a comment's deleted flag to 'true'
