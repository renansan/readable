import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Post from '../components/Post';

/**
 * PostsList
 * @extends Component
 */
class PostsList extends Component {

  state = {
    order: 'recents',
  }

  //handle changes on ShelfSelector
  handleChange = (event) => {
    this.setState({ order: event.target.value })
  }

  handleSort = order => {
    switch (order) {
      case 'recents':
        return (a, b) => new Date(a.timestamp) < new Date(b.timestamp)
      case 'oldest':
        return (a, b) => new Date(a.timestamp) > new Date(b.timestamp)
      case 'votes':
        return (a, b) => a.voteScore < b.voteScore;
      default:
      return (a, b) => new Date(a.timestamp) < new Date(b.timestamp)
    }
  }

  render() {
    const { posts, category, postType } = this.props;
    let postsLists = posts;

    if (category) postsLists = postsLists.filter(item => item.category === category);

    return (
      <section className="posts">
        <header className="posts__header">
          <div className="posts__counter">{`${postsLists.length} ${postType}${postsLists.length !== 1  ? 's' : ''}`}</div>
          <select className="posts__order" value={this.state.order} onChange={this.handleChange}>
            <option value="votes">Votes</option>
            <option value="recents">Recents</option>
            <option value="oldest">Oldest</option>
          </select>
        </header>
        {!postsLists.length ? (
          <span>{/*No {`${postType}s`} to show*/}</span>
        ) : (
          <div className="posts__list">
            {postsLists.sort(this.handleSort(this.state.order)).map((post, index) => (
              <Post key={index} id={post.id} type={postType} />
            ))}
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ posts }, { parentId }) => {
  const filteredPosts = posts.filter(item => item.parentId === (parentId || ''))
  const postType = (parentId) ? 'comment' : 'post';
  return { posts: filteredPosts, postType }
};

export default connect(mapStateToProps)(PostsList);
