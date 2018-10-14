import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PostMeta from '../components/PostMeta';
import VoteScore from '../components/VoteScore';
import PostsList from '../components/PostsList';

class PostDetails extends Component {
  render() {
    return (
      <section className="post-details">
        <article className="post">
          <div className="post__info">
            <h1 className="post__title">Post 1</h1>
            <PostMeta />
            <div className="post__content">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem possimus debitis eligendi culpa quis, blanditiis fugiat aliquid ut vel aspernatur porro ipsum quaerat, explicabo dicta itaque facilis. Iusto, id, accusamus!</p>
            </div>
          </div>
          <VoteScore />
        </article>

        <div className="post__comments">
          <PostsList />
        </div>
      </section>
    );
  }
}

export default PostDetails;
