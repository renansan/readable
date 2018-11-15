import React from 'react';
import Post from '../components/Post';
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';
import PageNotFound from './PageNotFound';
import { connect } from 'react-redux'

const PostSingle = props => {

  const { id, postExist } = props;

  if (postExist === false) {
    return (
      <PageNotFound />
    )
  } else if (postExist === true) {
    return (
      <section className="post-details">
        <Post id={id} single={true} />

        <div className="post-comments">
          <PostsList postType='comment' parentId={id} />
          <div className="post-comments__form">
            <h2>Add new Comment</h2>
            <PostForm postType='comment' parentId={id} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <span>{/*loading*/}</span>
  )
}

const mapStateToProps = ({ posts }, { match }) => {
  const postId = match.params.post;
  let postExist = null;
  if (posts.length) {
    postExist = posts.some(post => {
      if (post.id === postId) return true;
      return false;
    })
  }
  return { id: postId, postExist }
};

export default connect(mapStateToProps)(PostSingle);
