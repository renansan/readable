import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Post from '../components/Post';

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
        return (a, b) => new Date(a.timestamp) > new Date(b.timestamp)
      case 'oldest':
        return (a, b) => new Date(a.timestamp) < new Date(b.timestamp)
      case 'votes':
        return (a, b) => a.voteScore > b.voteScore
      default:
      return (a, b) => new Date(a.timestamp) > new Date(b.timestamp)
    }
  }

  render() {
    let { posts } = this.props;
    const { category, parentId } = this.props;

    if (category) posts = posts.filter(item => item.category === category);
    // else if (parentId) posts = posts.filter(item => item.parentId === parentId);

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
            {posts.sort(this.handleSort(this.state.order)).map((post, index) => (
              <Post key={index} id={post.id} />
            ))}
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
