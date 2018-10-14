import React, { Component } from 'react';

class PostForm extends Component {
  render() {
    return (
      <form action="#!" className="form post-form">
        <label className="form__control">
          <span className="form__label">Title</span>
          <input type="text" name="post-title"/>
        </label>
        <label className="form__control">
          <span className="form__label">Author</span>
          <input type="text" name="post-author"/>
        </label>
        <label className="form__control">
          <span className="form__label">category</span>
          <select name="post-author">
            <option value="cat-1">Category 1</option>
            <option value="cat-2">Category 2</option>
            <option value="cat-3">Category 3</option>
          </select>
        </label>
        <label className="form__control">
          <span className="form__label">category</span>
          <textarea name="post-message" cols="30" rows="10"></textarea>
        </label>
      </form>
    );
  }
}

export default PostForm;
