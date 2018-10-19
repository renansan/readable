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
      timestamp: '2018-10-16T03:40:46.964Z',
      title: 'Post 3',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab nobis tempora magni harum, possimus numquam dicta sequi quod fugiat eligendi consequatur, molestias inventore iste dolore! Officia adipisci earum, reprehenderit pariatur!',
      author: 'Author 3',
      category: 'react',
      comments: [],
      voteScore: 0
    },
    {
      id: 'd9y0jr0scef',
      timestamp: '2018-10-17T03:30:37.465Z',
      title: 'Post 2',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo dolorum asperiores quis similique, perspiciatis neque mollitia quas quibusdam vero corporis magnam voluptatem incidunt tenetur aperiam, commodi magni, a! Sunt, quisquam.',
      author: 'Author 2',
      category: 'redux',
      comments: [],
      voteScore: 0
    },
    {
      id: 'q9etvq1yn4q',
      timestamp: '2018-10-18T08:08:31.714Z',
      title: 'Post',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus veritatis dicta quis aperiam. Sunt molestiae esse quibusdam sapiente, necessitatibus debitis, quia libero dolorem dicta. Velit quisquam atque blanditiis quas iste.',
      author: 'Author',
      category: 'udacity',
      comments: [1],
      voteScore: 0
    }
  ],
  comments: [
    {
      id: 1,
      timestamp: '2018-10-18T22:00:00.714Z',
      title: 'Comment',
      body: 'Message',
      author: 'Author',
      parentId: 'nkp7js6phap',
      voteScore: 0
    }
  ]
}

function posts (state = defaultState.posts, action) {
  const { id, timestamp, title, body, author, category, comments, voteScore } = action;
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
          comments,
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
