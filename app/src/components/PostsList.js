import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostMeta from '../components/PostMeta';
import VoteScore from '../components/VoteScore';

class PostsList extends Component {
  render() {
    return (
      <section className="posts">
        <header className="posts__header">
          <div className="posts__counter">10 posts</div>
          <select className="posts__order" name="" id="">
            <option value="score" selected>Votes</option>
            <option value="recents">Recents</option>
            <option value="oldest">Oldest</option>
          </select>
        </header>
        <div className="posts__list">
          <article className="post">
            <div className="post__info">
              <h2 className="post__title"><Link to="/post/post-1">Post 1</Link></h2>
              <PostMeta />
            </div>
            <div className="post__score">
              <VoteScore />
            </div>
          </article>
        </div>
      </section>
    );
  }
}

export default PostsList;
