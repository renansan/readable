import { combineReducers } from 'redux'

import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  FETCH_POSTS,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  FETCH_COMMENTS,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  FETCH_CATEGORIES,
} from '../actions'

function posts (state = [], action) {
  const { id, timestamp, title, body, author, category, voteScore, parentId, commentCount } = action;

  switch (action.type) {
    case FETCH_POSTS :
      return action.posts

    case ADD_POST :
      return [
        {
          id,
          timestamp,
          title,
          body,
          author,
          category,
          voteScore,
          parentId,
          commentCount,
        },
        ...state,
      ]

    case EDIT_POST :
      return state.map(item => (item.id === action.id) ? { ...item, title, body } : item);

    case DELETE_POST :
      return state.filter((item) => item.id !== action.id)

    case UPVOTE_POST :
      return state.map(item => (item.id === action.id) ? Object.assign({}, item, { voteScore: item.voteScore + 1 }) : item);

    case DOWNVOTE_POST :
      return state.map(item => (item.id === action.id) ? Object.assign({}, item, { voteScore: item.voteScore - 1 }) : item);

    case ADD_COMMENT :
      return state.map(item => (item.id === action.parentId) ? Object.assign({}, item, { commentCount: item.commentCount + 1 }) : item);

    case DELETE_COMMENT :
      return state.map(item => (item.id === action.parentId) ? Object.assign({}, item, { commentCount: item.commentCount - 1 }) : item);

    default :
      return state
  }
}

function comments (state = [], action) {
  const { id, timestamp, body, author, parentId, voteScore } = action;

  switch (action.type) {
    case FETCH_COMMENTS :
      return [
        ...state,
        ...action.comments
      ]

    case ADD_COMMENT :
      return [
        {
          id,
          timestamp,
          body,
          author,
          parentId,
          voteScore,
        },
        ...state,
      ]

    case EDIT_COMMENT :
      return state.map(item => (item.id === action.id) ? { ...item, body } : item);

    case DELETE_COMMENT :
      return state.filter((item) => item.id !== action.id)

    case UPVOTE_COMMENT :
      return state.map(item => (item.id === action.id) ? Object.assign({}, item, { voteScore: item.voteScore + 1 }) : item);

    case DOWNVOTE_COMMENT :
      return state.map(item => (item.id === action.id) ? Object.assign({}, item, { voteScore: item.voteScore - 1 }) : item);

    default :
      return state
  }
}

function categories (state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES :
      return action.categories

    default :
      return state
  }
}

export default combineReducers({ posts, comments, categories })
