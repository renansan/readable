import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import { connect } from 'react-redux'

class Category extends Component {
  render() {
    const category = this.props.category;

    if (!category) return null;

    return (
      <div className="category">
        <h1 className="page__title">{category.name}</h1>
        <PostsList category={category.path} />
      </div>
    );
  }
}

const mapStateToProps = ({ categories }, { location }) => {
  const path = location.pathname.substr(location.pathname.lastIndexOf('/') + 1);
  const category = categories.filter(item => item.path === path)[0];
  return { category }
};

export default connect(mapStateToProps)(Category);
