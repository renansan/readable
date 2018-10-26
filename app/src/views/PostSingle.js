import React, { Component } from 'react';
import Post from '../components/Post';
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';

class PostSingle extends Component {
  render() {
    const id = this.props.match.params.post;

    return (
      <section className="post-details">
        <Post id={id} single={true} />

        <div className="post-comments">
          <PostsList postType='comment' parentId={id} />
          <div className="post-comments__form">
            <h2>Add new Comment</h2>
            <PostForm postType='comment' parentId={id} />
          </div>
        </div>
      </section>
    );
  }
}

export default PostSingle;
