import React from 'react';
import PostsList from '../components/PostsList';
import PageNotFound from './PageNotFound';
import { connect } from 'react-redux'

const Category = props => {
  const { category, categoryExist } = props;

  if (categoryExist === false) {
    return (
      <PageNotFound />
    )
  } else if (categoryExist === true) {
    return (
      <section className="category">
        <h1 className="page__title">{category.name}</h1>
        <PostsList category={category.path} />
      </section>
    );
  }

  return (
    <span>{/*loading*/}</span>
  )
}

const mapStateToProps = ({ categories }, { match }) => {
  const path = match.params.category;
  const category = categories.filter(item => item.path === path)[0];
  let categoryExist = null;
  if (categories.length) {
    categoryExist = categories.some(cat => {
      if (cat.path === path) return true;
      return false;
    })
  }
  return { category, categoryExist }
};

export default connect(mapStateToProps)(Category);
