import React from 'react';
import PostForm from '../components/PostForm';

const PostEdit = () => {
  return (
    <div className="post-edit">
      <h1 className="page__title">Add New Post</h1>
      <PostForm postType='post' />
    </div>
  );
}

export default PostEdit;
