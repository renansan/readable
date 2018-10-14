import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PostMeta extends Component {
  render() {
    return (
      <div className="post__meta">
        <span className="post__categories">
          <Link to="/category/cat-1" className="post__category">Category 1</Link>
        </span>
        <span className="post__author">Posted by <b>Renan</b></span>
        <span className="post__date"><Link to="/post/post-1" title="13 Out 2018 23:33">a day ago</Link></span>
        <span className="post__comments">0 comments</span>
      </div>
    );
  }
}

export default PostMeta;