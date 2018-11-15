import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

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
      this.editPost({
        id,
        title,
        body,
      }, () => {
        this.setState({ title, body });
        this.closePostEdit();
      });
    } else {
      this.editComment({
        id,
        body,
      }, () => {
        this.setState({ body });
        this.closePostEdit();
      });
    }
  }

  deleteCurrentPost = event => {
    const { id, parentId } = this.props.post;

    if (this.postType === 'post') {
      this.deletePost(id, () => {
        this.props.history.push('/');
      });
    } else {
      this.deleteComment({id, parentId});
    }
  }

  toggleOverflowMenu = (option) => {
    this.setState((state, props) => {
      const value = (typeof option === 'boolean') ? option : !state.overflowMenuActive;
      return { overflowMenuActive: value }
    })
  }

  openPostEdit = () => {
    const { title, body } = this.props.post;
    this.setState({ title, body, editPost: true })
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
    const { title, body } = this.props.post || {};
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
                  title="Options">
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
                    Edit {this.postType}
                  </button>
                  <button
                    type="button"
                    className="overflow-menu__item is-danger"
                    title="Click to delete this post"
                    onClick={this.deleteCurrentPost}>
                    <FontAwesomeIcon className="icon is-danger" icon="trash-alt" />
                    Delete {this.postType}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="post__meta">
            {this.postType === 'post' && category ? (
              <span className="post__categories">
                <Link to={`/${category}`} className="post__category">{category}</Link>
              </span>
            ) : ''}
            <span className="post__author">{`${this.postType}ed`} by <b>{author}</b></span>
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
    editPost: (data, cb) => dispatch(editPost(data, cb)),
    deletePost: (id, cb) => dispatch(deletePost(id, cb)),
    upvotePost: (id, cb) => dispatch(upvotePost(id, cb)),
    downvotePost: (id, cb) => dispatch(downvotePost(id, cb)),
    fetchComments: (postId, cb) => dispatch(fetchComments(postId, cb)),
    editComment: (data, cb) => dispatch(editComment(data, cb)),
    deleteComment: (data, cb) => dispatch(deleteComment(data, cb)),
    upvoteComment: (id, cb) => dispatch(upvoteComment(id, cb)),
    downvoteComment: (id, cb) => dispatch(downvoteComment(id, cb)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
