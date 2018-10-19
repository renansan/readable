export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE = 'UPVOTE'
export const DOWNVOTE = 'DOWNVOTE'

export function addPost ({ id, timestamp, title, body, author, category, comments, voteScore }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    comments,
    voteScore,
  }
}

export function editPost ({ id, title, body }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body,
  }
}

export function deletePost ({ id }) {
  return {
    type: DELETE_POST,
    id,
  }
}

export function upvote ({ id, voteScore }) {
  return {
    type: UPVOTE,
    id,
    voteScore,
  }
}

export function downvote ({ id, voteScore }) {
  return {
    type: DOWNVOTE,
    id,
    voteScore,
  }
}
