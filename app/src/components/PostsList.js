import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PostMeta from '../components/PostMeta';
import VoteScore from '../components/VoteScore';

class PostsList extends Component {

  state = {
    order: 'recents',
  }

  //handle changes on ShelfSelector
  handleChange = (event) => {
    this.setState({ order: event.target.value })
  }

  render() {
    const { posts } = this.props;
    return (
      <section className="posts">
        <header className="posts__header">
          <div className="posts__counter">{posts.length} posts</div>
          <select className="posts__order" value={this.state.order} onChange={this.handleChange}>
            <option value="score">Votes</option>
            <option value="recents">Recents</option>
            <option value="oldest">Oldest</option>
          </select>
        </header>
        {!posts.length ? (
          <span>No posts to show</span>
        ) : (
          <div className="posts__list">
            {posts.map((post, index) => {
              const meta = (({ timestamp, category, author }) => ({ timestamp, category, author }))(post);
              return (
                <article key={index} className="post posts__item">
                  <div className="post__info">
                    <h2 className="post__title"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h2>
                    <PostMeta id={post.id} data={meta} />
                  </div>
                  <div className="post__score">
                    <VoteScore />
                  </div>
                </article>
            )})}
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return { posts }
};

export default connect(mapStateToProps)(PostsList);
