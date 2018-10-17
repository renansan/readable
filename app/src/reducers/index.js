import { combineReducers } from 'redux'

import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UPVOTE,
  DOWNVOTE,
} from '../actions'

const defaultState = {
  posts: [
    {
      id: 'nkp7js6phap',
      timestamp: '2018-10-17T03:08:46.964Z',
      title: 'Title 3',
      body: 'Message 3',
      author: 'Author 3',
      category: 'cat-3',
      voteScore: 0
    },
    {
      id: 'd9y0jr0scef',
      timestamp: '2018-10-17T03:08:37.465Z',
      title: 'Title 2',
      body: 'Message 2',
      author: 'Author 2',
      category: 'cat-2',
      voteScore: 0
    },
    {
      id: 'q9etvq1yn4q',
      timestamp: '2018-10-17T03:08:31.714Z',
      title: 'Title',
      body: 'Message',
      author: 'Author',
      category: 'cat-1',
      voteScore: 0
    }
  ]
}

function posts (state = defaultState.posts, action) {
  const { id, timestamp, title, body, author, category, voteScore } = action;
  const currentVote = state.some(function (item) {
    if (item.id === action.id) return item.voteScore
  });
  let newVote = null;

  switch (action.type) {
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
        },
        ...state,
      ]

    case EDIT_POST :
      return state.map(item => (item.id === action.id) ? { ...item, title, body } : item);

    case DELETE_POST :
      return state.filter((item) => item.id !== action.id)

    case UPVOTE :
      newVote = currentVote + 1;
      return state.map(item => (item.id === action.id) ? { ...item, voteScore: newVote } : item);

    case DOWNVOTE :
      newVote = currentVote - 1;
      return state.map(item => (item.id === action.id) ? { ...item, voteScore: newVote } : item);

    default :
      return state
  }
}

export default combineReducers({ posts })
