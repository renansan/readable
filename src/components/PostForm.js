import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPost, addComment } from '../actions'
import {withRouter} from 'react-router-dom';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.addPost = props.addPost;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    title: '',
    author: '',
    category: '',
    message: '',
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  handleSubmit = event => {
    event.preventDefault();
    const { title, author, category, message } = this.state;
    const { postType, history } = this.props;
    const id = Math.random().toString(36).substr(2, 16);
    const timestamp = moment();

    this.addPost(postType, {
      id,
      timestamp,
      title,
      body: message,
      author,
      category,
      parentId: this.props.parentId || null,
    }, function (response) {
      if (postType === 'post') {
        history.push(`/${category}/${id}`);
      }
    })
  }

  static getDerivedStateFromProps(props, state) {
    const defaultCategory = (props.categories[0] || []).path || '';
    if (!state.category && state.category !== defaultCategory) {
      return {
        category: defaultCategory
      }
    }
    return null
  }

  render() {
    const { postType, categories } = this.props;
    return (
      <form action="#!" className="form post-form" onSubmit={this.handleSubmit}>
        { postType === 'post' && (
          <label className="form__control">
            <span className="form__label">Title</span>
            <input className="form__field" type="text" name="title" onChange={this.handleChange} value={this.state.title} required />
          </label>
        )}
        <label className="form__control">
          <span className="form__label">Author</span>
          <input className="form__field" type="text" name="author" onChange={this.handleChange} value={this.state.author} required />
        </label>
        { postType === 'post' && (
          <label className="form__control">
            <span className="form__label">Category</span>
            <select className="form__field" name="category" onChange={this.handleChange} value={this.state.categories} required>
              {categories.length ? categories.map((cat, index) => (
                <option key={index} value={cat.path}>{cat.name}</option>
              )) : ''}
            </select>
          </label>
        )}
        <label className="form__control">
          <span className="form__label">Message</span>
          <textarea className="form__field" name="message" onChange={this.handleChange} value={this.state.message} cols="30" rows="10" required></textarea>
        </label>
        <label className="form__submit">
          <button type="submit" className="button form__button">
            <FontAwesomeIcon className="button__icon" icon="paper-plane" />
            Submit
          </button>
          { postType === 'post' && (
            <button type="button" onClick={() => this.props.history.goBack()} className="button button--ghost is-danger form__button">Cancel</button>
          )}
        </label>
      </form>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: ((type, data, cb) => {
      if (type === 'post') {
        dispatch(addPost(data, cb));
      } else {
        dispatch(addComment(data, cb));
      }
    }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
