import React, { Component } from 'react';
import Post from '../components/Post';
import PostsList from '../components/PostsList';

class PostSingle extends Component {
  render() {
    const { pathname } = this.props.location;
    const id = pathname.substr(pathname.lastIndexOf('/') + 1);

    return (
      <section className="post-details">
        <Post id={id} single={true} />

        <div className="post__comments">
          <PostsList parentId={id} />
        </div>
      </section>
    );
  }
}

export default PostSingle;
