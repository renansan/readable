const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * Readable API
 * @info: http://localhost:3001/
 */
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

/**
 * Add Post
 * @param {Object} post  The post params (id, timestamp, title, body, author, category)
 */
export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

/**
 * Delete Post
 * @param {String} postId
 */
export const deletePost = (postId) =>
fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'DELETE',
  }).then(res => res.json())

/**
 * Edit Post
 * @param {String} postId
 * @param {Object} details  New title and message (title, body)
 */
export const editPost = (postId, details) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  }).then(res => res.json())

/**
 * Edit Score
 * @param {String} postId
 * @param {String} option  A vote option ("upVote"/"downVote")
 */
export const editPostScore = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())

/**
* Get Post Comments
* @param {String} postId  The post ID
*/
export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

/**
* Get Comment
* @param {String} commentId  The comment ID
*/
export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data)

/**
* Add Comment
* @param {Object} comment  The comment params (id, timestamp, body, author, parentId)
*/
export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

/**
* Delete Comment
* @param {String} commentId
*/
export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'DELETE',
  }).then(res => res.json())

/**
* Edit Comment
* @param {String} commentId  The comment ID
* @param {Object} details    The comment details (timestamp, body)
*/
export const editComment = (commentId, details) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  }).then(res => res.json())

/**
 * Edit Comment Score
 * @param {String} commentId
 * @param {String} voteOption  A vote option ("upVote"/"downVote")
 */
export const editCommentScore = (commentId, voteOption) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(voteOption)
  }).then(res => res.json())
