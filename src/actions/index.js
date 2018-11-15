import * as ReadableAPI from '../api/ReadableAPI'

export const FETCH_POSTS = 'FETCH_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

const callback = () => {}

export const fetchPosts = (cb = callback) => dispatch => ReadableAPI.getAllPosts().then(res => {
  dispatch(fetchPostsAction(res));
  if (Array.isArray(res) && res.length) res.forEach(item => dispatch(fetchComments(item.id, cb.bind(res))));
});

export const addPost = (data, cb = callback) => dispatch => ReadableAPI.addPost(data).then(res => {
  dispatch(addPostAction(res))
  cb(res);
});

export const editPost = (data, cb = callback) => dispatch => ReadableAPI.editPost(data.id, data).then(res => {
  dispatch(editPostAction(data))
  cb(res);
})

export const deletePost = (id, cb = callback) => dispatch => ReadableAPI.deletePost(id).then(res => {
  dispatch(deletePostAction({id}))
  cb(res);
});

export const upvotePost = (id, cb = callback) => dispatch => ReadableAPI.editPostScore(id, 'upVote').then(res => {
  dispatch(upvotePostAction(id))
  cb(res);
});

export const downvotePost = (id, cb = callback) => dispatch => ReadableAPI.editPostScore(id, 'downVote').then(res => {
  dispatch(downvotePostAction(id))
  cb(res);
});

export const fetchComments = (postId, cb = callback) => dispatch => ReadableAPI.getPostComments(postId).then(res => {
  dispatch(fetchCommentsAction(res));
  cb(res);
});

export const addComment = (data, cb = callback) => dispatch => ReadableAPI.addComment(data).then(res => {
  dispatch(addCommentAction(res))
  cb(res);
});

export const editComment = (data, cb = callback) => dispatch => ReadableAPI.editComment(data.id, data).then(res => {
  dispatch(editCommentAction(data))
  cb(res);
});

export const deleteComment = (data, cb = callback) => dispatch => ReadableAPI.deleteComment(data.id).then(res => {
  dispatch(deleteCommentAction(data))
  cb(res);
});

export const upvoteComment = (id, cb = callback) => dispatch => ReadableAPI.editCommentScore(id, 'upVote').then(res => {
  dispatch(upvoteCommentAction(id))
  cb(res);
});

export const downvoteComment = (id, cb = callback) => dispatch => ReadableAPI.editCommentScore(id, 'downVote').then(res => {
  dispatch(downvoteCommentAction(id))
  cb(res);
});

export const fetchCategories = (cb = callback) => dispatch => ReadableAPI.getCategories().then(res => {
  dispatch(fetchCategoriesAction(res));
  cb(res);
});

const fetchPostsAction = (posts) => {
  return {
    type: FETCH_POSTS,
    posts
  }
}

const addPostAction = ({ id, timestamp, title, body, author, category, comments, voteScore, parentId, commentCount }) => {
  debugger;
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

const editPostAction = (data) => {
  return {
    type: EDIT_POST,
    ...data
  }
}

const deletePostAction = ({ id }) => {
  return {
    type: DELETE_POST,
    id,
  }
}

const upvotePostAction = (id) => {
  return {
    type: UPVOTE_POST,
    id,
  }
}

const downvotePostAction = (id) => {
  return {
    type: DOWNVOTE_POST,
    id,
  }
}

const fetchCommentsAction = (comments) => {
  return {
    type: FETCH_COMMENTS,
    comments
  }
}

const addCommentAction = ({ id, timestamp, title, body, author, category, comments, voteScore, parentId, commentType }) => {
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

const editCommentAction = ({ id, title, body }) => {
  return {
    type: EDIT_COMMENT,
    id,
    title,
    body,
  }
}

const deleteCommentAction = ({ id, parentId }) => {
  return {
    type: DELETE_COMMENT,
    id,
    parentId,
  }
}

const upvoteCommentAction = (id) => {
  return {
    type: UPVOTE_COMMENT,
    id,
  }
}

const downvoteCommentAction = (id) => {
  return {
    type: DOWNVOTE_COMMENT,
    id,
  }
}

const fetchCategoriesAction = (categories) => {
  return {
    type: FETCH_CATEGORIES,
    categories
  }
}
