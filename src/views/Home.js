import React from 'react';
import PostsList from '../components/PostsList';

const Home = () => {
  return (
    <div className="home">
      <h1 className="page__title">All Posts</h1>
      <PostsList />
    </div>
  );
}

export default Home;
