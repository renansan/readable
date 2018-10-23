import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { upvote, downvote } from '../actions'
// import PostMeta from '../components/PostMeta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

/**
 * Post
 * @extends Component
 */
class Post extends Component {
  constructor(props) {
    super(props);
    this.upvote = props.upvote;
    this.downvote = props.downvote;
  }

  render() {
    const { id, title, body, category, author, timestamp, voteScore, parentId, postType } = this.props.post;
    const postComments = this.props.postComments;
    const isSingle = this.props.single;
    const isPost = !(parentId || []).length;
    const link = (category) ? `/${category}/${this.props.id}` : `#${this.props.id}`;

    return (
      <article id={id} className={`post ${(!isSingle) ? 'posts__item' : ''}`}>
        <div className="post__info">
          {isSingle ? (
            <h1 className="post__title">{title}</h1>
          ) : (
            <h2 className="post__title"><Link to={link}>{title}</Link></h2>
          )}
          {isSingle || !isPost ? (
            <div className="post__content">{body}</div>
          ) : ''}
          <div className="post__meta">
            {postType === 'post' && (category || []).length ? (
              <span className="post__categories">
                <Link to={`/category/${category}`} className="post__category">{category}</Link>
              </span>
            ) : ''}
            <span className="post__author">Posted by <b>{author}</b></span>
            <span className="post__date">
              <Link
                to={ link }
                title={ moment(timestamp).format('MMM DD YYYY HH:mm') }>
                {moment(timestamp).fromNow()}
              </Link>
            </span>
            {(!isSingle && isPost) && (
              <span className="post__comments">{postComments.length} comments</span>
            )}
          </div>
        </div>
        <div className="post__score">
          <div className="score">
            <button
              type="button"
              className="score__vote-button score__update"
              title="Upvote"
              onClick={() => this.upvote(id)}>
              <FontAwesomeIcon className="score__icon" icon="chevron-up" />
            </button>
            <span className="score__current">{voteScore}</span>
            <button
              type="button"
              className="score__vote-button score__downdate"
              title="Downvote"
              onClick={() => this.downvote(id)}>
              <FontAwesomeIcon className="score__icon" icon="chevron-down" />
            </button>
          </div>
        </div>
      </article>
    );
  }
}

const mapStateToProps = ({ posts }, { id, postType }) => {
  const post = posts.filter(item => item.id === id)[0];
  const postComments = posts.filter(item => item.parentId === id);
  return { post, postComments }
};

const mapDispatchToProps = dispatch => {
  return {
    upvote: (id) => dispatch(upvote(id)),
    downvote: (id) => dispatch(downvote(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
