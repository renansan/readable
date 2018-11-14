import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

class PostMeta extends Component {
  render() {
    const { id, category, author, timestamp } = this.props.post;
    return (
      <div className="post__meta">
        {category.length ? (
          <span className="post__categories">
            <Link to={`/category/${category}`} className="post__category">{category}</Link>
          </span>
        ) : ''}
        <span className="post__author">Posted by <b>{author}</b></span>
        <span className="post__date">
          <Link
            to={ `/${category}/${id}` }
            title={ moment(timestamp).format('MMM DD YYYY HH:mm') }>
            {moment(timestamp).fromNow()}
          </Link>
        </span>
        <span className="post__comments">0 comments</span>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }, { id }) => {
  const post = posts.filter(item => item.id === id)[0];
  return { post }
};

export default connect(mapStateToProps)(PostMeta);
