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

const initialState = {
  posts: [
    {
      id: 'nkp7js6phap',
      timestamp: '2018-10-16T03:40:46.964Z',
      title: 'Post 3',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab nobis tempora magni harum, possimus numquam dicta sequi quod fugiat eligendi consequatur, molestias inventore iste dolore! Officia adipisci earum, reprehenderit pariatur!',
      author: 'Author 3',
      category: 'react',
      voteScore: 0,
      parentId: '',
      postType: 'post',
    },
    {
      id: 'd9y0jr0scef',
      timestamp: '2018-10-17T03:30:37.465Z',
      title: 'Post 2',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo dolorum asperiores quis similique, perspiciatis neque mollitia quas quibusdam vero corporis magnam voluptatem incidunt tenetur aperiam, commodi magni, a! Sunt, quisquam.',
      author: 'Author 2',
      category: 'redux',
      voteScore: 0,
      parentId: '',
      postType: 'post',
    },
    {
      id: 'q9etvq1yn4q',
      timestamp: '2018-10-18T08:08:31.714Z',
      title: 'Post',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus veritatis dicta quis aperiam. Sunt molestiae esse quibusdam sapiente, necessitatibus debitis, quia libero dolorem dicta. Velit quisquam atque blanditiis quas iste.',
      author: 'Author',
      category: 'udacity',
      voteScore: 0,
      parentId: '',
      postType: 'post',
    },
  ],
  comments: [
    {
      id: 1,
      timestamp: '2018-10-18T22:00:00.714Z',
      body: 'Message Comentário errado',
      author: 'Author',
      parentId: 'nkp7js6phap',
      voteScore: 0
    }
  ],
}

function posts (state = initialState.posts, action) {
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
