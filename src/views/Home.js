import React, { Component } from 'react';
import PostsList from '../components/PostsList';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1 className="page__title">All Posts</h1>
        <PostsList />
      </div>
    );
  }
}

export default Home;