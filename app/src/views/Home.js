import React, { Component } from 'react';
import PostsList from '../components/PostsList';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <PostsList />
      </div>
    );
  }
}

export default Home;
