import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
// import PostMeta from '../components/PostMeta';
import VoteScore from '../components/VoteScore';
import moment from 'moment'

class Post extends Component {

  render() {
    const { id, title, body, category, author, timestamp, comments } = this.props.post;
    const isSingle = this.props.single;
    return (
      <article className={`post ${(!isSingle) ? 'posts__item' : ''}`}>
        <div className="post__info">
          {isSingle ? (
            <h1 className="post__title">{title}</h1>
          ) : (
            <h2 className="post__title"><Link to={`/${category}/${id}`}>{title}</Link></h2>
          )}
          <div className="post__meta">
            {category && category.length ? (
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
            <span className="post__comments">{comments.length} comments</span>
          </div>
          {isSingle ? (
            <div className="post__content">{body}</div>
          ) : ''}
        </div>
        <div className="post__score">
          <VoteScore />
        </div>
      </article>
    );
  }
}

const mapStateToProps = ({ posts }, { id }) => {
  const post = posts.filter(item => item.id === id)[0];
  return { post }
};

export default connect(mapStateToProps)(Post);
