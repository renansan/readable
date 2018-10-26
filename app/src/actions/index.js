export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const FETCH_POSTS = 'FETCH_POSTS'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export function fetchPosts (posts) {
  return {
    type: FETCH_POSTS,
    posts
  }
}

export function addPost ({ id, timestamp, title, body, author, category, comments, voteScore, parentId, commentCount }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    commentCount,
    category,
    voteScore,
    parentId,
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

export function upvotePost (id) {
  return {
    type: UPVOTE_POST,
    id,
  }
}

export function downvotePost (id) {
  return {
    type: DOWNVOTE_POST,
    id,
  }
}

export function fetchComments (comments) {
  return {
    type: FETCH_COMMENTS,
    comments
  }
}

export function addComment ({ id, timestamp, title, body, author, category, comments, voteScore, parentId, commentType }) {
  return {
    type: ADD_COMMENT,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    parentId,
    commentType,
  }
}

export function editComment ({ id, title, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    title,
    body,
  }
}

export function deleteComment ({ id }) {
  return {
    type: DELETE_COMMENT,
    id,
  }
}

export function upvoteComment (id) {
  return {
    type: UPVOTE_COMMENT,
    id,
  }
}

export function downvoteComment (id) {
  return {
    type: DOWNVOTE_COMMENT,
    id,
  }
}

export function fetchCategories (categories) {
  return {
    type: FETCH_CATEGORIES,
    categories
  }
}
