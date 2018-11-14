import React, { Component } from 'react';
import PostForm from '../components/PostForm';

class PostEdit extends Component {
  render() {
    return (
      <div className="post-edit">
        <h1 className="page__title">Add New Post</h1>
        <PostForm postType='post' />
      </div>
    );
  }
}

export default PostEdit;
