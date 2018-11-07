import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  deletePost,
  editPost,
  upvotePost,
  downvotePost,
  fetchComments,
  deleteComment,
  editComment,
  upvoteComment,
  downvoteComment,
 } from '../actions'
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
    this.upvote = (id, postType) => {
      if (postType === 'post') props.upvotePost(id);
      else props.upvoteComment(id);
    };
    this.downvote = (id, postType) => {
      if (postType === 'post') props.downvotePost(id);
      else props.downvoteComment(id);
    };
    this.editPost = props.editPost;
    this.deletePost = props.deletePost;
    this.fetchComments = props.fetchComments;
    this.editComment = props.editComment;
    this.deleteComment = props.deleteComment;
    this.postType = props.postType || 'post';
    this.submitPostEdit = this.submitPostEdit.bind(this);
  }

  state = {
    title: '',
    body: '',
    editPost: false,
    overflowMenuActive: false,
  }

  submitPostEdit = event => {
    event.preventDefault();
    const { title, body } = this.state;
    const { id } = this.props.post;
    if (this.postType === 'post') {
      this.editPost(id, {
        id,
        title,
        body,
      }, () => {
        this.setState({ title, body });
        this.closePostEdit();
      });
    } else {
      this.editComment(id, {
        id,
        body,
      }, () => {
        this.setState({ body });
        this.closePostEdit();
      });
    }
  }

  deleteCurrentPost = event => {
    const { id } = this.props.post;
    if (this.postType === 'post') {
      this.deletePost(id);
    } else {
      this.deleteComment(id);
    }
  }

  toggleOverflowMenu = (option) => {
    this.setState((state, props) => {
      const value = (typeof option === 'boolean') ? option : !state.overflowMenuActive;
      return { overflowMenuActive: value }
    })
  }

  openPostEdit = () => {
    this.setState({ editPost: true })
  }

  closePostEdit = () => {
    this.setState({ editPost: false })
  }

  handleChange = event => {
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  componentDidMount() {
    const { id, title, body } = this.props.post || {};
    this.setState({ title, body });
  }

  render() {
    const { id, commentCount, title, body, category, author, timestamp, voteScore, parentId } = this.props.post || {};
    const excerpt = (body && body.length > 140) ? body.substring(0, 140) + '…' : body;
    const isSingle = this.props.single;
    const isPost = !(parentId || []).length;
    const link = (category) ? `/${category}/${this.props.id}` : `#${this.props.id}`;
    const { editPost, overflowMenuActive } = this.state;

    if (!id) return null

    return (
      <article id={id} className={`post ${(!isSingle) ? 'posts__item' : ''}`}>
        <div className="post__info">
          {editPost ? (
            <form className="form post__form" onSubmit={this.submitPostEdit} noValidate>
              <div className="form__control">
                {isPost && (
                  <input
                    autoFocus
                    className="form__field"
                    type="text"
                    name="title"
                    onChange={this.handleChange}
                    value={this.state.title}
                    required/>
                )}
              </div>
              <div className="form__control">
                <textarea
                  autoFocus={(isPost) ? false : true}
                  className="form__field"
                  name="body"
                  onChange={this.handleChange}
                  value={this.state.body}
                  required></textarea>
              </div>
              <div className="form__submit">
                <button type="submit" className="button form__button">Submit</button>
                <button type="button" onClick={this.closePostEdit} className="button button--ghost is-danger form__button">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="post__content">
              {isSingle ? (
                <h1 className="post__title">{title}</h1>
              ) : (
                <h2 className="post__title"><Link to={link}>{title}</Link></h2>
              )}
              <div className="post__body">{(isSingle) ? body : excerpt}</div>
              <div className="post__actions">
                <button
                  type="button"
                  className="post__actions-button"
                  onFocus={this.toggleOverflowMenu}
                  title="Edit Post">
                  {overflowMenuActive ? (
                    <FontAwesomeIcon className="icon" icon="times" />
                  ) : (
                    <FontAwesomeIcon className="icon" icon="ellipsis-v" />
                  )}
                </button>
                <div tabIndex={-1} className={`overflow-menu ${(overflowMenuActive) ? 'overflow-menu--active' : ''}`} onClick={e => this.toggleOverflowMenu(false)}>
                  <button
                    type="button"
                    className="overflow-menu__item"
                    title="Click to edit this post"
                    onClick={this.openPostEdit}>
                    <FontAwesomeIcon className="icon" icon="edit" />
                    Edit Post
                  </button>
                  <button
                    type="button"
                    className="overflow-menu__item is-danger"
                    title="Click to delete this post"
                    onClick={this.deleteCurrentPost}>
                    <FontAwesomeIcon className="icon is-danger" icon="trash-alt" />
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          )}
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
              <span className="post__comments">{commentCount} comments</span>
            )}
          </div>
        </div>
        <div className="post__score">
          <div className="score">
            <button
              type="button"
              className="score__vote-button score__update"
              title="Upvote"
              onClick={() => this.upvote(id, this.postType)}>
              <FontAwesomeIcon className="score__icon" icon="chevron-up" />
            </button>
            <span className="score__current">{voteScore}</span>
            <button
              type="button"
              className="score__vote-button score__downdate"
              title="Downvote"
              onClick={() => this.downvote(id, this.postType)}>
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
  return { post }
};

const mapDispatchToProps = dispatch => {
  return {
    editPost: (id, data, callback = function(){}) => ReadableAPI.editPost(id, data).then(response => {
      dispatch(editPost(data))
      callback(response);
    }),
    deletePost: (id, callback = function(){}) => ReadableAPI.deletePost(id).then(response => {
      dispatch(deletePost({id}))
      callback(response);
    }),
    upvotePost: (id, callback = function(){}) => ReadableAPI.editPostScore(id, 'upVote').then(response => {
      dispatch(upvotePost(id))
      callback(response);
    }),
    downvotePost: (id, callback = function(){}) => ReadableAPI.editPostScore(id, 'downVote').then(response => {
      dispatch(downvotePost(id))
      callback(response);
    }),
    fetchComments: (id, callback = function(){}) => ReadableAPI.getPostComments(id).then(response => {
      dispatch(fetchComments(response));
      callback(response);
    }),
    editComment: (id, data, callback = function(){}) => ReadableAPI.editComment(id, data).then(response => {
      dispatch(editComment(data))
      callback(response);
    }),
    deleteComment: (id, callback = function(){}) => ReadableAPI.deleteComment(id).then(response => {
      dispatch(deleteComment({id}))
      callback(response);
    }),
    upvoteComment: (id, callback = function(){}) => ReadableAPI.editCommentScore(id, 'upVote').then(response => {
      dispatch(upvoteComment(id))
      callback(response);
    }),
    downvoteComment: (id, callback = function(){}) => ReadableAPI.editCommentScore(id, 'downVote').then(response => {
      dispatch(downvoteComment(id))
      callback(response);
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
