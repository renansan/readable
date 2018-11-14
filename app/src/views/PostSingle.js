import React, { Component } from 'react';
import Post from '../components/Post';
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';
import { connect } from 'react-redux'

class PostSingle extends Component {
  render() {
    const { id, postExist, history } = this.props;
    if (!postExist) history.push(`/404`, {customMessage: `The post you requested does not exist or has moved.`});
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
}

const mapStateToProps = ({ posts }, { match }) => {
  const postId = match.params.post;
  const postExist = posts.some(post => {
    if (post.id === postId) return true;
    return false;
  })
  return { postId, postExist }
};

export default connect(mapStateToProps)(PostSingle);
