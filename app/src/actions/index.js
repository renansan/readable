export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE = 'UPVOTE_POST'
export const DOWNVOTE = 'DOWNVOTE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function receiveCategories (categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function addPost ({ id, timestamp, title, body, author, category, comments, voteScore, parentId, postType }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    parentId,
    postType,
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

export function upvote (id) {
  return {
    type: UPVOTE,
    id,
  }
}

export function downvote (id) {
  return {
    type: DOWNVOTE,
    id,
  }
}
