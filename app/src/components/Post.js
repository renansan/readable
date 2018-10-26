import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { upvote, downvote } from '../actions'
// import PostMeta from '../components/PostMeta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import * as ReadableAPI from '../api/ReadableAPI'

/**
 * Post
 * @extends Component
 */
class Post extends Component {
  constructor(props) {
    super(props);
    this.upvote = props.upvote;
    this.downvote = props.downvote;
    this.postType = props.postType || 'post';
  }

  render() {
    const { id, title, body, category, author, timestamp, voteScore, parentId } = this.props.post || {};
    const excerpt = (body && body.length > 140) ? body.substring(0, 140) + '…' : body;
    const { postComments } = this.props;
    const isSingle = this.props.single;
    const isPost = !(parentId || []).length;
    const link = (category) ? `/${category}/${this.props.id}` : `#${this.props.id}`;

    if (!id) return null

    return (
      <article id={id} className={`post ${(!isSingle) ? 'posts__item' : ''}`}>
        <div className="post__info">
          {isSingle ? (
            <h1 className="post__title">{title}</h1>
          ) : (
            <h2 className="post__title"><Link to={link}>{title}</Link></h2>
          )}
          <div className="post__content">{(isSingle) ? body : excerpt}</div>
          <div className="post__meta">
            {this.postType === 'post' && category ? (
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

const mapStateToProps = ({ posts, comments }, { id, postType }) => {
  const filteredPosts = (postType === 'comment') ? comments : posts;
  const post = filteredPosts.filter(item => item.id === id)[0];
  const postComments = (postType === 'comments') ? comments.filter(item => item.parentId === id) : [];
  return { post, postComments }
};

const mapDispatchToProps = dispatch => {
  return {
    upvote: (id, callback = function(){}) => ReadableAPI.editPostScore(id, 'upVote').then(response => {
      dispatch(upvote(id))
      callback(response);
    }),
    downvote: (id, callback = function(){}) => ReadableAPI.editPostScore(id, 'downVote').then(response => {
      dispatch(downvote(id))
      callback(response);
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
