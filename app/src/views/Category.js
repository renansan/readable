import React, { Component } from 'react';
import PostsList from '../components/PostsList';

class Category extends Component {
  render() {
    const { pathname } = this.props.location;
    const category = pathname.substr(pathname.lastIndexOf('/') + 1);

    return (
      <div className="category">
        <h1 className="page__title">{category}</h1>
        <PostsList category={category} />
      </div>
    );
  }
}

export default Category;
