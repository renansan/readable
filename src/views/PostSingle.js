import React, { Component } from 'react';
import Post from '../components/Post';
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';
import PageNotFound from './PageNotFound'
import { connect } from 'react-redux'

class PostSingle extends Component {

  render() {
    const { id, postExist } = this.props;
    return (
      <section className="post-details">
        {(postExist === false) ? (
          <PageNotFound />
        ) : (postExist === true) ? (
          <div>
            <Post id={id} single={true} />

            <div className="post-comments">
              <PostsList postType='comment' parentId={id} />
              <div className="post-comments__form">
                <h2>Add new Comment</h2>
                <PostForm postType='comment' parentId={id} />
              </div>
            </div>
          </div>
        ) : ''}
      </section>
    );
  }
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
