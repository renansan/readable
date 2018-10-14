import React, { Component } from 'react';
import PostsList from '../components/PostsList';

class Category extends Component {
  render() {
    return (
      <div className="category">
        <h1 className="category__title">Category 1</h1>
        <PostsList />
      </div>
    );
  }
}

export default Category;
