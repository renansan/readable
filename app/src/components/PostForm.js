import React, { Component } from 'react';

class PostForm extends Component {
  render() {
    return (
      <form action="#!" className="form post-form">
        <label className="form__control">
          <span className="form__label">Title</span>
          <input className="form__field" type="text" name="post-title"/>
        </label>
        <label className="form__control">
          <span className="form__label">Author</span>
          <input className="form__field" type="text" name="post-author"/>
        </label>
        <label className="form__control">
          <span className="form__label">Category</span>
          <select className="form__field" name="post-author">
            <option value="cat-1">Category 1</option>
            <option value="cat-2">Category 2</option>
            <option value="cat-3">Category 3</option>
          </select>
        </label>
        <label className="form__control">
          <span className="form__label">Message</span>
          <textarea className="form__field" name="post-message" cols="30" rows="10"></textarea>
        </label>
        <label className="form__submit">
          <button type="submit" className="button form__button">Submit</button>
          <button type="button" className="button button--ghost is-danger form__button">Cancel</button>
        </label>
      </form>
    );
  }
}

export default PostForm;
