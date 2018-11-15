import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from '../components/Post';

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
    return (a, b) => {
      const aTime = new Date(a.timestamp);
      const bTime = new Date(b.timestamp);
      const compare = (x, y) => {
        if (x > y) return -1;
        else if (x < y) return 1;
        else return 0;
      }

      switch (order) {
        case 'oldest':
          return compare(bTime, aTime);
        case 'votes':
          return compare(a.voteScore, b.voteScore);
        default: // recents
          return compare(aTime, bTime);
      }
    }
  }

  render() {
    const { posts, category } = this.props;
    let postsLists = posts || [];

    if (category) postsLists = postsLists.filter(item => item.category === category);

    if (!postsLists) return null;

    postsLists = Array.prototype.sort.call(postsLists, this.handleSort(this.state.order));

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
          <p>{`No ${this.postType}s to show`}</p>
        ) : (
          <div className="posts__list">
            {postsLists.map((post, index) => (
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
  let filteredPosts = parentId ? postsList.filter(item => item.parentId === parentId) : postsList;
  return { posts: filteredPosts }
};

export default connect(mapStateToProps)(PostsList);
