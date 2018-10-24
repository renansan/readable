import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Post from '../components/Post';
import * as ReadableAPI from '../api/ReadableAPI'

/**
 * PostsList
 * @extends Component
 */
class PostsList extends Component {
  constructor(props) {
    super(props);
    this.postType = this.props.postType || 'post';
  }

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
    const { posts, category } = this.props;
    let postsLists = posts || [];

    if (category) postsLists = postsLists.filter(item => item.category === category);

    if (!postsLists) return null;

    return (
      <section className="posts">
        <header className="posts__header">
          <div className="posts__counter">{`${postsLists.length} ${this.postType}${postsLists.length !== 1  ? 's' : ''}`}</div>
          <select className="posts__order" value={this.state.order} onChange={this.handleChange}>
            <option value="votes">Votes</option>
            <option value="recents">Recents</option>
            <option value="oldest">Oldest</option>
          </select>
        </header>
        {!postsLists.length ? (
          <span>{/*No {`${this.postType}s`} to show*/}</span>
        ) : (
          <div className="posts__list">
            {postsLists.sort(this.handleSort(this.state.order)).map((post, index) => (
              <Post key={index} id={post.id} postType={this.postType} />
            ))}
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ posts, comments }, { parentId }) => {
  let postsList = (parentId) ? comments : posts;
  let filteredPosts = postsList.filter(item => item.parentId === parentId);
  return { posts: filteredPosts }
};

const mapDispatchToProps = dispatch => { return {}}

export default connect(mapStateToProps)(PostsList);
