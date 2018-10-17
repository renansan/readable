import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPost } from '../actions'
import moment from 'moment'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.addPost = props.addPost;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    title: 'Title',
    author: 'Author',
    category: 'cat-1',
    message: 'Message',
  }

  handleChange = event => {
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj)
  }

  handleSubmit = event => {
    event.preventDefault();
    const { title, author, category, message } = this.state;
    const id = Math.random().toString(36).substr(2, 16);
    const timestamp = moment();
    this.addPost({
      id,
      timestamp,
      title,
      author,
      category,
      body: message,
      voteScore: 0,
    })
  }

  render() {
    return (
      <form action="#!" className="form post-form" onSubmit={this.handleSubmit}>
        <label className="form__control">
          <span className="form__label">Title</span>
          <input className="form__field" type="text" name="title" onChange={this.handleChange} value={this.state.title} required />
        </label>
        <label className="form__control">
          <span className="form__label">Author</span>
          <input className="form__field" type="text" name="author" onChange={this.handleChange} value={this.state.author} required />
        </label>
        <label className="form__control">
          <span className="form__label">Category</span>
          <select className="form__field" name="category" onChange={this.handleChange} value={this.state.category} required>
            <option value="cat-1">Category 1</option>
            <option value="cat-2">Category 2</option>
            <option value="cat-3">Category 3</option>
          </select>
        </label>
        <label className="form__control">
          <span className="form__label">Message</span>
          <textarea className="form__field" name="message" onChange={this.handleChange} value={this.state.message} cols="30" rows="10" required></textarea>
        </label>
        <label className="form__submit">
          <button type="submit" className="button form__button">Submit</button>
          <button type="button" className="button button--ghost is-danger form__button">Cancel</button>
        </label>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: data => dispatch(addPost(data))
  }
}

export default connect(null, mapDispatchToProps)(PostForm)
