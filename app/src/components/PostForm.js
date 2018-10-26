import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPost, addComment } from '../actions'
import {withRouter} from 'react-router-dom';
import moment from 'moment'
import * as ReadableAPI from '../api/ReadableAPI'

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

  handleChange = event => {
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj)
  }

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
      voteScore: 0,
      parentId: this.props.parentId || '',
    }, function (response) {
      if (postType === 'post') {
        history.push(`/${category}/${id}`);
      }
    })
  }

  static getDerivedStateFromProps(props, state) {
    const categories = (props.categories);
    const defaultCategory = (categories.length) ? categories[0].path : '';
    if (state.category !== defaultCategory) {
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
          <button type="submit" className="button form__button">Submit</button>
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
    addPost: ((type, data, callback) => {
      if (type === 'post') {
        ReadableAPI.addPost(data).then(response => {
          dispatch(addPost(response))
        });
      } else {
        ReadableAPI.addComment(data).then(response => {
          dispatch(addComment(response))
        });
      }
    }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
